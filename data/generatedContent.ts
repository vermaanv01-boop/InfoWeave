export interface GeneratedFormat {
  id: string;
  title: string;
  formatType: string;
  audience: string;
  tone: string;
  readingTime: string;
  summary: string;
  sections: {
    heading: string;
    content: string | string[];
  }[];
  tags: string[];
}

export interface VerificationClaim {
  id: string;
  claim: string;
  source: string;
  status: "VERIFIED" | "NEEDS_REVIEW" | "UNVERIFIED";
  confidence: number;
  category: "Timeline" | "Key Findings" | "Impact & Records" | "Remediation";
}

export interface FormatConsistency {
  format: string;
  status: "Consistent" | "Needs Review";
  lastVerified: string;
  issuesCount: number;
}

export const generatedFormatsData: Record<string, GeneratedFormat> = {
  "executive-summary": {
    id: "executive-summary",
    title: "Executive Summary: Incident SNS-IR-2026-024",
    formatType: "Executive Summary",
    audience: "Executive Leadership",
    tone: "Professional & High-Level",
    readingTime: "2 min read",
    summary:
      "A high-severity unauthorized account access incident on the Customer Management Web Application was detected on 22 September 2026 and contained within 34 minutes. No evidence of database deletion or customer record tampering was identified.",
    sections: [
      {
        heading: "Incident Overview & Containment",
        content:
          "On 22 September 2026, unusual authentication activity was flagged regarding a customer support account on the Customer Management Web Application. The threat actor leveraged compromised user credentials following multiple failed attempts. The incident was contained: the affected account was disabled at 09:42 IST and all active sessions were invalidated at 09:48 IST.",
      },
      {
        heading: "Investigation Findings & Impact Assessment",
        content: [
          "The unauthorized session originated from an unfamiliar IP address not previously associated with the account.",
          "The account accessed customer-management functionality following authentication.",
          "Investigation by the security team confirmed no evidence of database deletion.",
          "No unauthorized modification of customer records was identified during the assessment.",
        ],
      },
      {
        heading: "Risk Governance & Next Steps",
        content:
          "Primary risk identified involves unauthorized access to customer-management functions via compromised credentials. Strategic remediation includes mandatory credential resets, enforcement of multi-factor authentication (MFA) across customer-support accounts, elevated authentication log telemetry, and recurring access reviews.",
      },
    ],
    tags: ["Executive", "Contained", "High Severity", "MFA Mandate"],
  },

  "security-advisory": {
    id: "security-advisory",
    title: "Security Advisory: SNS-IR-2026-024 — Account Compromise & Access Containment",
    formatType: "Security Advisory",
    audience: "Security & Operations Team",
    tone: "Technical & Actionable",
    readingTime: "3 min read",
    summary:
      "Technical advisory detailing unauthorized access against the Customer Management Web Application resulting from compromised credentials. Immediate remediation actions and logging verification requirements are specified.",
    sections: [
      {
        heading: "Incident Telemetry & Chronology",
        content: [
          "09:14 IST: Multiple failed authentication attempts logged for customer support account.",
          "09:19 IST: Successful authentication observed from an unfamiliar IP address.",
          "09:31 IST: Automated security monitoring flagged abnormal account actions.",
          "09:42 IST: Account manually disabled by security administrators.",
          "09:48 IST: Revocation and invalidation of all active user application sessions.",
        ],
      },
      {
        heading: "Scope of Exposure",
        content:
          "Targeted Environment: Customer Management Web Application. While the session achieved authenticated access to customer-management modules, log analysis over 22–24 September confirmed no database tables were dropped and no customer record alterations occurred.",
      },
      {
        heading: "Mandatory Operational Countermeasures",
        content: [
          "Reset credentials for the affected account immediately.",
          "Enforce Multi-Factor Authentication (MFA) across all customer support accounts.",
          "Audit historical authentication logs for analogous login failure bursts followed by anomalous IP success.",
          "Configure enhanced threshold alert triggers for repeated failed authentication attempts.",
          "Establish automated active-session invalidation triggers upon suspicious authentication events.",
          "Execute periodic privilege and access reviews for customer support personnel.",
          "Conduct security-awareness training on credential hygiene and phishing prevention.",
        ],
      },
    ],
    tags: ["Advisory", "Technical", "SOC", "Containment"],
  },

  "linkedin-post": {
    id: "linkedin-post",
    title: "Enterprise Cybersecurity Update — Incident Response & Defense-in-Depth",
    formatType: "LinkedIn Post",
    audience: "Industry Peers & Stakeholders",
    tone: "Professional & Transparent",
    readingTime: "1 min read",
    summary:
      "A transparency update outlining rapid incident detection, containment of unauthorized credential-based access, and reinforcement of access controls.",
    sections: [
      {
        heading: "Public Disclosure Note",
        content:
          "Transparency and swift incident response are core pillars of operational resilience.\n\nOn 22 September 2026, SecureNet Services security monitoring identified an unauthorized access attempt on our Customer Management Web Application involving a customer support account.\n\nKey highlights from our incident investigation:\n• Rapid Containment: The affected account was disabled within minutes of detection and all active sessions were invalidated.\n• Data Integrity Preserved: Thorough verification confirmed no evidence of database deletion or customer record modification.\n• Proactive Measures: In response, we are mandating multi-factor authentication (MFA) across customer support accounts, expanding detection rules for anomalous authentication patterns, and refreshing team security awareness.\n\nIncident response speed and layered defense remain vital in modern application security.",
      },
    ],
    tags: ["Cybersecurity", "IncidentResponse", "InformationSecurity", "Resilience"],
  },

  "x-thread": {
    id: "x-thread",
    title: "Incident Briefing Thread (7 Tweets)",
    formatType: "X Thread",
    audience: "General Tech & Security Community",
    tone: "Concise & Factual",
    readingTime: "2 min read",
    summary:
      "A structured 7-part public micro-briefing detailing detection, containment, integrity verification, and preventative actions.",
    sections: [
      {
        heading: "Post 1 / 7",
        content:
          "1/7 🚨 Security Update: SecureNet Services detected and contained an unauthorized account access incident on our Customer Management Web Application on 22 September 2026. Here is the full verified breakdown: 👇",
      },
      {
        heading: "Post 2 / 7",
        content:
          "2/7 Timeline: At 09:14 IST, multiple failed login attempts were recorded against a customer support account. At 09:19 IST, a login succeeded from an unfamiliar IP address not previously associated with this user.",
      },
      {
        heading: "Post 3 / 7",
        content:
          "3/7 Rapid Containment: By 09:31 IST, security monitoring detected unusual activity. The affected account was disabled at 09:42 IST, and all active sessions were forcefully invalidated at 09:48 IST.",
      },
      {
        heading: "Post 4 / 7",
        content:
          "4/7 Data Verification: While the account briefly accessed customer-management functionality, comprehensive log audits confirmed: zero database deletion and zero unauthorized modification of customer records.",
      },
      {
        heading: "Post 5 / 7",
        content:
          "5/7 Root Cause: Attack vector identified as compromised user credentials. The primary risk was unauthorized customer-management functionality access.",
      },
      {
        heading: "Post 6 / 7",
        content:
          "6/7 Remediation: Credential resets completed, MFA enforced for all customer-support accounts, expanded log monitoring implemented for repeated failed logins, and active session review protocols updated.",
      },
      {
        heading: "Post 7 / 7",
        content:
          "7/7 Investigation status: Contained. Continuous monitoring and security awareness training are in progress. End of briefing. #CyberSecurity #InfoSec",
      },
    ],
    tags: ["XThread", "IncidentUpdate", "CyberSec"],
  },

  presentation: {
    id: "presentation",
    title: "Post-Incident Assessment & Review Slide Deck",
    formatType: "Presentation",
    audience: "Board & Security Committee",
    tone: "Structured & Analytical",
    readingTime: "4 min read",
    summary:
      "Five-slide presentation breakdown covering incident classification, timeline, impact analysis, and remediation governance.",
    sections: [
      {
        heading: "Slide 1: Incident Identity & Severity Classification",
        content:
          "• Incident ID: SNS-IR-2026-024\n• Severity: HIGH | Status: CONTAINED\n• Affected System: Customer Management Web Application\n• Affected Account: Customer Support Account\n• Organization: SecureNet Services (Report Date: 24 September 2026)",
      },
      {
        heading: "Slide 2: Incident Chronology (22 September 2026)",
        content:
          "• 09:14 IST — Multiple failed login attempts recorded\n• 09:19 IST — Successful authentication from unfamiliar IP address\n• 09:31 IST — Security monitoring alert triggered for unusual activity\n• 09:42 IST — Account access terminated (disabled)\n• 09:48 IST — Active sessions invalidated across application layer",
      },
      {
        heading: "Slide 3: Forensic & Evidence Verification",
        content:
          "• Evidence examined: Authentication logs (22 Sept), Application logs (22–23 Sept), Security Monitoring alerts (22 Sept), Investigation notes (22–24 Sept).\n• Verified Result: Zero database deletion.\n• Verified Result: Zero unauthorized modification of customer records.",
      },
      {
        heading: "Slide 4: Risk Profile & Exposure Factors",
        content:
          "• Primary Risk: Unauthorized access to customer-management functionality via compromised credentials.\n• Potential Residual Risks: Unauthorized information access, misuse of features, credential reuse vulnerability, absence of mandatory MFA.",
      },
      {
        heading: "Slide 5: Remediation Strategy & Strategic Action Plan",
        content:
          "1. Password reset & credential invalidation\n2. Mandatory Multi-Factor Authentication (MFA) rollout\n3. Heightened monitoring on repetitive failed authentications\n4. Automatic session invalidation following anomalous authentication\n5. Scheduled privilege and access reviews\n6. Organization-wide employee security awareness training",
      },
    ],
    tags: ["SlideDeck", "ExecutiveReview", "Governance"],
  },

  infographic: {
    id: "infographic",
    title: "Visual Incident Anatomy: Unauthorized Access & Remediation",
    formatType: "Infographic",
    audience: "Internal Organization & Technical Teams",
    tone: "Visual & Instructional",
    readingTime: "2 min read",
    summary:
      "Structured data panels detailing the attack vector, incident timeline, system containment verification, and defensive controls.",
    sections: [
      {
        heading: "Section 1 — Incident At A Glance",
        content:
          "ID: SNS-IR-2026-024 | System: Customer Management Web App | Severity: High | Status: Contained | Vector: Compromised Credentials",
      },
      {
        heading: "Section 2 — Attack Path vs. Containment Window",
        content:
          "[09:14 IST Failed Logins] → [09:19 IST Unfamiliar IP Login] → [09:31 IST Alert Triggered] → [09:42 IST Account Disabled] → [09:48 IST Sessions Killed]",
      },
      {
        heading: "Section 3 — Impact & Data Verification Check",
        content:
          "✓ Database Deletion: None identified\n✓ Customer Record Modification: None identified\n✓ Application Functionality: Customer management module accessed\n✓ Current Account Status: Disabled & Inactive",
      },
      {
        heading: "Section 4 — 7-Point Defensive Action Plan",
        content:
          "1. Reset credentials | 2. Enforce MFA | 3. Audit auth logs | 4. Monitor failed login spikes | 5. Invalidate active sessions | 6. Access reviews | 7. Employee training",
      },
    ],
    tags: ["VisualSpec", "Infographic", "DataFlow"],
  },

  "video-script": {
    id: "video-script",
    title: "Security Briefing Video Script (120 Seconds)",
    formatType: "Video Script",
    audience: "Security Operations & Staff Training",
    tone: "Authoritative & Clear",
    readingTime: "2 min read",
    summary:
      "A timed voiceover script with visual cue annotations for security briefings and awareness presentations.",
    sections: [
      {
        heading: "00:00 - 00:20 | Introduction & Incident Alert",
        content:
          "[VISUAL: Title card with SNS-IR-2026-024, High Severity badge, SecureNet Services logo]\n\nVOICEOVER: 'On 22 September 2026, SecureNet Services detected unauthorized account access involving a customer support account on our Customer Management Web Application. Here is the operational assessment.'",
      },
      {
        heading: "00:20 - 00:50 | Incident Timeline & Detection",
        content:
          "[VISUAL: Animated timeline progression from 09:14 IST to 09:48 IST]\n\nVOICEOVER: 'At 09:14 IST, multiple failed login attempts were logged, followed at 09:19 by a successful login from an unfamiliar IP address. At 09:31, security monitoring flagged the anomaly. Response teams disabled the account by 09:42 and invalidated all active sessions by 09:48 IST.'",
      },
      {
        heading: "00:50 - 01:20 | Forensic Findings & Integrity Check",
        content:
          "[VISUAL: Green checkmark badges on Database Integrity and Customer Records]\n\nVOICEOVER: 'Forensic audits of application and authentication logs confirmed that while customer-management functionality was accessed, there was no evidence of database deletion and no unauthorized alteration of customer records.'",
      },
      {
        heading: "01:20 - 02:00 | Corrective Actions & Recommendations",
        content:
          "[VISUAL: 7 checklist items highlighting MFA and Access Reviews]\n\nVOICEOVER: 'The incident is contained. Immediate actions include credential resets, mandatory multi-factor authentication across customer support accounts, tighter failed-login monitoring, and ongoing security awareness training. This concludes the briefing.'",
      },
    ],
    tags: ["VideoScript", "Broadcast", "Training"],
  },
};

export const verificationClaimsData: VerificationClaim[] = [
  {
    id: "claim-1",
    claim: "Multiple failed authentication attempts occurred before successful login.",
    source: "Authentication Logs / Incident Report (09:14 IST)",
    status: "VERIFIED",
    confidence: 100,
    category: "Timeline",
  },
  {
    id: "claim-2",
    claim: "The successful login originated from an IP address not previously associated with the affected account.",
    source: "Authentication Logs / Incident Timeline (09:19 IST)",
    status: "VERIFIED",
    confidence: 100,
    category: "Timeline",
  },
  {
    id: "claim-3",
    claim: "The affected account was disabled after detection.",
    source: "Incident Details / Timeline (09:42 IST)",
    status: "VERIFIED",
    confidence: 100,
    category: "Timeline",
  },
  {
    id: "claim-4",
    claim: "Active sessions associated with the account were invalidated after detection.",
    source: "Key Findings / Incident Details (09:48 IST)",
    status: "VERIFIED",
    confidence: 100,
    category: "Key Findings",
  },
  {
    id: "claim-5",
    claim: "No evidence of database deletion was identified.",
    source: "Key Findings / Application Logs (22–23 September 2026)",
    status: "VERIFIED",
    confidence: 100,
    category: "Impact & Records",
  },
  {
    id: "claim-6",
    claim: "No unauthorized modification of customer records was identified during the initial investigation.",
    source: "Key Findings / Incident Assessment (24 September 2026)",
    status: "VERIFIED",
    confidence: 100,
    category: "Impact & Records",
  },
  {
    id: "claim-7",
    claim: "Primary risk identified is unauthorized access to customer-management functionality through compromised credentials.",
    source: "Risk Analysis / Incident Report",
    status: "VERIFIED",
    confidence: 100,
    category: "Impact & Records",
  },
  {
    id: "claim-8",
    claim: "Multi-factor authentication must be enabled for customer-support accounts.",
    source: "Recommended Actions (Item 2)",
    status: "VERIFIED",
    confidence: 100,
    category: "Remediation",
  },
];

export const formatConsistenciesData: FormatConsistency[] = [
  {
    format: "Executive Summary",
    status: "Consistent",
    lastVerified: "24 September 2026",
    issuesCount: 0,
  },
  {
    format: "Security Advisory",
    status: "Consistent",
    lastVerified: "24 September 2026",
    issuesCount: 0,
  },
  {
    format: "LinkedIn Post",
    status: "Consistent",
    lastVerified: "24 September 2026",
    issuesCount: 0,
  },
  {
    format: "X Thread",
    status: "Consistent",
    lastVerified: "24 September 2026",
    issuesCount: 0,
  },
  {
    format: "Presentation",
    status: "Consistent",
    lastVerified: "24 September 2026",
    issuesCount: 0,
  },
  {
    format: "Infographic",
    status: "Consistent",
    lastVerified: "24 September 2026",
    issuesCount: 0,
  },
  {
    format: "Video Script",
    status: "Consistent",
    lastVerified: "24 September 2026",
    issuesCount: 0,
  },
];
