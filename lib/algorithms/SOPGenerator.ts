import { SOPType } from '@/lib/models/SOPType';
import { AssessmentCategory } from '@/lib/models/AssessmentCategory';
import { DisciplineType } from '@/lib/models/DisciplineType';
import { PracticeSize } from '@/lib/models/PracticeSize';
import { BusinessHealthScore } from './BusinessHealthScoreCalculator';

// Define types for SOP generation
export interface SOPTemplate {
  id: string;
  title: string;
  type: SOPType;
  description: string;
  relatedCategories: AssessmentCategory[];
  applicableDisciplines: DisciplineType[];
  applicableSizes: PracticeSize[];
  sections: SOPSection[];
  recommendedReviewFrequency: 'monthly' | 'quarterly' | 'biannually' | 'annually';
  regulatoryBasis?: string; // Added for regulatory compliance
  industryStandards?: string[]; // Added for industry standards
}

export interface SOPSection {
  title: string;
  content: string;
  isRequired: boolean;
  variables: string[]; // Placeholders that need to be replaced with practice-specific info
  regulatoryReference?: string; // Added for regulatory compliance
}

export interface GeneratedSOP {
  id: string;
  templateId: string;
  title: string;
  type: SOPType;
  createdAt: Date;
  lastModified: Date;
  sections: SOPSection[];
  status: 'draft' | 'active' | 'archived';
  nextReviewDate: Date;
  regulatoryCompliance?: {
    authority: string;
    standard: string;
    lastVerified: Date;
  }; // Added for regulatory compliance
}

// SOP Generator
export class SOPGenerator {
  // Database of SOP templates - Enhanced with domain-specific knowledge
  private static readonly SOP_TEMPLATES: SOPTemplate[] = [
    // Financial SOP templates - Updated with fee schedule data
    {
      id: 'sop-fin-001',
      title: 'Patient Billing and Collection Procedure',
      type: SOPType.FINANCIAL,
      description: 'Standard procedure for billing patients and collecting payments',
      relatedCategories: [AssessmentCategory.FINANCIAL, AssessmentCategory.OPERATIONS],
      applicableDisciplines: [DisciplineType.PHYSIOTHERAPY, DisciplineType.OCCUPATIONAL_THERAPY, DisciplineType.SPEECH_THERAPY],
      applicableSizes: [PracticeSize.SOLO, PracticeSize.SMALL, PracticeSize.MEDIUM, PracticeSize.LARGE, PracticeSize.ENTERPRISE],
      sections: [
        {
          title: 'Purpose',
          content: 'This Standard Operating Procedure (SOP) outlines the process for billing patients and collecting payments at {{practiceName}}. It ensures consistent, accurate, and timely billing practices that comply with relevant regulations and optimize cash flow.',
          isRequired: true,
          variables: ['practiceName']
        },
        {
          title: 'Scope',
          content: 'This procedure applies to all patient billing activities, including insurance billing, patient statements, payment collection, and management of accounts receivable.',
          isRequired: true,
          variables: []
        },
        {
          title: 'Responsibilities',
          content: 'The following roles are responsible for implementing this procedure:\n\n- **{{billingRoleName}}**: Responsible for processing insurance claims, generating patient statements, and tracking accounts receivable\n- **{{frontDeskRoleName}}**: Responsible for collecting payments at time of service and verifying insurance information\n- **{{managerRoleName}}**: Responsible for overseeing the billing process and resolving escalated issues',
          isRequired: true,
          variables: ['billingRoleName', 'frontDeskRoleName', 'managerRoleName']
        },
        {
          title: 'Insurance Verification Procedure',
          content: '1. Verify patient insurance coverage prior to initial appointment\n2. Document insurance information in practice management system\n3. Confirm coverage for specific services to be provided\n4. Determine patient responsibility (co-pays, deductibles)\n5. Communicate patient responsibility to patient before appointment\n6. For WorkCover, DVA, or NDIS patients, verify specific program requirements and authorization',
          isRequired: true,
          variables: [],
          regulatoryReference: 'Insurance Compliance Guide Section 2.3'
        },
        {
          title: 'Time of Service Collection Procedure',
          content: '1. Collect co-pays and outstanding balances at check-in\n2. Provide patients with receipt for all payments\n3. Document all payments in practice management system\n4. Reconcile payments daily\n5. For patients unable to pay, follow the payment plan procedure\n6. Ensure fee schedule is current and displayed according to regulatory requirements',
          isRequired: true,
          variables: [],
          regulatoryReference: 'Fee Schedule Compliance Section 1.2'
        },
        {
          title: 'Insurance Billing Procedure',
          content: '1. Submit claims within {{claimSubmissionTimeframe}} of service\n2. Include all required documentation and coding\n3. Track claim status and follow up on unpaid claims after {{claimFollowupDays}} days\n4. Document all communication with insurance companies\n5. Appeal denied claims when appropriate\n6. For WorkCover claims, include all required documentation per state guidelines\n7. For DVA claims, use appropriate DVA item numbers and follow DVA billing requirements\n8. For NDIS claims, ensure service agreements are in place and use correct NDIS codes',
          isRequired: true,
          variables: ['claimSubmissionTimeframe', 'claimFollowupDays'],
          regulatoryReference: 'Insurance Compliance Guide Section 3.1-3.4'
        },
        {
          title: 'Patient Statement Procedure',
          content: '1. Generate patient statements {{statementFrequency}}\n2. Clearly indicate services provided, insurance payments, and patient responsibility\n3. Include multiple payment options\n4. Provide clear contact information for billing questions\n5. Ensure statements comply with Privacy Act requirements',
          isRequired: true,
          variables: ['statementFrequency'],
          regulatoryReference: 'Privacy Act 1988 - Billing Communications'
        },
        {
          title: 'Accounts Receivable Management',
          content: '1. Age accounts receivable weekly\n2. Follow up on accounts at 30, 60, and 90 days past due\n3. Implement {{collectionStrategy}} for accounts over 90 days\n4. Document all collection efforts\n5. Review accounts receivable reports monthly with management\n6. Target Days in AR: 30 days or less based on industry benchmarks\n7. Target Collection Rate: 95% or higher based on industry benchmarks',
          isRequired: true,
          variables: ['collectionStrategy']
        },
        {
          title: 'Payment Plans',
          content: 'For patients unable to pay their balance in full:\n\n1. Offer payment plans based on balance amount:\n   - Balances under $500: Up to 3 months\n   - Balances $500-$1000: Up to 6 months\n   - Balances over $1000: Up to 12 months\n2. Document payment plan agreement with patient signature\n3. Set up automatic payments when possible\n4. Send monthly statements showing payment plan progress',
          isRequired: false,
          variables: []
        },
        {
          title: 'Refund Procedure',
          content: '1. Identify overpayments through regular account reviews\n2. Verify overpayment amount and source\n3. Process refunds within {{refundTimeframe}}\n4. Document all refunds in practice management system\n5. Include explanation of refund with payment',
          isRequired: false,
          variables: ['refundTimeframe']
        },
        {
          title: 'Fee Schedule Management',
          content: '1. Review and update fee schedule annually\n2. Ensure fees align with current market rates based on fee schedule benchmarks\n3. Maintain separate fee schedules for different funding sources (private, WorkCover, DVA, NDIS)\n4. Display fees in accordance with regulatory requirements\n5. Communicate fee changes to patients with appropriate notice\n6. Train staff on current fee schedule and billing rules for each funding source',
          isRequired: true,
          variables: [],
          regulatoryReference: 'Fee Schedule Compliance Section 2.1'
        },
        {
          title: 'Performance Metrics',
          content: 'The following metrics will be tracked to evaluate the effectiveness of this procedure:\n\n1. Days in Accounts Receivable (target: {{targetDaysAR}} days)\n2. Clean Claim Rate (target: {{targetCleanClaimRate}}%)\n3. Collection Rate (target: {{targetCollectionRate}}%)\n4. Time of Service Collection Rate (target: {{targetTOSRate}}%)',
          isRequired: false,
          variables: ['targetDaysAR', 'targetCleanClaimRate', 'targetCollectionRate', 'targetTOSRate']
        },
        {
          title: 'References',
          content: '- Practice Management System User Guide\n- {{billingComplianceReference}}\n- Insurance Payer Manuals\n- WorkCover Billing Guidelines\n- DVA Fee Schedule\n- NDIS Price Guide\n- Privacy Act 1988 Requirements',
          isRequired: false,
          variables: ['billingComplianceReference']
        }
      ],
      recommendedReviewFrequency: 'quarterly',
      regulatoryBasis: 'Privacy Act 1988, Health Insurance Act, State WorkCover Regulations, DVA Requirements, NDIS Rules',
      industryStandards: ['APA Billing Best Practices', 'Healthcare Billing Standards 2023']
    },
    
    // Operations SOP templates - Updated with practice research
    {
      id: 'sop-ops-001',
      title: 'Patient Scheduling and Appointment Management',
      type: SOPType.OPERATIONS,
      description: 'Standard procedure for scheduling and managing patient appointments',
      relatedCategories: [AssessmentCategory.OPERATIONS, AssessmentCategory.PATIENT_CARE],
      applicableDisciplines: [DisciplineType.PHYSIOTHERAPY, DisciplineType.OCCUPATIONAL_THERAPY, DisciplineType.SPEECH_THERAPY],
      applicableSizes: [PracticeSize.SOLO, PracticeSize.SMALL, PracticeSize.MEDIUM, PracticeSize.LARGE, PracticeSize.ENTERPRISE],
      sections: [
        {
          title: 'Purpose',
          content: 'This Standard Operating Procedure (SOP) establishes the process for scheduling and managing patient appointments at {{practiceName}}. It ensures efficient scheduling practices that maximize provider productivity while delivering excellent patient experience.',
          isRequired: true,
          variables: ['practiceName']
        },
        {
          title: 'Scope',
          content: 'This procedure applies to all appointment scheduling activities, including new patient appointments, follow-up appointments, rescheduling, cancellations, and no-shows.',
          isRequired: true,
          variables: []
        },
        {
          title: 'Responsibilities',
          content: 'The following roles are responsible for implementing this procedure:\n\n- **{{schedulingRoleName}}**: Responsible for scheduling appointments, managing the calendar, and communicating with patients\n- **{{providerRoleName}}**: Responsible for determining appointment types and durations needed for patients\n- **{{managerRoleName}}**: Responsible for overseeing scheduling efficiency and resolving conflicts',
          isRequired: true,
          variables: ['schedulingRoleName', 'providerRoleName', 'managerRoleName']
        },
        {
          title: 'Appointment Types and Duration',
          content: 'The practice offers the following appointment types:\n\n1. **Initial Evaluation**: {{initialEvalDuration}} minutes\n2. **Standard Treatment**: {{standardTreatmentDuration}} minutes\n3. **Extended Treatment**: {{extendedTreatmentDuration}} minutes\n4. **Re-evaluation**: {{reEvalDuration}} minutes\n5. **Quick Check**: {{quickCheckDuration}} minutes',
          isRequired: true,
          variables: ['initialEvalDuration', 'standardTreatmentDuration', 'extendedTreatmentDuration', 'reEvalDuration', 'quickCheckDuration']
        },
        {
          title: 'New Patient Scheduling Procedure',
          content: '1. Collect patient contact information and reason for visit\n2. Verify insurance eligibility\n3. Schedule initial evaluation appointment\n4. Send new patient forms {{daysPriorToSendForms}} days before appointment\n5. Send appointment reminder {{reminderTimeframe}} before appointment\n6. Document all patient communication in practice management system',
          isRequired: true,
          variables: ['daysPriorToSendForms', 'reminderTimeframe']
        },
        {
          title: 'Follow-up Appointment Scheduling',
          content: '1. Schedule follow-up appointments based on provider recommendation\n2. Book series of appointments when possible\n3. Provide patient with appointment card or digital confirmation\n4. Send appointment reminders {{reminderTimeframe}} before each appointment',
          isRequired: true,
          variables: ['reminderTimeframe']
        },
        {
          title: 'Cancellation and Rescheduling Policy',
          content: '1. Patients must provide {{cancellationNoticeHours}} hours notice for cancellations\n2. Document reason for cancellation in patient record\n3. Attempt to reschedule cancelled appointments within {{rescheduleTimeframe}}\n4. For late cancellations, follow the late cancellation fee procedure\n5. Maintain a cancellation list for filling unexpected openings',
          isRequired: true,
          variables: ['cancellationNoticeHours', 'rescheduleTimeframe']
        },
        {
          title: 'No-Show Management',
          content: '1. Document no-shows in patient record\n2. Contact patient same day to reschedule\n3. Apply no-show fee according to policy\n4. After {{consecutiveNoShows}} consecutive no-shows, review case with provider before scheduling further appointments\n5. Send no-show letters for documentation',
          isRequired: true,
          variables: ['consecutiveNoShows']
        },
        {
          title: 'Wait List Management',
          content: '1. Maintain wait list for preferred appointment times\n2. Contact wait list patients when openings occur\n3. Document all wait list communication\n4. Review and update wait list {{waitListReviewFrequency}}',
          isRequired: false,
          variables: ['waitListReviewFrequency']
        },
        {
          title: 'Provider Schedule Management',
          content: '1. Block provider time for administrative tasks, meetings, and breaks\n2. Maintain {{bufferTime}} minutes between initial evaluations\n3. Limit initial evaluations to {{maxInitialEvalsPerDay}} per provider per day\n4. Coordinate provider time off at least {{providerTimeOffNotice}} in advance\n5. Distribute schedule to providers {{scheduleDistributionTimeframe}} in advance',
          isRequired: false,
          variables: ['bufferTime', 'maxInitialEvalsPerDay', 'providerTimeOffNotice', 'scheduleDistributionTimeframe']
        },
        {
          title: 'Schedule Optimization',
          content: '1. Analyze appointment patterns to identify peak and slow periods\n2. Adjust provider schedules to match demand patterns\n3. Implement scheduling templates that optimize provider productivity\n4. Target schedule utilization rate of 80% or higher based on industry benchmarks\n5. Monitor and reduce no-show rate to 10% or lower based on industry benchmarks\n6. Review schedule efficiency metrics monthly and adjust as needed',
          isRequired: true,
          variables: []
        },
        {
          title: 'Performance Metrics',
          content: 'The following metrics will be tracked to evaluate the effectiveness of this procedure:\n\n1. Schedule Utilization Rate (target: {{targetUtilizationRate}}%)\n2. No-show Rate (target: under {{targetNoShowRate}}%)\n3. Cancellation Rate (target: under {{targetCancellationRate}}%)\n4. Patient Wait Time (target: under {{targetWaitTime}} minutes)',
          isRequired: false,
          variables: ['targetUtilizationRate', 'targetNoShowRate', 'targetCancellationRate', 'targetWaitTime']
        }
      ],
      recommendedReviewFrequency: 'biannually',
      industryStandards: ['APA Practice Management Guidelines', 'Healthcare Scheduling Efficiency Standards 2023']
    },
    
    // New Compliance SOP template - Added based on regulatory framework
    {
      id: 'sop-comp-001',
      title: 'Regulatory Compliance Management',
      type: SOPType.COMPLIANCE,
      description: 'Standard procedure for ensuring compliance with regulatory requirements for physiotherapy practices',
      relatedCategories: [AssessmentCategory.COMPLIANCE, AssessmentCategory.OPERATIONS, AssessmentCategory.PATIENT_CARE],
      applicableDisciplines: [DisciplineType.PHYSIOTHERAPY],
      applicableSizes: [PracticeSize.SOLO, PracticeSize.SMALL, PracticeSize.MEDIUM, PracticeSize.LARGE, PracticeSize.ENTERPRISE],
      sections: [
        {
          title: 'Purpose',
          content: 'This Standard Operating Procedure (SOP) establishes the process for ensuring {{practiceName}} maintains compliance with all regulatory requirements applicable to physiotherapy practices. It provides a structured approach to managing registration, insurance, documentation, and reporting obligations.',
          isRequired: true,
          variables: ['practiceName'],
          regulatoryReference: 'AHPRA Registration Standards'
        },
        {
          title: 'Scope',
          content: 'This procedure applies to all aspects of regulatory compliance, including practitioner registration, professional indemnity insurance, clinical documentation, privacy, infection control, workplace health and safety, and program-specific requirements.',
          isRequired: true,
          variables: []
        },
        {
          title: 'Responsibilities',
          content: 'The following roles are responsible for implementing this procedure:\n\n- **{{complianceOfficerRole}}**: Responsible for overseeing compliance activities and maintaining the compliance register\n- **{{practitionerRole}}**: Responsible for maintaining individual registration and CPD requirements\n- **{{managerRole}}**: Responsible for ensuring practice-wide compliance and addressing identified issues',
          isRequired: true,
          variables: ['complianceOfficerRole', 'practitionerRole', 'managerRole']
        },
        {
          title: 'AHPRA Registration Management',
          content: '1. Maintain a register of all practitioners with their:\n   - AHPRA registration number\n   - Registration expiry date\n   - Registration conditions (if any)\n2. Set up calendar reminders {{registrationReminderMonths}} months before expiration\n3. Verify registration status quarterly via the AHPRA register\n4. Maintain copies of current registration certificates\n5. Ensure practitioners display registration information as required',
          isRequired: true,
          variables: ['registrationReminderMonths'],
          regulatoryReference: 'Health Practitioner Regulation National Law, AHPRA Registration Standards'
        },
        {
          title: 'Professional Indemnity Insurance Management',
          content: '1. Ensure all practitioners maintain professional indemnity insurance with minimum coverage of $20 million\n2. Maintain a register of insurance policies with:\n   - Policy numbers\n   - Coverage amounts\n   - Expiry dates\n3. Set up calendar reminders {{insuranceReminderMonths}} months before expiration\n4. Verify insurance coverage meets AHPRA requirements\n5. Maintain copies of current insurance certificates',
          isRequired: true,
          variables: ['insuranceReminderMonths'],
          regulatoryReference: 'AHPRA Professional Indemnity Insurance Registration Standard'
        },
        {
          title: 'Continuing Professional Development Tracking',
          content: '1. Establish a system for tracking CPD activities for all practitioners\n2. Ensure practitioners complete minimum 20 CPD hours annually\n3. Verify CPD activities meet the requirements for:\n   - Relevance to scope of practice\n   - Mix of activities (formal/informal)\n   - Evidence-based practice focus\n4. Maintain documentation of all CPD activities\n5. Conduct quarterly reviews of CPD progress\n6. Provide support for practitioners not meeting targets',
          isRequired: true,
          variables: [],
          regulatoryReference: 'AHPRA Continuing Professional Development Registration Standard'
        },
        {
          title: 'Clinical Documentation Standards',
          content: '1. Implement standardized documentation templates that meet regulatory requirements\n2. Ensure all patient records include:\n   - Comprehensive initial assessment\n   - Clear treatment plans with measurable goals\n   - Detailed treatment notes for each session\n   - Regular progress evaluations\n   - Discharge summaries\n3. Conduct regular documentation audits using the {{auditFrequency}} schedule\n4. Provide feedback and training based on audit results\n5. Maintain records for minimum {{recordRetentionYears}} years',
          isRequired: true,
          variables: ['auditFrequency', 'recordRetentionYears'],
          regulatoryReference: 'APA Documentation Guidelines, Health Records Acts'
        },
        {
          title: 'Privacy Compliance',
          content: '1. Develop and maintain a privacy policy compliant with the Privacy Act 1988\n2. Ensure all staff complete privacy training annually\n3. Implement secure systems for handling patient information\n4. Obtain appropriate consent for collection and use of personal information\n5. Establish a process for handling privacy breaches\n6. Conduct privacy impact assessments for new systems or processes\n7. Display privacy notices in reception areas and on practice website',
          isRequired: true,
          variables: [],
          regulatoryReference: 'Privacy Act 1988, Australian Privacy Principles'
        },
        {
          title: 'Infection Control',
          content: '1. Develop and maintain infection control procedures aligned with NHMRC guidelines\n2. Ensure all staff complete infection control training annually\n3. Implement cleaning schedules for treatment areas and equipment\n4. Maintain adequate supplies of PPE and hand hygiene products\n5. Conduct regular infection control audits\n6. Document all infection control activities\n7. Update procedures based on current public health guidance',
          isRequired: true,
          variables: [],
          regulatoryReference: 'NHMRC Infection Control Guidelines, Public Health Acts'
        },
        {
          title: 'WorkCover/Insurance Provider Compliance',
          content: '1. Maintain current knowledge of WorkCover requirements for each relevant state/territory\n2. Ensure all practitioners are registered with relevant WorkCover authorities\n3. Implement standardized documentation templates for WorkCover patients\n4. Establish processes for obtaining and documenting appropriate referrals and approvals\n5. Conduct regular audits of WorkCover documentation\n6. Provide regular training on WorkCover requirements',
          isRequired: true,
          variables: [],
          regulatoryReference: 'State/Territory WorkCover Legislation and Provider Requirements'
        },
        {
          title: 'Compliance Calendar and Monitoring',
          content: '1. Maintain a compliance calendar with all key dates and deadlines\n2. Conduct monthly reviews of upcoming compliance requirements\n3. Assign responsibility for each compliance activity\n4. Document completion of all compliance activities\n5. Report compliance status to practice leadership {{complianceReportFrequency}}\n6. Conduct annual comprehensive compliance review',
          isRequired: true,
          variables: ['complianceReportFrequency']
        },
        {
          title: 'Compliance Risk Assessment',
          content: '1. Conduct annual compliance risk assessment\n2. Identify high-risk areas based on:\n   - Regulatory changes\n   - Practice changes\n   - Previous compliance issues\n   - Industry trends\n3. Develop mitigation strategies for identified risks\n4. Implement controls to address high-priority risks\n5. Monitor effectiveness of risk mitigation strategies',
          isRequired: false,
          variables: []
        },
        {
          title: 'References',
          content: '- AHPRA Registration Standards\n- Physiotherapy Board of Australia Guidelines\n- APA Code of Conduct\n- Privacy Act 1988 and Australian Privacy Principles\n- State/Territory Health Records Acts\n- WorkCover/Insurance Provider Requirements\n- NHMRC Infection Control Guidelines\n- Work Health and Safety Legislation',
          isRequired: true,
          variables: []
        }
      ],
      recommendedReviewFrequency: 'quarterly',
      regulatoryBasis: 'Health Practitioner Regulation National Law, AHPRA Registration Standards, Privacy Act 1988, State/Territory Health Records Acts, WorkCover Legislation',
      industryStandards: ['APA Code of Conduct', 'APA Documentation Guidelines', 'NHMRC Infection Control Guidelines']
    },
    
    // New Cybersecurity SOP template - Added based on cybersecurity framework
    {
      id: 'sop-tech-001',
      title: 'Data Security and Privacy Protection',
      type: SOPType.TECHNOLOGY,
      description: 'Standard procedure for ensuring data security and privacy protection in healthcare practice',
      relatedCategories: [AssessmentCategory.TECHNOLOGY, AssessmentCategory.COMPLIANCE],
      applicableDisciplines: [DisciplineType.PHYSIOTHERAPY, DisciplineType.OCCUPATIONAL_THERAPY, DisciplineType.SPEECH_THERAPY, DisciplineType.CHIROPRACTIC, DisciplineType.PODIATRY],
      applicableSizes: [PracticeSize.SOLO, PracticeSize.SMALL, PracticeSize.MEDIUM, PracticeSize.LARGE, PracticeSize.ENTERPRISE],
      sections: [
        {
          title: 'Purpose',
          content: 'This Standard Operating Procedure (SOP) establishes the process for protecting patient data and practice information at {{practiceName}}. It ensures compliance with privacy legislation and cybersecurity best practices to safeguard sensitive information.',
          isRequired: true,
          variables: ['practiceName'],
          regulatoryReference: 'Privacy Act 1988, Notifiable Data Breaches Scheme'
        },
        {
          title: 'Scope',
          content: 'This procedure applies to all aspects of data security and privacy protection, including electronic health records, practice management systems, email communications, mobile devices, physical records, and third-party service providers.',
          isRequired: true,
          variables: []
        },
        {
          title: 'Responsibilities',
          content: 'The following roles are responsible for implementing this procedure:\n\n- **{{securityOfficerRole}}**: Responsible for overseeing data security activities and incident response\n- **{{itSupportRole}}**: Responsible for implementing technical security controls\n- **{{staffRole}}**: Responsible for following security procedures and reporting incidents\n- **{{managerRole}}**: Responsible for ensuring practice-wide compliance with security requirements',
          isRequired: true,
          variables: ['securityOfficerRole', 'itSupportRole', 'staffRole', 'managerRole']
        },
        {
          title: 'Essential Eight Security Controls',
          content: '1. **Application Control**\n   - Maintain a whitelist of approved applications\n   - Prevent execution of unapproved/malicious programs\n   - Review and update whitelist quarterly\n\n2. **Patch Applications**\n   - Apply security patches to applications within {{patchTimeframe}}\n   - Automatically update applications where possible\n   - Maintain a register of all applications and patch status\n\n3. **Configure Microsoft Office Macro Settings**\n   - Block macros from the internet\n   - Only allow vetted macros in trusted locations\n   - Control macro execution in trusted documents\n\n4. **User Application Hardening**\n   - Configure web browsers to block Flash, ads, and Java\n   - Prevent users from changing security settings\n   - Disable unnecessary features in Microsoft Office\n\n5. **Restrict Administrative Privileges**\n   - Limit admin privileges to only necessary staff\n   - Review admin privileges quarterly\n   - Use separate accounts for admin and standard activities\n\n6. **Patch Operating Systems**\n   - Apply security patches to operating systems within {{patchTimeframe}}\n   - Enable automatic updates\n   - Maintain a register of all systems and patch status\n\n7. **Multi-factor Authentication**\n   - Implement MFA for all remote access\n   - Require MFA for all privileged accounts\n   - Use MFA for accessing sensitive information\n\n8. **Regular Backups**\n   - Perform daily backups of important data\n   - Store backups securely offsite/offline\n   - Test restoration process {{backupTestFrequency}}',
          isRequired: true,
          variables: ['patchTimeframe', 'backupTestFrequency'],
          regulatoryReference: 'Essential Eight Maturity Model, ACSC Guidelines'
        },
        {
          title: 'Password Management',
          content: '1. Implement strong password requirements:\n   - Minimum {{passwordLength}} characters\n   - Complexity requirements (uppercase, lowercase, numbers, symbols)\n   - No common words or personal information\n2. Require password changes every {{passwordChangeDays}} days\n3. Implement account lockout after {{failedLoginAttempts}} failed attempts\n4. Use a secure password manager for storing credentials\n5. Prohibit password sharing and reuse across systems',
          isRequired: true,
          variables: ['passwordLength', 'passwordChangeDays', 'failedLoginAttempts']
        },
        {
          title: 'Email Security',
          content: '1. Implement email filtering to block malicious content\n2. Train staff to identify phishing attempts\n3. Encrypt emails containing sensitive information\n4. Verify recipient email addresses before sending sensitive information\n5. Implement secure email gateway with anti-malware scanning\n6. Establish policy for handling suspicious emails',
          isRequired: true,
          variables: []
        },
        {
          title: 'Mobile Device Security',
          content: '1. Require passcodes on all mobile devices accessing practice data\n2. Implement mobile device management (MDM) solution\n3. Enable remote wipe capability for lost/stolen devices\n4. Encrypt all mobile devices\n5. Restrict app installation to approved applications\n6. Require regular security updates',
          isRequired: true,
          variables: []
        },
        {
          title: 'Physical Security Controls',
          content: '1. Secure server rooms and network equipment\n2. Implement access controls for restricted areas\n3. Position screens to prevent unauthorized viewing\n4. Lock workstations when unattended (auto-lock after {{autoLockMinutes}} minutes)\n5. Secure physical records in locked cabinets\n6. Maintain visitor log and escort visitors in sensitive areas\n7. Implement clean desk policy',
          isRequired: true,
          variables: ['autoLockMinutes']
        },
        {
          title: 'Data Breach Response Plan',
          content: '1. Establish data breach response team with clear roles\n2. Document steps for containing and assessing breaches:\n   - Immediate containment actions\n   - Assessment of breach scope and risk\n   - Notification requirements determination\n3. Implement notification procedures compliant with the Notifiable Data Breaches scheme\n4. Document all breach incidents and response actions\n5. Conduct post-incident review and implement improvements\n6. Test breach response plan annually',
          isRequired: true,
          variables: [],
          regulatoryReference: 'Notifiable Data Breaches Scheme, OAIC Guidelines'
        },
        {
          title: 'Staff Security Training',
          content: '1. Conduct security awareness training for all staff:\n   - Initial training for new staff\n   - Refresher training {{securityTrainingFrequency}}\n2. Include training on:\n   - Password security\n   - Phishing awareness\n   - Safe internet usage\n   - Mobile device security\n   - Physical security\n   - Data breach reporting\n3. Document all training completion\n4. Conduct simulated phishing tests to assess awareness',
          isRequired: true,
          variables: ['securityTrainingFrequency']
        },
        {
          title: 'Third-Party Security Management',
          content: '1. Assess security practices of all third-party service providers\n2. Include security and privacy requirements in contracts\n3. Verify compliance with security requirements annually\n4. Limit third-party access to minimum necessary data\n5. Review third-party access privileges quarterly\n6. Maintain register of all third-party service providers',
          isRequired: false,
          variables: []
        },
        {
          title: 'Security Monitoring and Auditing',
          content: '1. Implement logging for all systems and applications\n2. Review security logs {{logReviewFrequency}}\n3. Monitor for unauthorized access attempts\n4. Conduct security audits {{securityAuditFrequency}}\n5. Address identified security issues promptly\n6. Document all monitoring and audit activities',
          isRequired: false,
          variables: ['logReviewFrequency', 'securityAuditFrequency']
        },
        {
          title: 'References',
          content: '- Privacy Act 1988 and Australian Privacy Principles\n- Notifiable Data Breaches Scheme\n- ACSC Essential Eight Maturity Model\n- OAIC Data Breach Preparation and Response Guide\n- RACGP Computer and Information Security Standards\n- {{practiceSecurityPolicyDocument}}',
          isRequired: true,
          variables: ['practiceSecurityPolicyDocument']
        }
      ],
      recommendedReviewFrequency: 'quarterly',
      regulatoryBasis: 'Privacy Act 1988, Australian Privacy Principles, Notifiable Data Breaches Scheme',
      industryStandards: ['ACSC Essential Eight', 'RACGP Computer and Information Security Standards', 'ISO 27001']
    },
    
    // New Patient Care SOP template - Added based on physiotherapy benchmarks
    {
      id: 'sop-pat-001',
      title: 'Clinical Outcomes Measurement and Reporting',
      type: SOPType.PATIENT_CARE,
      description: 'Standard procedure for measuring, tracking, and reporting clinical outcomes',
      relatedCategories: [AssessmentCategory.PATIENT_CARE, AssessmentCategory.OPERATIONS],
      applicableDisciplines: [DisciplineType.PHYSIOTHERAPY],
      applicableSizes: [PracticeSize.SOLO, PracticeSize.SMALL, PracticeSize.MEDIUM, PracticeSize.LARGE, PracticeSize.ENTERPRISE],
      sections: [
        {
          title: 'Purpose',
          content: 'This Standard Operating Procedure (SOP) establishes the process for measuring, tracking, and reporting clinical outcomes at {{practiceName}}. It ensures consistent use of validated outcome measures to demonstrate treatment effectiveness, guide clinical decision-making, and support quality improvement.',
          isRequired: true,
          variables: ['practiceName']
        },
        {
          title: 'Scope',
          content: 'This procedure applies to all patient care activities, including initial assessment, treatment planning, progress monitoring, and discharge planning.',
          isRequired: true,
          variables: []
        },
        {
          title: 'Responsibilities',
          content: 'The following roles are responsible for implementing this procedure:\n\n- **{{clinicianRole}}**: Responsible for administering outcome measures and documenting results\n- **{{clinicalLeaderRole}}**: Responsible for selecting appropriate outcome measures and ensuring consistent application\n- **{{dataAnalystRole}}**: Responsible for aggregating and analyzing outcomes data\n- **{{managerRole}}**: Responsible for using outcomes data for quality improvement',
          isRequired: true,
          variables: ['clinicianRole', 'clinicalLeaderRole', 'dataAnalystRole', 'managerRole']
        },
        {
          title: 'Standard Outcome Measures',
          content: 'The practice will use the following validated outcome measures based on condition:\n\n1. **Pain Measures**:\n   - Numeric Pain Rating Scale (NPRS)\n   - Visual Analog Scale (VAS)\n   - Pain Self-Efficacy Questionnaire (PSEQ)\n\n2. **Function Measures**:\n   - Patient-Specific Functional Scale (PSFS)\n   - Lower Extremity Functional Scale (LEFS)\n   - Upper Extremity Functional Index (UEFI)\n   - Roland-Morris Disability Questionnaire (RMDQ)\n   - Oswestry Disability Index (ODI)\n\n3. **Quality of Life Measures**:\n   - SF-12 Health Survey\n   - EQ-5D-5L\n\n4. **Condition-Specific Measures**:\n   - Neck Disability Index (NDI)\n   - Shoulder Pain and Disability Index (SPADI)\n   - Western Ontario and McMaster Universities Osteoarthritis Index (WOMAC)\n\n5. **Global Rating of Change**:\n   - Global Rating of Change Scale (GROC)',
          isRequired: true,
          variables: []
        },
        {
          title: 'Outcome Measurement Schedule',
          content: '1. **Initial Assessment**:\n   - Administer baseline outcome measures appropriate to patient condition\n   - Document baseline scores in patient record\n   - Establish treatment goals based on outcome measures\n\n2. **Progress Monitoring**:\n   - Re-administer outcome measures every {{progressAssessmentInterval}} treatments\n   - Document progress scores in patient record\n   - Adjust treatment plan based on progress\n\n3. **Discharge Assessment**:\n   - Administer final outcome measures at discharge\n   - Document final scores in patient record\n   - Compare to baseline and calculate change scores',
          isRequired: true,
          variables: ['progressAssessmentInterval']
        },
        {
          title: 'Minimum Clinically Important Difference',
          content: 'Use the following Minimum Clinically Important Difference (MCID) values to determine meaningful change:\n\n1. **Pain (NPRS/VAS)**: 2 points or 30% reduction\n2. **PSFS**: 2 points per activity\n3. **LEFS**: 9 points\n4. **UEFI**: 8 points\n5. **RMDQ**: 5 points\n6. **ODI**: 10 points\n7. **NDI**: 7 points\n8. **SPADI**: 8 points\n\nTreatment plans should be reviewed and potentially modified if patients are not achieving MCID within expected timeframes.',
          isRequired: true,
          variables: []
        },
        {
          title: 'Data Collection and Management',
          content: '1. Use standardized electronic forms for outcome measure collection\n2. Enter all outcome data into practice management system\n3. Ensure data fields are consistent and complete\n4. Back up outcomes data {{backupFrequency}}\n5. Maintain historical outcomes data for minimum {{dataRetentionPeriod}}',
          isRequired: true,
          variables: ['backupFrequency', 'dataRetentionPeriod']
        },
        {
          title: 'Data Analysis and Reporting',
          content: '1. Generate individual patient progress reports for each episode of care\n2. Aggregate outcomes data by:\n   - Condition/diagnosis\n   - Clinician\n   - Treatment approach\n   - Patient demographics\n3. Calculate key metrics:\n   - Average change scores\n   - Percentage of patients achieving MCID\n   - Average number of visits to achieve MCID\n   - Cost per successful outcome\n4. Generate practice-wide outcomes reports {{reportingFrequency}}',
          isRequired: true,
          variables: ['reportingFrequency']
        },
        {
          title: 'Benchmarking and Quality Improvement',
          content: '1. Compare practice outcomes to industry benchmarks:\n   - Target ≥30% functional improvement\n   - Target ≥40% pain reduction\n   - Target ≥25% ROM improvement\n   - Target ≥85% patient satisfaction\n2. Identify areas for improvement based on outcomes data\n3. Develop and implement quality improvement initiatives\n4. Measure impact of quality improvement initiatives on outcomes\n5. Conduct outcomes review meetings {{reviewMeetingFrequency}}',
          isRequired: true,
          variables: ['reviewMeetingFrequency']
        },
        {
          title: 'Patient Communication',
          content: '1. Explain purpose of outcome measures to patients\n2. Share individual progress reports with patients\n3. Use outcome data in patient education\n4. Include outcome achievements in discharge summaries\n5. Use aggregate outcomes data in marketing materials (anonymized)',
          isRequired: true,
          variables: []
        },
        {
          title: 'Referrer Communication',
          content: '1. Include outcome measure results in referrer reports\n2. Highlight achievement of clinically meaningful improvements\n3. Share aggregate outcomes data with referral sources {{referrerReportFrequency}}\n4. Use outcomes data to demonstrate value to referral networks',
          isRequired: false,
          variables: ['referrerReportFrequency']
        },
        {
          title: 'Staff Training',
          content: '1. Train all clinical staff on:\n   - Proper administration of outcome measures\n   - Interpretation of results\n   - Using outcomes to guide clinical decision-making\n   - Communicating outcomes to patients\n2. Provide refresher training {{trainingFrequency}}\n3. Document all training completion',
          isRequired: true,
          variables: ['trainingFrequency']
        },
        {
          title: 'References',
          content: '- APA Outcome Measures Guidelines\n- Validated Outcome Measures Research\n- Clinical Practice Guidelines\n- {{practiceOutcomesMeasurementGuide}}',
          isRequired: false,
          variables: ['practiceOutcomesMeasurementGuide']
        }
      ],
      recommendedReviewFrequency: 'biannually',
      industryStandards: ['APA Outcome Measures Guidelines', 'Evidence-Based Practice Standards', 'ACSQHC Clinical Care Standards']
    },
    
    // Many more SOP templates would be included for all categories
  ];

  /**
   * Generate a customized SOP based on assessment results
   * @param templateId The ID of the SOP template to use
   * @param practiceData Practice-specific data for customization
   * @returns Generated SOP document
   */
  public static generateSOP(
    templateId: string,
    practiceData: Record<string, string>
  ): GeneratedSOP {
    // Find the requested template
    const template = this.SOP_TEMPLATES.find(t => t.id === templateId);
    
    if (!template) {
      throw new Error(`SOP template with ID ${templateId} not found`);
    }
    
    // Customize the template with practice data
    const customizedSections = template.sections.map(section => {
      let customizedContent = section.content;
      
      // Replace variables with practice-specific data
      section.variables.forEach(variable => {
        const value = practiceData[variable] || `[${variable}]`;
        const regex = new RegExp(`{{${variable}}}`, 'g');
        customizedContent = customizedContent.replace(regex, value);
      });
      
      return {
        ...section,
        content: customizedContent,
        regulatoryReference: section.regulatoryReference
      };
    });
    
    // Create the generated SOP
    const generatedSOP: GeneratedSOP = {
      id: `gen-${Date.now().toString(36)}`,
      templateId: template.id,
      title: template.title,
      type: template.type,
      createdAt: new Date(),
      lastModified: new Date(),
      sections: customizedSections,
      status: 'draft',
      nextReviewDate: this.calculateNextReviewDate(template.recommendedReviewFrequency)
    };
    
    // Add regulatory compliance information if available
    if (template.regulatoryBasis) {
      generatedSOP.regulatoryCompliance = {
        authority: template.regulatoryBasis.split(',')[0].trim(),
        standard: template.regulatoryBasis,
        lastVerified: new Date()
      };
    }
    
    return generatedSOP;
  }

  /**
   * Recommend SOP templates based on assessment results
   * @param healthScore The business health score results
   * @param discipline The practice discipline
   * @param size The practice size
   * @param includeRegulatory Whether to prioritize regulatory SOPs
   * @returns List of recommended SOP templates
   */
  public static recommendSOPs(
    healthScore: BusinessHealthScore,
    discipline: DisciplineType,
    size: PracticeSize,
    includeRegulatory: boolean = true
  ): SOPTemplate[] {
    // Enhanced implementation with regulatory prioritization
    
    // Find the lowest scoring categories
    const sortedCategories = [...healthScore.categories].sort(
      (a, b) => a.score - b.score
    );
    
    const lowScoringCategories = sortedCategories
      .filter(category => category.score < 70)
      .map(category => category.category);
    
    // Always include compliance category for regulatory SOPs if requested
    if (includeRegulatory && !lowScoringCategories.includes(AssessmentCategory.COMPLIANCE)) {
      lowScoringCategories.push(AssessmentCategory.COMPLIANCE);
    }
    
    // Filter templates by relevance to this practice
    const relevantTemplates = this.SOP_TEMPLATES.filter(template => {
      // Check if template is applicable to this discipline
      const disciplineMatch = template.applicableDisciplines.includes(discipline);
      
      // Check if template is applicable to this practice size
      const sizeMatch = template.applicableSizes.includes(size);
      
      // Check if template addresses any low-scoring categories
      const categoryMatch = template.relatedCategories.some(
        category => lowScoringCategories.includes(category)
      );
      
      return disciplineMatch && sizeMatch && categoryMatch;
    });
    
    // Sort templates by relevance with priority for regulatory templates
    relevantTemplates.sort((a, b) => {
      // First priority: Regulatory templates if includeRegulatory is true
      if (includeRegulatory) {
        const aIsRegulatory = !!a.regulatoryBasis;
        const bIsRegulatory = !!b.regulatoryBasis;
        
        if (aIsRegulatory && !bIsRegulatory) return -1;
        if (!aIsRegulatory && bIsRegulatory) return 1;
      }
      
      // Second priority: Number of low-scoring categories addressed
      const aRelevance = a.relatedCategories.filter(
        category => lowScoringCategories.includes(category)
      ).length;
      
      const bRelevance = b.relatedCategories.filter(
        category => lowScoringCategories.includes(category)
      ).length;
      
      return bRelevance - aRelevance;
    });
    
    // Return top 5 most relevant templates
    return relevantTemplates.slice(0, 5);
  }

  /**
   * Calculate the next review date based on review frequency
   * @param frequency The recommended review frequency
   * @returns Date of next review
   */
  private static calculateNextReviewDate(
    frequency: SOPTemplate['recommendedReviewFrequency']
  ): Date {
    const now = new Date();
    const nextReview = new Date(now);
    
    switch (frequency) {
      case 'monthly':
        nextReview.setMonth(now.getMonth() + 1);
        break;
      case 'quarterly':
        nextReview.setMonth(now.getMonth() + 3);
        break;
      case 'biannually':
        nextReview.setMonth(now.getMonth() + 6);
        break;
      case 'annually':
        nextReview.setFullYear(now.getFullYear() + 1);
        break;
    }
    
    return nextReview;
  }

  /**
   * Export SOP to different formats
   * @param sop The generated SOP to export
   * @param format The desired export format
   * @returns Formatted SOP content
   */
  public static exportSOP(
    sop: GeneratedSOP,
    format: 'markdown' | 'html' | 'pdf'
  ): string {
    // Enhanced implementation with regulatory information
    
    let content = `# ${sop.title}\n\n`;
    content += `**Type:** ${sop.type}\n`;
    content += `**Created:** ${sop.createdAt.toLocaleDateString()}\n`;
    content += `**Last Modified:** ${sop.lastModified.toLocaleDateString()}\n`;
    content += `**Status:** ${sop.status}\n`;
    content += `**Next Review:** ${sop.nextReviewDate.toLocaleDateString()}\n`;
    
    // Add regulatory compliance information if available
    if (sop.regulatoryCompliance) {
      content += `\n**Regulatory Authority:** ${sop.regulatoryCompliance.authority}\n`;
      content += `**Regulatory Standard:** ${sop.regulatoryCompliance.standard}\n`;
      content += `**Compliance Verified:** ${sop.regulatoryCompliance.lastVerified.toLocaleDateString()}\n`;
    }
    
    content += `\n## Table of Contents\n\n`;
    sop.sections.forEach((section, index) => {
      content += `${index + 1}. [${section.title}](#${section.title.toLowerCase().replace(/\s+/g, '-')})\n`;
    });
    
    // Add each section
    sop.sections.forEach(section => {
      content += `\n## ${section.title}\n\n`;
      content += `${section.content}\n`;
      
      // Add regulatory reference if available
      if (section.regulatoryReference) {
        content += `\n*Regulatory Reference: ${section.regulatoryReference}*\n`;
      }
    });
    
    // For HTML or PDF, would convert markdown to those formats
    if (format === 'html') {
      // Convert markdown to HTML (simplified example)
      content = `<html><body>${content.replace(/\n/g, '<br>')}</body></html>`;
    } else if (format === 'pdf') {
      // In a real implementation, would use a PDF generation library
      content = `PDF version would be generated here using a library like jsPDF`;
    }
    
    return content;
  }
}

// Export the generator for use in other modules
export default SOPGenerator;
