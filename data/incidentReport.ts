export interface IncidentReport {
  documentTitle: string;
  organization: string;
  reportDate: string;
  incidentId: string;
  incidentType: string;
  detectionDate: string;
  affectedSystem: string;
  affectedAccount: string;
  initialSeverity: "High" | "Medium" | "Low";
  attackVector: string;
  currentStatus: "Contained" | "Investigating" | "Resolved";
  keyFindings: string[];
  timeline: {
    timestamp: string;
    description: string;
  }[];
  risk: {
    primary: string;
    potential: string[];
  };
  recommendedActions: string[];
  evidence: {
    name: string;
    date: string;
  }[];
  provenance: {
    version: string;
    status: string;
    prototypeHash: string;
    timestamp: string;
  };
}

export const incidentReportData: IncidentReport = {
  documentTitle: "Security Incident Report — Unauthorized Access to Web Application",
  organization: "SecureNet Services",
  reportDate: "24 September 2026",
  incidentId: "SNS-IR-2026-024",
  incidentType: "Unauthorized Account Access",
  detectionDate: "22 September 2026",
  affectedSystem: "Customer Management Web Application",
  affectedAccount: "Customer Support Account",
  initialSeverity: "High",
  attackVector: "Compromised user credentials",
  currentStatus: "Contained",
  keyFindings: [
    "Multiple failed authentication attempts were recorded before the successful login.",
    "The successful login originated from an IP address not previously associated with the affected account.",
    "The account accessed customer-management functionality after authentication.",
    "No evidence of database deletion was identified.",
    "No unauthorized modification of customer records was identified during the initial investigation.",
    "Active sessions associated with the account were invalidated after detection.",
  ],
  timeline: [
    {
      timestamp: "22 September 2026 — 09:14 IST",
      description: "Multiple failed login attempts were detected for the affected account.",
    },
    {
      timestamp: "22 September 2026 — 09:19 IST",
      description: "A successful login was recorded from an unfamiliar IP address.",
    },
    {
      timestamp: "22 September 2026 — 09:31 IST",
      description: "Security monitoring identified unusual account activity.",
    },
    {
      timestamp: "22 September 2026 — 09:42 IST",
      description: "The affected account was disabled.",
    },
    {
      timestamp: "22 September 2026 — 09:48 IST",
      description: "Active sessions associated with the account were invalidated.",
    },
    {
      timestamp: "23 September 2026",
      description: "Authentication and application logs were reviewed by the security team.",
    },
    {
      timestamp: "24 September 2026",
      description: "Initial incident assessment was completed.",
    },
  ],
  risk: {
    primary:
      "Unauthorized access to customer-management functionality through compromised credentials.",
    potential: [
      "Unauthorized access to customer information",
      "Misuse of authenticated application functionality",
      "Further account compromise if credentials are reused",
      "Increased risk from weak authentication controls",
    ],
  },
  recommendedActions: [
    "Reset credentials for the affected account.",
    "Enable multi-factor authentication for customer-support accounts.",
    "Review authentication logs for similar activity.",
    "Implement additional monitoring for repeated failed login attempts.",
    "Review active sessions following suspicious authentication events.",
    "Conduct periodic access reviews for privileged and customer-support accounts.",
    "Provide security-awareness training to employees.",
  ],
  evidence: [
    {
      name: "Authentication Logs",
      date: "22 September 2026",
    },
    {
      name: "Application Logs",
      date: "22–23 September 2026",
    },
    {
      name: "Security Monitoring Alerts",
      date: "22 September 2026",
    },
    {
      name: "Incident Investigation Notes",
      date: "22–24 September 2026",
    },
  ],
  provenance: {
    version: "v1.0",
    status: "Verified",
    prototypeHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    timestamp: "24 September 2026",
  },
};
