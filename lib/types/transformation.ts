export type TargetAudience =
  | "Executive"
  | "Technical Team"
  | "General Public"
  | "Students"
  | "Security Team"
  | "Custom";

export type Tone =
  | "Professional"
  | "Formal"
  | "Informative"
  | "Concise"
  | "Persuasive"
  | "Educational";

export type Language = "English" | "Hindi" | "Hinglish" | "Marathi";

export type DetailLevel = "Brief" | "Moderate" | "Detailed";

export type CommunicationObjective =
  | "Inform"
  | "Summarize"
  | "Educate"
  | "Alert"
  | "Persuade";

export type ContentStyle =
  | "Professional"
  | "Technical"
  | "Simple"
  | "News-style"
  | "Social Media";

export interface UserConfiguration {
  audience: TargetAudience;
  tone: Tone;
  language: Language;
  detailLevel: DetailLevel;
  objective: CommunicationObjective;
  contentStyle: ContentStyle;
}

export interface ContentAnalysis {
  context: string;
  intent: string;
  key_information: string[];
  topics: string[];
  entities: string[];
  claims: string[];
  important_points: string[];
  word_count?: number;
  detected_language?: string;
  source_title?: string;
  engine?: string;
}

export type OutputFormatId =
  | "executive-summary"
  | "advisory"
  | "linkedin-post"
  | "x-thread"
  | "infographic"
  | "presentation"
  | "video-package";

export interface OutputFormatMeta {
  id: OutputFormatId;
  name: string;
  shortDescription: string;
  category: "Leadership" | "Operational" | "Social" | "Visual" | "Media";
  estimatedTime: string;
}

export interface GeneratedOutput {
  id: OutputFormatId;
  formatType: string;
  title: string;
  targetAudience: string;
  readingTime: string;
  reviewStatus: "Draft" | "Under Review" | "Verified" | "Approved";
  reviewerComments?: string[];
  sections: Record<string, any>;
  rawText?: string;
}

export interface ClaimVerification {
  id: string;
  claim: string;
  evidence: string;
  status: "Supported" | "Needs Review" | "Unsupported";
  confidence: number;
}

export interface ConsistencyCheck {
  attribute: string;
  expected: string;
  formatsChecked?: string[];
  status: "Consistent" | "Needs Review" | "Inconsistent";
  detail: string;
}

export interface TransformationRecord {
  id: string;
  sourceTitle: string;
  date: string;
  outputsGenerated: string[];
  verificationStatus: string;
  configuration: UserConfiguration;
  approvedCount?: number;
}
