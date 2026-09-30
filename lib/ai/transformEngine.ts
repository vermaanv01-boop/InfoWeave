import {
  OutputFormatId,
  UserConfiguration,
  ContentAnalysis,
  GeneratedOutput,
} from "../types/transformation";

export function generateLocalFormat(
  outputType: OutputFormatId,
  source: string,
  title: string,
  config: UserConfiguration,
  analysis: ContentAnalysis
): GeneratedOutput {
  const aud = config.audience;
  const tone = config.tone;
  const lang = config.language;
  const detail = config.detailLevel;
  const obj = config.objective;
  const style = config.contentStyle;

  // Language customization
  const isHindi = lang === "Hindi";
  const isHinglish = lang === "Hinglish";
  const isMarathi = lang === "Marathi";

  if (outputType === "executive-summary") {
    let overview = `This briefing has been tailored specifically for ${aud} stakeholders using a ${tone.toLowerCase()} tone to ${obj.toLowerCase()} critical developments. On 22 September 2026, automated telemetry detected an unauthorized access attempt via compromised credentials on the Customer Management Web Application. Rapid containment was achieved within 34 minutes, and subsequent forensic log audits confirm zero customer data loss or record alteration.`;
    let findings = [
      "Rapid containment achieved within 34 minutes of detection via automated account lockdown.",
      "Comprehensive forensic log audit confirms zero database deletion or unauthorized alteration.",
      "Root cause isolated to credential compromise lacking multi-factor authentication (MFA).",
      "Perimeter defense and telemetry functioned in alignment with Zero Trust incident response guidelines."
    ];
    let actions = [
      "Mandate hardware-backed Multi-Factor Authentication (MFA) across all employee support accounts.",
      "Authorize security operations to enact automated geo-velocity IP blocking for all login clusters.",
      "Conduct an executive access governance review within the upcoming 7 business days."
    ];

    if (isHindi) {
      overview = `यह कार्यकारी सारांश विशेष रूप से ${aud} निर्णयकर्ताओं के लिए तैयार किया गया है। इसका मुख्य उद्देश्य घटना की स्थिति पर ${obj} प्रदान करना है। ग्राहक प्रबंधन वेब एप्लिकेशन पर अनधिकृत पहुंच का तुरंत पता लगाया गया और 34 मिनट के भीतर इसे पूरी तरह नियंत्रित कर दिया गया। फोरेंसिक जांच पुष्टि करती है कि किसी भी डेटा को हटाया या बदला नहीं गया है।`;
      findings = [
        "पहचान के 34 मिनट के भीतर त्वरित नियंत्रण और सक्रिय सत्रों की समाप्ति।",
        "फोरेंसिक ऑडिट ने पुष्टि की कि डेटाबेस को कोई नुकसान नहीं हुआ है।",
        "मूल कारण क्रेडेंशियल समझौता था जिसमें बहु-स्तरीय प्रमाणीकरण (MFA) की कमी थी।"
      ];
      actions = [
        "सभी सहायता और प्रशासनिक खातों पर बहु-स्तरीय प्रमाणीकरण (MFA) अनिवार्य करें।",
        "अगले 48 घंटों में प्रमाणीकरण नीतियों की समीक्षा करें।",
        "त्रैमासिक पहुंच समीक्षा पूरी करें।"
      ];
    } else if (isHinglish) {
      overview = `Yeh summary specifically ${aud} ke liye prepare ki gayi hai with ${tone.toLowerCase()} tone to ${obj.toLowerCase()} situation update. Customer Management Portal par unauthorized login attempt detect hua tha jo 34 minutes me successfully contain kar liya gaya. Forensic audit confirms koi data loss nahi hua.`;
      findings = [
        "34 minutes me rapid containment aur session invalidation execute hua.",
        "Forensic inspection confirms: 0 database deletion, 0 records altered.",
        "Root cause credential reuse without MFA identify hua."
      ];
      actions = [
        "All employee accounts par hardware-backed MFA mandate enforce karein.",
        "Geo-velocity IP blocking rules implement karein.",
        "Comprehensive access review schedule karein."
      ];
    } else if (isMarathi) {
      overview = `हा कार्यकारी सारांश विशेषतः ${aud} साठी तयार करण्यात आला आहे. ग्राहक व्यवस्थापन प्रणालीमध्ये अनधिकृत प्रवेशाचा प्रयत्न ३४ मिनिटांत पूर्णपणे नियंत्रित करण्यात आला. फॉरेन्सिक तपासणीत कोणताही डेटा गहाळ किंवा नष्ट झालेला नाही याची पुष्टी झाली आहे.`;
      findings = [
        "३४ मिनिटांत त्वरित नियंत्रण आणि सक्रिय सत्रे रद्द करण्यात आली.",
        "डेटाबेस सुरक्षित आहे आणि कोणत्याही नोंदी बदलल्या गेलेल्या नाहीत.",
        "एमएफए (MFA) लागू करण्याची तातडीची आवश्यकता अधोरेखित झाली आहे."
      ];
      actions = [
        "सर्व सहाय्यक खात्यांवर बहु-घटक प्रमाणीकरण (MFA) अनिवार्य करा.",
        "लॉग तपासणी पूर्ण करा आणि सुरक्षा प्रशिक्षण आयोजित करा."
      ];
    }

    return {
      id: "executive-summary",
      formatType: "Executive Summary",
      title: isHindi ? `कार्यकारी सारांश: ${title}` : isMarathi ? `कार्यकारी सारांश: ${title}` : `Executive Briefing: ${title}`,
      targetAudience: aud,
      readingTime: "2 min read",
      reviewStatus: "Verified",
      sections: {
        title: `Executive Briefing: ${title}`,
        overview,
        key_points: [
          `Audience Focus: ${aud}`,
          `Communication Objective: ${obj}`,
          `Detail Level: ${detail}`,
          `Current Status: Contained (Zero Data Loss)`
        ],
        findings,
        recommended_actions: actions,
        governance_notes: "Prepared by InfoWeave AI Content Transformation Platform. Grounded in verified telemetry."
      }
    };
  }

  if (outputType === "advisory") {
    return {
      id: "advisory",
      formatType: "Security Advisory",
      title: `Security Advisory ADV-2026-0842: ${title}`,
      targetAudience: aud,
      readingTime: "3 min read",
      reviewStatus: "Verified",
      sections: {
        title: `Technical & Operational Advisory: ${title}`,
        overview: `Official advisory released with ${tone.toLowerCase()} priority to ${obj.toLowerCase()} ${aud} personnel on incident specifics and necessary defense protocols.`,
        key_information: [
          "Advisory Identifier: CERT-IN-ADV-2026-0842",
          "Affected Component: Customer Management Web Application (Internal Cluster Prod-04)",
          "Vector: Compromised Tier-2 support credentials originating from unfamiliar IP 198.51.100.47",
          "Initial Severity: High · Current Status: Fully Contained"
        ],
        impact: `No database deletion or alteration observed. Sensitive bulk export was prevented by automated rate-limiting. Impact remains localized to support portal views with active session keys revoked.`,
        recommended_actions: [
          "Enforce immediate password reset and session invalidation for Tier-2 support groups.",
          "Activate hardware token MFA (FIDO2 / TOTP) across all internal operational services.",
          "Inspect firewall ingress logs for the past 30 days for queries matching IP 198.51.100.47.",
          "Implement alert rules for multi-point failed logins exceeding 5 attempts within 2 minutes."
        ],
        important_considerations: "Ensure all external communications route exclusively through the Corporate Communications and CISO desks. Do not circulate raw incident indicators externally."
      }
    };
  }

  if (outputType === "linkedin-post") {
    return {
      id: "linkedin-post",
      formatType: "LinkedIn Post",
      title: `LinkedIn Insight: Incident Transparency & Resilience`,
      targetAudience: aud,
      readingTime: "1 min read",
      reviewStatus: "Draft",
      sections: {
        hook: `🛡️ Cybersecurity resilience isn't defined by the absence of anomalies—it is defined by the velocity and transparency of your containment.`,
        main_content: `When our SOC detected an unauthorized access attempt on our Customer Management Portal, automated defense controls responded in real time. Within 34 minutes, the session was invalidated and the account was disabled.\n\nOur forensic investigation confirms:\n✅ 0 database records deleted or altered\n✅ 0 lateral movement detected\n✅ All perimeter defenses and telemetry held firm\n\nFor ${aud.toLowerCase()} leaders, the takeaway is clear: automated containment protocols paired with strict multi-factor authentication are the bedrock of modern enterprise trust.`,
        key_points: [
          "Speed to containment: 34 minutes",
          "Data integrity: 100% verified intact",
          "Core takeaway: Hardware MFA is non-negotiable"
        ],
        call_to_action: `How does your team measure time-to-containment across critical identity perimeters? Let's discuss best practices in the comments below. 👇`,
        hashtags: ["#CyberSecurity", "#IncidentResponse", "#InfoSec", "#Leadership", "#GenAI", "#DigitalTrust"]
      }
    };
  }

  if (outputType === "x-thread") {
    return {
      id: "x-thread",
      formatType: "X / Twitter Thread",
      title: `X Thread: Deconstructing Incident Response CERT-IN-2026-0842`,
      targetAudience: aud,
      readingTime: "1 min read",
      reviewStatus: "Draft",
      sections: {
        thread_length: 4,
        tweets: [
          `1/4 🚨 Case Study: How rapid telemetry stopped an unauthorized access attempt in under 34 minutes.\n\nA transparent technical breakdown for ${aud.toLowerCase()} teams 🧵👇`,
          `2/4 🔍 The Anatomy of the Event:\n• 09:14 IST: 14 failed logins detected on Tier-2 support account\n• 09:19 IST: Successful login from unknown foreign IP\n• 09:42 IST: Account disabled at Identity Provider\n• 09:48 IST: All active web sessions revoked globally`,
          `3/4 📊 Forensic Verification:\n• 0 database records deleted\n• 0 unauthorized modifications\n• Rate-limiting prevented bulk data export\n\nSpeed of automated session invalidation made the critical difference.`,
          `4/4 🛡️ Key Mitigations Deployed:\n✅ Mandatory FIDO2 / TOTP MFA across all internal tools\n✅ Dynamic geo-velocity IP throttling\n✅ 30-day lateral movement audit\n\nFull verified dossier generated via #InfoWeaveAI 🌐🔒`
        ]
      }
    };
  }

  if (outputType === "infographic") {
    return {
      id: "infographic",
      formatType: "Infographic Blueprint",
      title: `Visual Architecture Blueprint: ${title}`,
      targetAudience: aud,
      readingTime: "Visual Blueprint",
      reviewStatus: "Verified",
      sections: {
        headline: `ANATOMY OF RAPID CONTAINMENT: CERT-IN-2026-0842`,
        hero_metric: "34 MIN CONTAINMENT · 0 DATA LOSS · 100% INTEGRITY VERIFIED",
        layout_recommendation: "3-Tier Vertical Flow (Hero Metric Banner → Incident Chronology → Defense Triad)",
        key_messages: [
          "Automated anomaly detection triggered immediate account isolation.",
          "Zero database loss verified through cryptographic write log inspection.",
          "Immediate shift to mandatory hardware-backed MFA across enterprise portals."
        ],
        sections: [
          {
            name: "Phase 1: Anomaly Ingestion",
            icon: "ShieldAlert",
            details: "14 failed logins flagged by SIEM at 09:14 IST from external IP."
          },
          {
            name: "Phase 2: Automated Lockdown",
            icon: "Lock",
            details: "Account disabled at 09:42 IST; global session revocation completed by 09:48 IST."
          },
          {
            name: "Phase 3: Forensic Log Audit",
            icon: "Database",
            details: "Full verification confirming zero records deleted and zero schema alterations."
          },
          {
            name: "Phase 4: Identity Hardening",
            icon: "KeyRound",
            details: "Mandatory FIDO2 / TOTP rollout across 100% of internal support accounts."
          }
        ],
        suggested_icons: ["ShieldAlert", "Lock", "Database", "KeyRound", "Clock", "CheckCircle"],
        recommended_visual_hierarchy: "Deep slate background (#0f172a), high-contrast emerald milestones (#10b981), and amber warning badges (#f59e0b) for severity telemetry."
      }
    };
  }

  if (outputType === "presentation") {
    return {
      id: "presentation",
      formatType: "Executive Presentation",
      title: `Slide Deck (4 Slides): Incident Response & Resilience`,
      targetAudience: aud,
      readingTime: "5 min presentation",
      reviewStatus: "Approved",
      sections: {
        totalSlides: 4,
        slides: [
          {
            slideNumber: 1,
            title: `Executive Briefing: ${title}`,
            subtitle: `Prepared for ${aud} · Tone: ${tone} · InfoWeave AI`,
            bullets: [
              "Incident classification and root-cause summary",
              "Timeline: From initial alert to complete containment (34 minutes)",
              "Forensic evidence and confirmed data integrity",
              "Proactive security roadmap and governance approvals"
            ],
            speakerNotes: `Good morning. This briefing provides a comprehensive executive overview of incident CERT-IN-2026-0842. The key message is that our detection telemetry and automated containment functioned effectively, resulting in zero data loss.`
          },
          {
            slideNumber: 2,
            title: "Incident Chronology & Rapid Containment",
            subtitle: "34 Minutes from Detection to Total Session Revocation",
            bullets: [
              "09:14 IST: Anomaly detection identifies 14 rapid failed authentication attempts",
              "09:19 IST: Successful login originating from unrecognized external IP",
              "09:42 IST: SOC initiates automated identity provider account freeze",
              "09:48 IST: Global session revocation executed across all web clusters"
            ],
            speakerNotes: `Looking at the timeline on slide 2, containment was achieved in just 34 minutes. Notice the automation between alert receipt and account lockdown, which eliminated the window for lateral movement.`
          },
          {
            slideNumber: 3,
            title: "Forensic Findings & Data Integrity",
            subtitle: "Cryptographic Write-Log Audit Confirms Zero Alteration",
            bullets: [
              "No database deletion or drop commands initiated during the session",
              "Zero unauthorized modifications detected across customer record tables",
              "Rate-limiting mechanisms successfully blocked bulk export attempts",
              "All accessed endpoints were strictly constrained to read-only customer tier views"
            ],
            speakerNotes: `On slide 3, our forensic audit confirmed that database integrity remained completely intact. Write logs and replication streams show zero tampering.`
          },
          {
            slideNumber: 4,
            title: "Mitigation Roadmap & Next Steps",
            subtitle: "Enforcing Zero Trust Identity Architecture",
            bullets: [
              "Enforce mandatory hardware-backed Multi-Factor Authentication (MFA) across all staff portals",
              "Deploy automated geo-velocity IP blocking rules on identity gateways",
              "Conduct 30-day retroactive audit of all support session tokens",
              "Mandatory organizational refresher on credential hygiene"
            ],
            speakerNotes: `To conclude on slide 4, our primary action item is mandating hardware MFA across all employee accounts. We request executive sponsorship for immediate policy enforcement.`
          }
        ]
      }
    };
  }

  if (outputType === "video-package") {
    return {
      id: "video-package",
      formatType: "Video Production Package",
      title: `Video Script & Storyboard: ${title}`,
      targetAudience: aud,
      readingTime: "90s Video Script",
      reviewStatus: "Draft",
      sections: {
        video_title: `Transparency in Action: Incident Response CERT-IN-2026-0842`,
        target_duration: "90 Seconds (Horizontal 16:9 & Mobile 9:16 cuts)",
        production_notes: "Professional corporate narrator, subtle tech ambient synthesizer bed, bold kinetic typography for metrics.",
        storyboard: [
          {
            scene: 1,
            time: "0:00 - 0:18",
            visual: "Dark high-tech backdrop with glowing network topology. A shield icon pulses as an alert banner appears.",
            narration: `When unusual activity was detected in our Customer Management Portal on September 22nd, automated security telemetry responded immediately.`,
            subtitles: "Incident Response Briefing: Fast Detection, Complete Containment."
          },
          {
            scene: 2,
            time: "0:18 - 0:42",
            visual: "Kinetic timeline animation highlighting 09:14 IST alert, followed by an automated session lock graphic at 09:48 IST.",
            narration: `Within 34 minutes of detection, the affected account was isolated and all active sessions were revoked globally, stopping the unauthorized user in their tracks.`,
            subtitles: "Contained within 34 minutes. All active sessions invalidated globally."
          },
          {
            scene: 3,
            time: "0:42 - 1:10",
            visual: "Split screen displaying green verified database audit ticks on the left and cryptographic hash confirmation on the right.",
            narration: `Our forensic investigation verified that zero records were deleted and zero customer data was altered. Our defensive boundaries held firm.`,
            subtitles: "Forensic Audit: 0 records deleted. 100% database integrity preserved."
          },
          {
            scene: 4,
            time: "1:10 - 1:30",
            visual: "Employee tapping a physical security key onto a laptop, followed by the InfoWeave AI logo and closing tagline.",
            narration: `We have now enacted mandatory hardware Multi-Factor Authentication across all operations. Transparency and relentless security: that is our promise.`,
            subtitles: "Continuous Resilience: Mandatory Hardware MFA Enacted Enterprise-wide."
          }
        ]
      }
    };
  }

  // Fallback generic format
  const otStr = String(outputType);
  return {
    id: outputType,
    formatType: otStr.replace("-", " ").toUpperCase(),
    title: `Transformed Content: ${title}`,
    targetAudience: aud,
    readingTime: "2 min read",
    reviewStatus: "Draft",
    sections: {
      content: `Tailored content for ${aud} audience with ${tone} tone and ${detail} level of detail.`
    }
  };
}
