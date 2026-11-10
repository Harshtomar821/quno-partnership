
import { Octokit } from "@octokit/rest";

interface CreateSchoolPullRequestInput {
  schoolId: string;
  schoolName: string;
  schoolData: Record<string, unknown>;
}

interface GitHubPullRequestResult {
  branchName: string;
  filePath: string;
  pullRequestUrl: string;
  pullRequestNumber: number;
}

function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const baseBranch = process.env.GITHUB_BASE_BRANCH || "main";

  const schoolsPath = (
    process.env.GITHUB_SCHOOLS_PATH || "schools/applications"
  ).replace(/^\/+|\/+$/g, "");

  if (!token || !owner || !repo) {
    throw new Error("GitHub environment variables are missing");
  }

  return {
    token,
    owner,
    repo,
    baseBranch,
    schoolsPath,
  };
}

function createSlug(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 50) || "school"
  );
}

function isGitHubError(
  error: unknown,
  status: number
): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    error.status === status
  );
}

export async function createSchoolPullRequest({
  schoolId,
  schoolName,
  schoolData,
}: CreateSchoolPullRequestInput): Promise<GitHubPullRequestResult> {
  const {
    token,
    owner,
    repo,
    baseBranch,
    schoolsPath,
  } = getGitHubConfig();

  const octokit = new Octokit({ auth: token });

  // 1. Generate unique branch and file names
  const slug = createSlug(schoolName);

  const branchName = `school-application/${slug}-${schoolId}`;

  const filePath = `${schoolsPath}/${slug}-${schoolId}.json`;

  // 2. Get the latest commit from the base branch
  const baseRef = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: `heads/${baseBranch}`,
  });

  const baseSha = baseRef.data.object.sha;

  // 3. Create a unique branch
  try {
    await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${branchName}`,
      sha: baseSha,
    });
  } catch (error) {
    // Reuse the branch if it already exists during a retry
    if (!isGitHubError(error, 422)) {
      throw error;
    }

    await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${branchName}`,
    });
  }

  // 4. Prepare complete application JSON
  const fileContent = JSON.stringify(
    {
      schoolId,
      ...schoolData,
    },
    null,
    2
  );

  const encodedContent = Buffer.from(fileContent, "utf-8").toString(
    "base64"
  );

  // 5. Check whether the application JSON already exists
  let existingFileSha: string | undefined;

  try {
    const existingFile = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: branchName,
    });

    if (
      !Array.isArray(existingFile.data) &&
      "sha" in existingFile.data
    ) {
      existingFileSha = existingFile.data.sha;
    }
  } catch (error) {
    if (!isGitHubError(error, 404)) {
      throw error;
    }
  }

  // 6. Create or update the application JSON file
  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message: existingFileSha
      ? `Update school application: ${schoolName}`
      : `Add school application: ${schoolName}`,
    content: encodedContent,
    branch: branchName,
    ...(existingFileSha ? { sha: existingFileSha } : {}),
  });

  // 7. Check whether an open PR already exists
  const existingPRs = await octokit.rest.pulls.list({
    owner,
    repo,
    head: `${owner}:${branchName}`,
    base: baseBranch,
    state: "open",
  });

  let pullRequestUrl: string;
  let pullRequestNumber: number;

  if (existingPRs.data.length > 0) {
    // Reuse the existing PR
    pullRequestUrl = existingPRs.data[0].html_url;
    pullRequestNumber = existingPRs.data[0].number;
  } else {
    // 8. Create a new Pull Request
    const pullRequest = await octokit.rest.pulls.create({
      owner,
      repo,
      title: `School Application: ${schoolName}`,
      head: branchName,
      base: baseBranch,
      body: [
        "## New School Application",
        "",
        `**School Name:** ${schoolName}`,
        `**Application ID:** ${schoolId}`,
        `**Data File:** \`${filePath}\``,
        "",
        "### Application Sections",
        "- School Profile & Leadership",
        "- School Assessment",
        "- Business Intent & Competitors",
        "- Existing Vendor Ecosystem",
        "- Resistance & Opportunity Insights",
        "- Requirements & Next Meeting",
        "",
        "### Review Checklist",
        "- [ ] Verify school profile and leadership details",
        "- [ ] Review school assessment",
        "- [ ] Review competitor and vendor information",
        "- [ ] Review resistance and opportunity insights",
        "- [ ] Review requirements and next meeting plan",
        "",
        "Please review the application JSON before merging this PR.",
      ].join("\n"),
    });

    pullRequestUrl = pullRequest.data.html_url;
    pullRequestNumber = pullRequest.data.number;
  }

  // 9. Return GitHub details for MongoDB
  return {
    branchName,
    filePath,
    pullRequestUrl,
    pullRequestNumber,
  };
}
