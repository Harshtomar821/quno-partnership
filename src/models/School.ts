
import mongoose, { Schema, Model, Types } from "mongoose";

export interface ICompetitor {
  name: string;
  strength: string;
  fees: string;
  status: string;
}

export interface IVendor {
  name: string;
  domain: string;
  offerings: string;
}

export interface ISchool {
  schoolName: string;

  schoolProfile: {
    establishmentYear: string;
    board: string;
    classesUpto: string;
    website: string;

    decisionMaker: string;
    decisionMakerContact: string;
    principalName: string;
    principalContact: string;

    directorBackground: string;
    education: string;
    personalityAge: string;
    workProfile: string;
  };

  schoolAssessment: {
    schoolStrength: string;
    meetingsDone: string;
    meetingOpinion: string;

    feesFrom: string;
    feesTo: string;

    buildingCondition: string;
    schoolReputation: string;
    areaLocality: string;
    parentsEducation: string;

    distinguishingFactor: string;
    improvementPotential: string;
  };

  businessIntent: {
    purposePassion: string;
    purposeIncome: string;
    purposeOthers: string;
    competitors: ICompetitor[];
  };

  vendors: IVendor[];

  resistanceInsights: {
    reasons: string[];
    counterApproach: string;
    positivePoints: string;
    negativePoints: string;
  };

  requirements: {
    demands: string[];
    otherDemand: string;
    nextMeetingApproach: string;

    nextMeeting: {
      person: string;
      date: string;
      time: string;
    };

    remarks: string;
  };

  onboardedBy: Types.ObjectId;

  github: {
    branchName?: string;
    filePath?: string;
    pullRequestUrl?: string;
    pullRequestNumber?: number;
    status: "pending" | "created" | "failed" | "merged";
  };

  createdAt?: Date;
  updatedAt?: Date;
}

const CompetitorSchema = new Schema<ICompetitor>(
  {
    name: { type: String, trim: true, default: "" },
    strength: { type: String, trim: true, default: "" },
    fees: { type: String, trim: true, default: "" },
    status: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const VendorSchema = new Schema<IVendor>(
  {
    name: { type: String, trim: true, default: "" },
    domain: { type: String, trim: true, default: "" },
    offerings: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const SchoolSchema = new Schema<ISchool>(
  {
    schoolName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    schoolProfile: {
      establishmentYear: { type: String, trim: true, default: "" },
      board: { type: String, trim: true, default: "" },
      classesUpto: { type: String, trim: true, default: "" },
      website: { type: String, trim: true, default: "" },

      decisionMaker: { type: String, trim: true, default: "" },
      decisionMakerContact: { type: String, trim: true, default: "" },
      principalName: { type: String, trim: true, default: "" },
      principalContact: { type: String, trim: true, default: "" },

      directorBackground: { type: String, trim: true, default: "" },
      education: { type: String, trim: true, default: "" },
      personalityAge: { type: String, trim: true, default: "" },
      workProfile: { type: String, trim: true, default: "" },
    },

    schoolAssessment: {
      schoolStrength: { type: String, trim: true, default: "" },
      meetingsDone: { type: String, trim: true, default: "" },
      meetingOpinion: { type: String, trim: true, default: "" },

      feesFrom: { type: String, trim: true, default: "" },
      feesTo: { type: String, trim: true, default: "" },

      buildingCondition: { type: String, trim: true, default: "" },
      schoolReputation: { type: String, trim: true, default: "" },
      areaLocality: { type: String, trim: true, default: "" },
      parentsEducation: { type: String, trim: true, default: "" },

      distinguishingFactor: { type: String, trim: true, default: "" },
      improvementPotential: { type: String, trim: true, default: "" },
    },

    businessIntent: {
      purposePassion: { type: String, trim: true, default: "" },
      purposeIncome: { type: String, trim: true, default: "" },
      purposeOthers: { type: String, trim: true, default: "" },

      competitors: {
        type: [CompetitorSchema],
        default: [],
      },
    },

    vendors: {
      type: [VendorSchema],
      default: [],
    },

    resistanceInsights: {
      reasons: {
        type: [String],
        default: [],
      },
      counterApproach: { type: String, trim: true, default: "" },
      positivePoints: { type: String, trim: true, default: "" },
      negativePoints: { type: String, trim: true, default: "" },
    },

    requirements: {
      demands: {
        type: [String],
        default: [],
      },
      otherDemand: { type: String, trim: true, default: "" },
      nextMeetingApproach: { type: String, trim: true, default: "" },

      nextMeeting: {
        person: { type: String, trim: true, default: "" },
        date: { type: String, trim: true, default: "" },
        time: { type: String, trim: true, default: "" },
      },

      remarks: { type: String, trim: true, default: "" },
    },

    onboardedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    github: {
      branchName: String,
      filePath: String,
      pullRequestUrl: String,
      pullRequestNumber: Number,

      status: {
        type: String,
        enum: ["pending", "created", "failed", "merged"],
        default: "pending",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const School: Model<ISchool> =
  mongoose.models.School ||
  mongoose.model<ISchool>("School", SchoolSchema);

export default School;
