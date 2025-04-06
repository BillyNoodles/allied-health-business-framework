import { ComplianceFrameworkType, ComplianceRequirement } from './ComplianceFramework';

export const WORKCOVER_REQUIREMENTS: ComplianceRequirement[] = [
  {
    id: 'wc-001',
    title: 'Provider Registration',
    description: 'Registration with relevant state WorkCover authority as a healthcare provider',
    frameworkType: ComplianceFrameworkType.WORKCOVER,
    authority: 'State WorkCover Authorities',
    legislation: 'State-specific Workers Compensation Acts',
    riskLevel: 'high',
    verificationMethod: [
      'Registration certificate',
      'Provider number verification',
      'Annual renewal documentation'
    ],
    resources: ['DOCUMENT', 'TEMPLATE', 'CHECKLIST'],
    implementationSteps: [
      'Apply for provider registration with relevant state authority',
      'Maintain documentation of registration status',
      'Set up calendar reminders for renewal dates',
      'Verify registration status quarterly',
      'Ensure all practitioners are aware of registration requirements'
    ],
    reviewFrequency: 'annually'
  },
  {
    id: 'wc-002',
    title: 'Documentation Standards',
    description: 'Specific documentation requirements for WorkCover patients including initial assessments, progress reports, and treatment plans',
    frameworkType: ComplianceFrameworkType.WORKCOVER,
    authority: 'State WorkCover Authorities',
    legislation: 'State-specific Workers Compensation Acts',
    riskLevel: 'high',
    verificationMethod: [
      'Documentation audit',
      'Template verification',
      'Process review'
    ],
    resources: ['TEMPLATE', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Implement standardized templates for WorkCover documentation',
      'Train staff on documentation requirements',
      'Establish regular documentation audits',
      'Create process for timely submission of reports',
      'Develop system for tracking report due dates'
    ],
    reviewFrequency: 'quarterly'
  },
  {
    id: 'wc-003',
    title: 'Billing Compliance',
    description: 'Adherence to WorkCover fee schedules and billing requirements',
    frameworkType: ComplianceFrameworkType.WORKCOVER,
    authority: 'State WorkCover Authorities',
    legislation: 'State-specific Workers Compensation Acts',
    riskLevel: 'high',
    verificationMethod: [
      'Fee schedule verification',
      'Billing audit',
      'Claims review'
    ],
    resources: ['DOCUMENT', 'SPREADSHEET', 'GUIDE'],
    implementationSteps: [
      'Maintain current fee schedules for each state',
      'Configure practice management system with correct fees',
      'Train staff on billing procedures',
      'Implement pre-billing verification process',
      'Conduct regular billing audits'
    ],
    reviewFrequency: 'quarterly'
  },
  {
    id: 'wc-004',
    title: 'Treatment Approval Process',
    description: 'Process for obtaining and documenting approval for treatment plans and extended treatment',
    frameworkType: ComplianceFrameworkType.WORKCOVER,
    authority: 'State WorkCover Authorities',
    legislation: 'State-specific Workers Compensation Acts',
    riskLevel: 'medium',
    verificationMethod: [
      'Approval documentation',
      'Process audit',
      'System verification'
    ],
    resources: ['TEMPLATE', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Develop process for treatment approval requests',
      'Create templates for treatment plans',
      'Implement system for tracking approval status',
      'Train staff on approval requirements',
      'Establish follow-up procedures for pending approvals'
    ],
    reviewFrequency: 'biannually'
  },
  {
    id: 'wc-005',
    title: 'Outcome Measurement',
    description: 'Implementation of required outcome measures and reporting for WorkCover patients',
    frameworkType: ComplianceFrameworkType.WORKCOVER,
    authority: 'State WorkCover Authorities',
    legislation: 'State-specific Workers Compensation Acts',
    riskLevel: 'medium',
    verificationMethod: [
      'Outcome measure documentation',
      'Reporting verification',
      'Process audit'
    ],
    resources: ['TEMPLATE', 'GUIDE', 'TOOL'],
    implementationSteps: [
      'Identify required outcome measures for each state',
      'Implement standardized outcome measurement process',
      'Train staff on administration and documentation',
      'Develop reporting templates',
      'Establish schedule for outcome measurement'
    ],
    reviewFrequency: 'biannually'
  }
];

export const NDIS_REQUIREMENTS: ComplianceRequirement[] = [
  {
    id: 'ndis-001',
    title: 'NDIS Provider Registration',
    description: 'Registration with the NDIS Commission as a provider of supports',
    frameworkType: ComplianceFrameworkType.NDIS,
    authority: 'NDIS Quality and Safeguards Commission',
    legislation: 'NDIS Act 2013',
    standard: 'NDIS Practice Standards',
    riskLevel: 'high',
    verificationMethod: [
      'Registration certificate',
      'Audit completion evidence',
      'Renewal documentation'
    ],
    resources: ['DOCUMENT', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Complete NDIS provider application',
      'Undergo required quality audit',
      'Implement NDIS Practice Standards',
      'Maintain documentation of registration status',
      'Set up calendar reminders for renewal'
    ],
    reviewFrequency: 'annually'
  },
  {
    id: 'ndis-002',
    title: 'NDIS Practice Standards Compliance',
    description: 'Adherence to NDIS Practice Standards for service delivery',
    frameworkType: ComplianceFrameworkType.NDIS,
    authority: 'NDIS Quality and Safeguards Commission',
    legislation: 'NDIS Act 2013',
    standard: 'NDIS Practice Standards',
    riskLevel: 'high',
    verificationMethod: [
      'Self-assessment',
      'Quality audit',
      'Policy review'
    ],
    resources: ['DOCUMENT', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Conduct gap analysis against Practice Standards',
      'Develop policies and procedures to address gaps',
      'Train staff on Practice Standards requirements',
      'Implement quality management system',
      'Conduct regular internal audits'
    ],
    reviewFrequency: 'quarterly'
  },
  {
    id: 'ndis-003',
    title: 'NDIS Price Guide Compliance',
    description: 'Adherence to NDIS Price Guide for service pricing and billing',
    frameworkType: ComplianceFrameworkType.NDIS,
    authority: 'National Disability Insurance Agency',
    legislation: 'NDIS Act 2013',
    riskLevel: 'high',
    verificationMethod: [
      'Price guide verification',
      'Billing audit',
      'System configuration check'
    ],
    resources: ['DOCUMENT', 'SPREADSHEET', 'GUIDE'],
    implementationSteps: [
      'Maintain current NDIS Price Guide',
      'Configure practice management system with correct prices',
      'Train staff on NDIS billing procedures',
      'Implement pre-billing verification process',
      'Conduct regular billing audits'
    ],
    reviewFrequency: 'quarterly'
  },
  {
    id: 'ndis-004',
    title: 'Worker Screening Requirements',
    description: 'Compliance with NDIS Worker Screening requirements for all staff',
    frameworkType: ComplianceFrameworkType.NDIS,
    authority: 'NDIS Quality and Safeguards Commission',
    legislation: 'NDIS Act 2013',
    standard: 'NDIS Worker Screening Rules',
    riskLevel: 'high',
    verificationMethod: [
      'Worker screening clearance verification',
      'Staff records audit',
      'Process review'
    ],
    resources: ['DOCUMENT', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Identify staff requiring worker screening',
      'Implement application process for clearances',
      'Maintain register of clearances and expiry dates',
      'Set up monitoring system for renewals',
      'Verify clearance status quarterly'
    ],
    reviewFrequency: 'quarterly'
  },
  {
    id: 'ndis-005',
    title: 'Incident Management System',
    description: 'Implementation of incident management system for NDIS participants',
    frameworkType: ComplianceFrameworkType.NDIS,
    authority: 'NDIS Quality and Safeguards Commission',
    legislation: 'NDIS Act 2013',
    standard: 'NDIS Incident Management Rules',
    riskLevel: 'high',
    verificationMethod: [
      'Policy review',
      'Process audit',
      'Documentation check'
    ],
    resources: ['TEMPLATE', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Develop incident management policy',
      'Create incident reporting forms',
      'Train staff on incident identification and reporting',
      'Implement incident register',
      'Establish review process for incidents'
    ],
    reviewFrequency: 'quarterly'
  }
];

export const DVA_REQUIREMENTS: ComplianceRequirement[] = [
  {
    id: 'dva-001',
    title: 'DVA Provider Registration',
    description: 'Registration with the Department of Veterans\' Affairs as a healthcare provider',
    frameworkType: ComplianceFrameworkType.DVA,
    authority: 'Department of Veterans\' Affairs',
    legislation: 'Veterans\' Entitlements Act 1986',
    riskLevel: 'high',
    verificationMethod: [
      'Provider number verification',
      'Registration documentation',
      'Renewal evidence'
    ],
    resources: ['DOCUMENT', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Apply for DVA provider number',
      'Maintain documentation of registration status',
      'Set up calendar reminders for renewal',
      'Verify registration status quarterly',
      'Ensure all practitioners are aware of registration requirements'
    ],
    reviewFrequency: 'annually'
  },
  {
    id: 'dva-002',
    title: 'Treatment Cycle Requirements',
    description: 'Adherence to DVA Treatment Cycle requirements for referrals and reporting',
    frameworkType: ComplianceFrameworkType.DVA,
    authority: 'Department of Veterans\' Affairs',
    legislation: 'Veterans\' Entitlements Act 1986',
    standard: 'DVA Treatment Principles',
    riskLevel: 'high',
    verificationMethod: [
      'Referral documentation audit',
      'Reporting verification',
      'Process review'
    ],
    resources: ['TEMPLATE', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Implement treatment cycle tracking system',
      'Create templates for cycle reports',
      'Train staff on treatment cycle requirements',
      'Develop process for obtaining new referrals',
      'Establish reporting schedule'
    ],
    reviewFrequency: 'quarterly'
  },
  {
    id: 'dva-003',
    title: 'DVA Fee Schedule Compliance',
    description: 'Adherence to DVA Fee Schedule for service pricing and billing',
    frameworkType: ComplianceFrameworkType.DVA,
    authority: 'Department of Veterans\' Affairs',
    legislation: 'Veterans\' Entitlements Act 1986',
    riskLevel: 'high',
    verificationMethod: [
      'Fee schedule verification',
      'Billing audit',
      'System configuration check'
    ],
    resources: ['DOCUMENT', 'SPREADSHEET', 'GUIDE'],
    implementationSteps: [
      'Maintain current DVA Fee Schedule',
      'Configure practice management system with correct fees',
      'Train staff on DVA billing procedures',
      'Implement pre-billing verification process',
      'Conduct regular billing audits'
    ],
    reviewFrequency: 'quarterly'
  },
  {
    id: 'dva-004',
    title: 'Prior Approval Requirements',
    description: 'Process for obtaining prior approval for specified DVA services',
    frameworkType: ComplianceFrameworkType.DVA,
    authority: 'Department of Veterans\' Affairs',
    legislation: 'Veterans\' Entitlements Act 1986',
    standard: 'DVA Treatment Principles',
    riskLevel: 'medium',
    verificationMethod: [
      'Approval documentation',
      'Process audit',
      'System verification'
    ],
    resources: ['TEMPLATE', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Identify services requiring prior approval',
      'Develop process for approval requests',
      'Create templates for approval documentation',
      'Implement system for tracking approval status',
      'Train staff on approval requirements'
    ],
    reviewFrequency: 'biannually'
  },
  {
    id: 'dva-005',
    title: 'Card Type Verification',
    description: 'Process for verifying DVA card type and eligibility for services',
    frameworkType: ComplianceFrameworkType.DVA,
    authority: 'Department of Veterans\' Affairs',
    legislation: 'Veterans\' Entitlements Act 1986',
    riskLevel: 'medium',
    verificationMethod: [
      'Verification process audit',
      'Documentation check',
      'Staff knowledge assessment'
    ],
    resources: ['CHECKLIST', 'GUIDE', 'TRAINING'],
    implementationSteps: [
      'Develop card verification process',
      'Create reference guide for card types and entitlements',
      'Train staff on verification procedures',
      'Implement documentation system for card details',
      'Establish regular verification checks'
    ],
    reviewFrequency: 'biannually'
  }
];

export const INSURANCE_REQUIREMENTS: ComplianceRequirement[] = [
  {
    id: 'ins-001',
    title: 'Professional Indemnity Insurance',
    description: 'Maintenance of appropriate professional indemnity insurance coverage',
    frameworkType: ComplianceFrameworkType.INSURANCE,
    authority: 'AHPRA, Physiotherapy Board of Australia',
    legislation: 'Health Practitioner Regulation National Law',
    standard: 'PII Registration Standard',
    riskLevel: 'high',
    verificationMethod: [
      'Insurance certificate verification',
      'Coverage adequacy assessment',
      'Renewal documentation'
    ],
    resources: ['DOCUMENT', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Obtain minimum $20 million PII coverage',
      'Maintain documentation of insurance policies',
      'Set up calendar reminders for renewal dates',
      'Conduct annual coverage adequacy review',
      'Verify all practitioners have appropriate coverage'
    ],
    reviewFrequency: 'annually'
  },
  {
    id: 'ins-002',
    title: 'Public Liability Insurance',
    description: 'Maintenance of appropriate public liability insurance coverage',
    frameworkType: ComplianceFrameworkType.INSURANCE,
    authority: 'Business regulatory requirements',
    riskLevel: 'high',
    verificationMethod: [
      'Insurance certificate verification',
      'Coverage adequacy assessment',
      'Renewal documentation'
    ],
    resources: ['DOCUMENT', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Obtain minimum $20 million public liability coverage',
      'Maintain documentation of insurance policies',
      'Set up calendar reminders for renewal dates',
      'Conduct annual coverage adequacy review',
      'Ensure coverage includes all practice locations'
    ],
    reviewFrequency: 'annually'
  },
  {
    id: 'ins-003',
    title: 'Cyber Insurance',
    description: 'Implementation of cyber insurance coverage for data protection',
    frameworkType: ComplianceFrameworkType.INSURANCE,
    authority: 'Privacy Act requirements',
    legislation: 'Privacy Act 1988',
    riskLevel: 'medium',
    verificationMethod: [
      'Insurance certificate verification',
      'Coverage adequacy assessment',
      'Renewal documentation'
    ],
    resources: ['DOCUMENT', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Assess cyber risk exposure',
      'Obtain appropriate cyber insurance coverage',
      'Maintain documentation of insurance policies',
      'Set up calendar reminders for renewal dates',
      'Conduct annual coverage adequacy review'
    ],
    reviewFrequency: 'annually'
  },
  {
    id: 'ins-004',
    title: 'Business Continuity Insurance',
    description: 'Implementation of business continuity insurance coverage',
    frameworkType: ComplianceFrameworkType.INSURANCE,
    authority: 'Business regulatory requirements',
    riskLevel: 'medium',
    verificationMethod: [
      'Insurance certificate verification',
      'Coverage adequacy assessment',
      'Renewal documentation'
    ],
    resources: ['DOCUMENT', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Assess business interruption risks',
      'Obtain appropriate business continuity coverage',
      'Maintain documentation of insurance policies',
      'Set up calendar reminders for renewal dates',
      'Conduct annual coverage adequacy review'
    ],
    reviewFrequency: 'annually'
  },
  {
    id: 'ins-005',
    title: 'Claims Management Process',
    description: 'Implementation of process for managing insurance claims and incidents',
    frameworkType: ComplianceFrameworkType.INSURANCE,
    authority: 'Insurance provider requirements',
    riskLevel: 'medium',
    verificationMethod: [
      'Process documentation review',
      'Incident log verification',
      'Staff knowledge assessment'
    ],
    resources: ['TEMPLATE', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Develop claims management procedure',
      'Create incident documentation templates',
      'Train staff on incident reporting',
      'Implement incident register',
      'Establish insurer notification process'
    ],
    reviewFrequency: 'biannually'
  }
];

export const CYBERSECURITY_REQUIREMENTS: ComplianceRequirement[] = [
  {
    id: 'cyber-001',
    title: 'Essential Eight Implementation',
    description: 'Implementation of the Essential Eight security controls',
    frameworkType: ComplianceFrameworkType.CYBERSECURITY,
    authority: 'Australian Cyber Security Centre',
    standard: 'Essential Eight Maturity Model',
    riskLevel: 'high',
    verificationMethod: [
      'Security assessment',
      'Control implementation verification',
      'Maturity level assessment'
    ],
    resources: ['DOCUMENT', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Implement application control',
      'Patch applications',
      'Configure Microsoft Office macro settings',
      'Implement user application hardening',
      'Restrict administrative privileges',
      'Patch operating systems',
      'Implement multi-factor authentication',
      'Establish regular backup system'
    ],
    reviewFrequency: 'quarterly'
  },
  {
    id: 'cyber-002',
    title: 'Data Breach Response Plan',
    description: 'Implementation of data breach response plan compliant with NDB scheme',
    frameworkType: ComplianceFrameworkType.CYBERSECURITY,
    authority: 'Office of the Australian Information Commissioner',
    legislation: 'Privacy Act 1988',
    standard: 'Notifiable Data Breaches Scheme',
    riskLevel: 'high',
    verificationMethod: [
      'Plan documentation review',
      'Process verification',
      'Staff knowledge assessment'
    ],
    resources: ['TEMPLATE', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Develop data breach response plan',
      'Create breach assessment process',
      'Establish notification procedures',
      'Train staff on breach identification and response',
      'Conduct annual breach response simulation'
    ],
    reviewFrequency: 'annually'
  },
  {
    id: 'cyber-003',
    title: 'Access Control System',
    description: 'Implementation of role-based access control for systems and data',
    frameworkType: ComplianceFrameworkType.CYBERSECURITY,
    authority: 'Privacy Act requirements',
    legislation: 'Privacy Act 1988',
    standard: 'Australian Privacy Principles',
    riskLevel: 'high',
    verificationMethod: [
      'Access control matrix verification',
      'System configuration check',
      'User account audit'
    ],
    resources: ['TEMPLATE', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Develop access control matrix',
      'Implement role-based access controls',
      'Establish user account management process',
      'Conduct quarterly access reviews',
      'Implement principle of least privilege'
    ],
    reviewFrequency: 'quarterly'
  },
  {
    id: 'cyber-004',
    title: 'Security Awareness Training',
    description: 'Implementation of security awareness training program for all staff',
    frameworkType: ComplianceFrameworkType.CYBERSECURITY,
    authority: 'Privacy Act requirements',
    legislation: 'Privacy Act 1988',
    riskLevel: 'medium',
    verificationMethod: [
      'Training program review',
      'Completion records verification',
      'Staff knowledge assessment'
    ],
    resources: ['TRAINING', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Develop security awareness training program',
      'Create training materials',
      'Implement training schedule for all staff',
      'Conduct phishing simulations',
      'Track training completion and results'
    ],
    reviewFrequency: 'biannually'
  },
  {
    id: 'cyber-005',
    title: 'Mobile Device Security',
    description: 'Implementation of mobile device security controls',
    frameworkType: ComplianceFrameworkType.CYBERSECURITY,
    authority: 'Privacy Act requirements',
    legislation: 'Privacy Act 1988',
    riskLevel: 'medium',
    verificationMethod: [
      'Policy review',
      'Device configuration check',
      'MDM system verification'
    ],
    resources: ['DOCUMENT', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Develop mobile device security policy',
      'Implement mobile device management solution',
      'Configure device encryption',
      'Establish device passcode requirements',
      'Implement remote wipe capability'
    ],
    reviewFrequency: 'biannually'
  }
];

export const PRIVACY_REQUIREMENTS: ComplianceRequirement[] = [
  {
    id: 'priv-001',
    title: 'Privacy Policy Implementation',
    description: 'Development and implementation of privacy policy compliant with Privacy Act',
    frameworkType: ComplianceFrameworkType.PRIVACY,
    authority: 'Office of the Australian Information Commissioner',
    legislation: 'Privacy Act 1988',
    standard: 'Australian Privacy Principles',
    riskLevel: 'high',
    verificationMethod: [
      'Policy review',
      'Implementation verification',
      'Staff knowledge assessment'
    ],
    resources: ['DOCUMENT', 'TEMPLATE', 'GUIDE'],
    implementationSteps: [
      'Develop comprehensive privacy policy',
      'Ensure policy addresses all APPs',
      'Make policy available to patients',
      'Train staff on privacy requirements',
      'Review and update policy annually'
    ],
    reviewFrequency: 'annually'
  },
  {
    id: 'priv-002',
    title: 'Consent Management',
    description: 'Implementation of consent management system for collection and use of personal information',
    frameworkType: ComplianceFrameworkType.PRIVACY,
    authority: 'Office of the Australian Information Commissioner',
    legislation: 'Privacy Act 1988',
    standard: 'Australian Privacy Principles',
    riskLevel: 'high',
    verificationMethod: [
      'Consent form review',
      'Process verification',
      'Documentation audit'
    ],
    resources: ['TEMPLATE', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Develop consent forms and processes',
      'Implement system for recording consent',
      'Train staff on consent requirements',
      'Establish process for consent withdrawal',
      'Conduct regular consent documentation audits'
    ],
    reviewFrequency: 'biannually'
  },
  {
    id: 'priv-003',
    title: 'Data Security Measures',
    description: 'Implementation of data security measures to protect personal information',
    frameworkType: ComplianceFrameworkType.PRIVACY,
    authority: 'Office of the Australian Information Commissioner',
    legislation: 'Privacy Act 1988',
    standard: 'Australian Privacy Principles',
    riskLevel: 'high',
    verificationMethod: [
      'Security assessment',
      'Control implementation verification',
      'System configuration check'
    ],
    resources: ['DOCUMENT', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Implement data encryption',
      'Establish access controls',
      'Configure secure data storage',
      'Implement secure data transmission',
      'Establish data retention and destruction procedures'
    ],
    reviewFrequency: 'quarterly'
  },
  {
    id: 'priv-004',
    title: 'Third-Party Data Handling',
    description: 'Management of third-party providers with access to personal information',
    frameworkType: ComplianceFrameworkType.PRIVACY,
    authority: 'Office of the Australian Information Commissioner',
    legislation: 'Privacy Act 1988',
    standard: 'Australian Privacy Principles',
    riskLevel: 'medium',
    verificationMethod: [
      'Contract review',
      'Provider assessment',
      'Data handling verification'
    ],
    resources: ['TEMPLATE', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Identify all third-party data handlers',
      'Implement data handling agreements',
      'Assess third-party security measures',
      'Establish monitoring process',
      'Conduct annual provider reviews'
    ],
    reviewFrequency: 'annually'
  },
  {
    id: 'priv-005',
    title: 'Patient Access to Information',
    description: 'Process for patients to access and correct their personal information',
    frameworkType: ComplianceFrameworkType.PRIVACY,
    authority: 'Office of the Australian Information Commissioner',
    legislation: 'Privacy Act 1988',
    standard: 'Australian Privacy Principles',
    riskLevel: 'medium',
    verificationMethod: [
      'Process documentation review',
      'Request handling verification',
      'Staff knowledge assessment'
    ],
    resources: ['TEMPLATE', 'CHECKLIST', 'GUIDE'],
    implementationSteps: [
      'Develop information access procedure',
      'Create request forms and templates',
      'Establish verification process',
      'Train staff on handling access requests',
      'Implement tracking system for requests'
    ],
    reviewFrequency: 'biannually'
  }
];
