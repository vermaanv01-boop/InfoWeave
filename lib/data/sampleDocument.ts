import { ContentAnalysis, GeneratedOutput, ClaimVerification, UserConfiguration } from "../types/transformation";

export const SAMPLE_SOURCE_TITLE = "CERT-IN Advisory 2026-0842: Incident Report on Unauthorized Access to Customer Management Portal";

export const SAMPLE_SOURCE_TEXT = `INCIDENT ADVISORY REPORT: CERT-IN-2026-0842
ORGANIZATION: SecureNet Enterprise Solutions
INCIDENT CLASSIFICATION: Unauthorized Account Access / Credential Compromise
SEVERITY LEVEL: High (Initial Assessment) | Contained (Current Status)
DETECTION TIMESTAMP: 22 September 2026, 09:14 IST
CONTAINMENT TIMESTAMP: 22 September 2026, 09:48 IST
AFFECTED ASSET: Customer Management Web Application (Internal Cluster Prod-04)
AFFECTED IDENTITY: Customer Support Operations Account (Tier-2 Privileges)

EXECUTIVE OVERVIEW:
On 22 September 2026 at 09:14 IST, automated anomaly detection within the SecureNet Security Operations Center (SOC) flagged repeated failed authentication attempts against the internal Customer Management Web Application. At 09:19 IST, a successful authentication was logged originating from an unfamiliar IP address not previously correlated with the affected user account. Security monitoring observed subsequent navigation toward sensitive customer administration modules.

INCIDENT TIMELINE & RESPONSE:
- 09:14 IST: SIEM system records 14 rapid failed authentication attempts against Tier-2 support account.
- 09:19 IST: Single successful login observed from foreign IP address (198.51.100.47).
- 09:31 IST: SOC analyst receives behavioral anomaly alert for abnormal geographic authentication.
- 09:42 IST: SOC initiates automated containment protocol; Tier-2 account disabled at identity provider.
- 09:48 IST: Invalidation of all active web sessions across load balancers completed (Containment Verified).
- 23 September 2026: Full forensic log audit conducted across relational databases and object storage.
- 24 September 2026: Incident forensic assessment signed off by Chief Information Security Officer (CISO).

FORENSIC FINDINGS & IMPACT ASSESSMENT:
1. Integrity Audit: Direct inspection of write logs confirms no database deletion was initiated.
2. Record Verification: No unauthorized modification of customer records was identified during the initial or forensic investigations.
3. Attack Vector: Incident was facilitated by compromised user credentials without multi-factor authentication (MFA).
4. Data Exposure: Access was strictly confined to customer support views; bulk export endpoints were blocked by rate limiting.

RECOMMENDED MITIGATION MEASURES:
1. Immediate credential rotation across all privileged and customer-support accounts.
2. Mandatory enforcement of hardware-backed Multi-Factor Authentication (FIDO2 / TOTP) across all internal web applications.
3. Comprehensive log review spanning preceding 30 days to identify any related lateral authentication attempts.
4. Implementation of automated session revocation upon high-risk anomaly detection.
5. Organization-wide refresher training on phishing and credential security.`;

export const DEFAULT_CONFIGURATION: UserConfiguration = {
  audience: "Executive",
  tone: "Professional",
  language: "English",
  detailLevel: "Moderate",
  objective: "Inform",
  contentStyle: "Professional",
};

export const INITIAL_ANALYSIS: ContentAnalysis = {
  context: "Cybersecurity incident response and security telemetry advisory report detailing unauthorized access and remediation.",
  intent: "Inform executive and technical stakeholders regarding containment status, root cause, and immediate preventative actions.",
  key_information: [
    "Unauthorized access detected on Customer Management Web App via compromised credentials.",
    "Containment achieved within 34 minutes of detection via automated account disabling and session invalidation.",
    "Forensic audit confirms zero database deletion and zero customer record modification.",
    "Mandatory hardware-backed MFA enforcement initiated across all support tiers."
  ],
  topics: [
    "Cybersecurity Incident Response",
    "Identity & Access Management",
    "Session Invalidation",
    "Zero Trust Architecture",
    "Forensic Data Integrity"
  ],
  entities: [
    "CERT-IN-2026-0842",
    "SecureNet Enterprise Solutions",
    "Customer Management Web Application",
    "Tier-2 Operations Account",
    "IP 198.51.100.47"
  ],
  claims: [
    "Multiple failed authentication attempts were recorded before the successful login.",
    "The successful login originated from an IP address not previously associated with the affected account.",
    "Active sessions associated with the account were invalidated after detection.",
    "No evidence of database deletion was identified during forensic inspection.",
    "No unauthorized modification of customer records was identified."
  ],
  important_points: [
    "Immediate enforcement of Multi-Factor Authentication (MFA) across all staff portals.",
    "Deploy adaptive session termination for unfamiliar geographical logins.",
    "Finalize executive audit report for regulatory disclosure within 72 hours."
  ],
  word_count: 368,
  detected_language: "English",
  source_title: SAMPLE_SOURCE_TITLE,
  engine: "InfoWeave Neural Engine"
};

export const INITIAL_VERIFICATION: ClaimVerification[] = [
  {
    id: "claim-1",
    claim: "Multiple failed authentication attempts were recorded before the successful login.",
    evidence: "09:14 IST: SIEM system records 14 rapid failed authentication attempts against Tier-2 support account.",
    status: "Supported",
    confidence: 99.2
  },
  {
    id: "claim-2",
    claim: "The successful login originated from an IP address not previously associated with the affected account.",
    evidence: "09:19 IST: Single successful login observed from foreign IP address (198.51.100.47) not previously correlated with the affected user account.",
    status: "Supported",
    confidence: 98.4
  },
  {
    id: "claim-3",
    claim: "Active sessions associated with the account were invalidated after detection.",
    evidence: "09:48 IST: Invalidation of all active web sessions across load balancers completed (Containment Verified).",
    status: "Supported",
    confidence: 99.8
  },
  {
    id: "claim-4",
    claim: "No evidence of database deletion or customer record alteration was identified during forensic inspection.",
    evidence: "Integrity Audit: Direct inspection of write logs confirms no database deletion was initiated. No unauthorized modification of customer records was identified.",
    status: "Supported",
    confidence: 97.5
  },
  {
    id: "claim-5",
    claim: "Multi-factor authentication was mandated across all support and admin portals.",
    evidence: "Mandatory enforcement of hardware-backed Multi-Factor Authentication (FIDO2 / TOTP) across all internal web applications.",
    status: "Supported",
    confidence: 96.0
  }
];
