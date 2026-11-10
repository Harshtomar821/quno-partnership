
import { z } from "zod";

// Common email validation
const emailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email address")
  .transform((value) => value.toLowerCase());

// Common contact number validation
const contactSchema = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || /^\+?[\d\s()-]{7,20}$/.test(value),
    "Invalid contact number"
  );

// Signup validation
export const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100),

  email: emailSchema,

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password is too long"),
});

// Login validation
export const loginSchema = z.object({
  email: emailSchema,

  password: z
    .string()
    .min(1, "Password is required"),
});

// Detailed Application Form validation
const schoolFormSchema = z.object({
  // Step 1: School Profile & Leadership
  schoolName: z
    .string()
    .trim()
    .min(2, "School name is required")
    .max(200),

  establishmentYear: z.string().trim().min(1, "Establishment year is required"),
  board: z.string().trim().default(""),
  classesUpto: z.string().trim().default(""),
  website: z.string().trim().default(""),

  decisionMaker: z.string().trim().default(""),
  decisionMakerContact: contactSchema.default(""),

  principalName: z.string().trim().default(""),
  principalContact: contactSchema.default(""),

  directorBackground: z.string().trim().default(""),
  education: z.string().trim().min(1, "Education details are required"),
  personalityAge: z.string().trim().min(1, "Personality and age details are required"),
  workProfile: z.string().trim().min(1, "Work profile is required"),

  // Step 2: School Assessment
  schoolStrength: z.string().trim().min(1, "School strength is required"),
  meetingsDone: z.string().trim().min(1, "Meeting details are required"),
  meetingOpinion: z.string().trim().min(1, "Meeting opinion is required"),

  feesFrom: z.string().trim().min(1, "Minimum fee is required"),
  feesTo: z.string().trim().min(1, "Maximum fee is required"),

  buildingCondition: z.string().trim().min(1, "Building condition is required"),
  schoolReputation: z.string().trim().min(1, "School reputation is required"),
  areaLocality: z.string().trim().min(1, "Area and locality details are required"),
  parentsEducation: z.string().trim().min(1, "Parent education profile is required"),

  distinguishingFactor: z.string().trim().min(1, "Distinguishing factor is required"),
  improvementPotential: z.string().trim().min(1, "Improvement potential is required"),

  // Step 3: Business Intent & Competitors
  purposePassion: z.string().trim().min(1, "Please specify passion as a purpose"),
  purposeIncome: z.string().trim().min(1, "Please specify income source as a purpose"),
  purposeOthers: z.string().trim().default(""),

  competitor1Name: z.string().trim().default(""),
  competitor1Strength: z.string().trim().default(""),
  competitor1Fees: z.string().trim().default(""),
  competitor1Status: z.string().trim().default(""),

  competitor2Name: z.string().trim().default(""),
  competitor2Strength: z.string().trim().default(""),
  competitor2Fees: z.string().trim().default(""),
  competitor2Status: z.string().trim().default(""),

  // Step 4: Existing Vendor Ecosystem
  vendor1Name: z.string().trim().default(""),
  vendor1Domain: z.string().trim().default(""),
  vendor1Offerings: z.string().trim().default(""),

  vendor2Name: z.string().trim().default(""),
  vendor2Domain: z.string().trim().default(""),
  vendor2Offerings: z.string().trim().default(""),

  // Step 5: Resistance & Opportunity Insights
  resistance1: z.string().trim().default(""),
  resistance2: z.string().trim().default(""),
  resistance3: z.string().trim().default(""),

  counterApproach: z.string().trim().min(1, "Counter approach is required"),
  positivePoints: z.string().trim().min(1, "Positive points are required"),
  negativePoints: z.string().trim().min(1, "Negative points are required"),

  // Step 6: Requirements & Next Meeting
  demands: z
    .array(z.string().trim().min(1))
    .min(1, "Please select at least one requirement"),

  otherDemand: z.string().trim().default(""),
  nextMeetingApproach: z.string().trim().min(1, "Next meeting approach is required"),

  nextMeetingPerson: z.string().trim().default(""),
  nextMeetingDate: z.string().trim().default(""),
  nextMeetingTime: z.string().trim().default(""),

  remarks: z.string().trim().default(""),
});

// Transform frontend flat fields into the MongoDB nested structure
export const schoolSchema = schoolFormSchema.transform((data) => ({
  schoolName: data.schoolName,

  schoolProfile: {
    establishmentYear: data.establishmentYear,
    board: data.board,
    classesUpto: data.classesUpto,
    website: data.website,

    decisionMaker: data.decisionMaker,
    decisionMakerContact: data.decisionMakerContact,
    principalName: data.principalName,
    principalContact: data.principalContact,

    directorBackground: data.directorBackground,
    education: data.education,
    personalityAge: data.personalityAge,
    workProfile: data.workProfile,
  },

  schoolAssessment: {
    schoolStrength: data.schoolStrength,
    meetingsDone: data.meetingsDone,
    meetingOpinion: data.meetingOpinion,

    feesFrom: data.feesFrom,
    feesTo: data.feesTo,

    buildingCondition: data.buildingCondition,
    schoolReputation: data.schoolReputation,
    areaLocality: data.areaLocality,
    parentsEducation: data.parentsEducation,

    distinguishingFactor: data.distinguishingFactor,
    improvementPotential: data.improvementPotential,
  },

  businessIntent: {
    purposePassion: data.purposePassion,
    purposeIncome: data.purposeIncome,
    purposeOthers: data.purposeOthers,

    competitors: [
      {
        name: data.competitor1Name,
        strength: data.competitor1Strength,
        fees: data.competitor1Fees,
        status: data.competitor1Status,
      },
      {
        name: data.competitor2Name,
        strength: data.competitor2Strength,
        fees: data.competitor2Fees,
        status: data.competitor2Status,
      },
    ].filter((competitor) =>
      Object.values(competitor).some((value) => value.trim() !== "")
    ),
  },

  vendors: [
    {
      name: data.vendor1Name,
      domain: data.vendor1Domain,
      offerings: data.vendor1Offerings,
    },
    {
      name: data.vendor2Name,
      domain: data.vendor2Domain,
      offerings: data.vendor2Offerings,
    },
  ].filter((vendor) =>
    Object.values(vendor).some((value) => value.trim() !== "")
  ),

  resistanceInsights: {
    reasons: [
      data.resistance1,
      data.resistance2,
      data.resistance3,
    ].filter((reason) => reason.trim() !== ""),

    counterApproach: data.counterApproach,
    positivePoints: data.positivePoints,
    negativePoints: data.negativePoints,
  },

  requirements: {
    demands: data.demands,
    otherDemand: data.otherDemand,
    nextMeetingApproach: data.nextMeetingApproach,

    nextMeeting: {
      person: data.nextMeetingPerson,
      date: data.nextMeetingDate,
      time: data.nextMeetingTime,
    },

    remarks: data.remarks,
  },
}));

// TypeScript types inferred from schemas
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SchoolFormInput = z.input<typeof schoolSchema>;
export type SchoolInput = z.output<typeof schoolSchema>;
