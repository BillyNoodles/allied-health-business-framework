import { ComplianceFramework, ComplianceFrameworkType, ComplianceRequirement, ComplianceStatus } from '@/lib/models/ComplianceFramework';
import { WORKCOVER_REQUIREMENTS, NDIS_REQUIREMENTS, DVA_REQUIREMENTS, INSURANCE_REQUIREMENTS, CYBERSECURITY_REQUIREMENTS, PRIVACY_REQUIREMENTS } from '@/data/compliance-requirements';
import { DisciplineType } from '@/lib/models/DisciplineType';
import { PracticeSize } from '@/lib/models/PracticeSize';
import { Country } from '@/lib/models/Country';

export class ComplianceVerificationSystem {
  /**
   * Get all compliance frameworks applicable to a practice
   * @param discipline The practice discipline
   * @param size The practice size
   * @param country The practice country
   * @returns List of applicable compliance frameworks
   */
  public static getApplicableFrameworks(
    discipline: DisciplineType,
    size: PracticeSize,
    country: Country
  ): ComplianceFramework[] {
    // Only Australian frameworks are currently implemented
    if (country !== Country.AUSTRALIA) {
      return [];
    }

    // Create frameworks based on discipline and size
    const frameworks: ComplianceFramework[] = [];

    // WorkCover framework is applicable to all allied health disciplines
    frameworks.push({
      id: 'framework-workcover',
      name: 'WorkCover Compliance Framework',
      description: 'Compliance requirements for providing services to WorkCover patients',
      type: ComplianceFrameworkType.WORKCOVER,
      requirements: WORKCOVER_REQUIREMENTS,
      applicableJurisdictions: ['VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'],
      version: '1.0',
      lastUpdated: new Date('2025-04-01')
    });

    // NDIS framework is applicable to all allied health disciplines
    frameworks.push({
      id: 'framework-ndis',
      name: 'NDIS Compliance Framework',
      description: 'Compliance requirements for NDIS providers',
      type: ComplianceFrameworkType.NDIS,
      requirements: NDIS_REQUIREMENTS,
      applicableJurisdictions: ['NATIONAL'],
      version: '1.0',
      lastUpdated: new Date('2025-04-01')
    });

    // DVA framework is applicable to all allied health disciplines
    frameworks.push({
      id: 'framework-dva',
      name: 'DVA Compliance Framework',
      description: 'Compliance requirements for DVA providers',
      type: ComplianceFrameworkType.DVA,
      requirements: DVA_REQUIREMENTS,
      applicableJurisdictions: ['NATIONAL'],
      version: '1.0',
      lastUpdated: new Date('2025-04-01')
    });

    // Insurance framework is applicable to all allied health disciplines
    frameworks.push({
      id: 'framework-insurance',
      name: 'Insurance Compliance Framework',
      description: 'Insurance requirements for allied health practices',
      type: ComplianceFrameworkType.INSURANCE,
      requirements: INSURANCE_REQUIREMENTS,
      applicableJurisdictions: ['NATIONAL'],
      version: '1.0',
      lastUpdated: new Date('2025-04-01')
    });

    // Cybersecurity framework is applicable to all allied health disciplines
    frameworks.push({
      id: 'framework-cybersecurity',
      name: 'Cybersecurity Framework',
      description: 'Cybersecurity requirements for allied health practices',
      type: ComplianceFrameworkType.CYBERSECURITY,
      requirements: CYBERSECURITY_REQUIREMENTS,
      applicableJurisdictions: ['NATIONAL'],
      version: '1.0',
      lastUpdated: new Date('2025-04-01')
    });

    // Privacy framework is applicable to all allied health disciplines
    frameworks.push({
      id: 'framework-privacy',
      name: 'Privacy Compliance Framework',
      description: 'Privacy requirements for allied health practices',
      type: ComplianceFrameworkType.PRIVACY,
      requirements: PRIVACY_REQUIREMENTS,
      applicableJurisdictions: ['NATIONAL'],
      version: '1.0',
      lastUpdated: new Date('2025-04-01')
    });

    return frameworks;
  }

  /**
   * Get high-priority compliance requirements for a practice
   * @param discipline The practice discipline
   * @param size The practice size
   * @param country The practice country
   * @returns List of high-priority compliance requirements
   */
  public static getHighPriorityRequirements(
    discipline: DisciplineType,
    size: PracticeSize,
    country: Country
  ): ComplianceRequirement[] {
    const frameworks = this.getApplicableFrameworks(discipline, size, country);

    // Extract all high-risk requirements
    const highPriorityRequirements = frameworks
      .flatMap(framework => framework.requirements)
      .filter(requirement => requirement.riskLevel === 'high');

    return highPriorityRequirements;
  }

  /**
   * Evaluate compliance status based on practice data
   * @param practiceData Practice-specific data for evaluation
   * @param requirements List of compliance requirements to evaluate
   * @returns Compliance status for each requirement
   */
  public static evaluateCompliance(
    practiceData: Record<string, any>,
    requirements: ComplianceRequirement[]
  ): ComplianceStatus[] {
    // In a real implementation, this would evaluate actual practice data
    // For now, providing a simplified implementation

    return requirements.map(requirement => {
      // Check if practice data contains evidence for this requirement
      const hasEvidence = practiceData[`evidence_${requirement.id}`] !== undefined;

      // Check if practice has implemented this requirement
      const isImplemented = practiceData[`implemented_${requirement.id}`] === true;

      // Determine compliance status
      let status: ComplianceStatus['status'] = 'non-compliant';

      if (isImplemented && hasEvidence) {
        status = 'compliant';
      } else if (isImplemented) {
        status = 'partially-compliant';
      } else if (practiceData[`not_applicable_${requirement.id}`] === true) {
        status = 'not-applicable';
      }

      // Create compliance status
      const complianceStatus: ComplianceStatus = {
        requirementId: requirement.id,
        status,
        lastVerified: new Date(),
        evidence: practiceData[`evidence_${requirement.id}`],
        notes: practiceData[`notes_${requirement.id}`],
        actionItems: practiceData[`action_items_${requirement.id}`],
        nextReviewDate: this.calculateNextReviewDate(requirement.reviewFrequency)
      };

      return complianceStatus;
    });
  }

  /**
   * Generate compliance action plan based on compliance status
   * @param complianceStatus List of compliance statuses
   * @param requirements List of compliance requirements
   * @returns Prioritized action plan for compliance improvement
   */
  public static generateActionPlan(
    complianceStatus: ComplianceStatus[],
    requirements: ComplianceRequirement[]
  ): { requirementId: string; priority: number; actions: string[] }[] {
    // Create a map of requirements by ID for easy lookup
    const requirementsMap = new Map(
      requirements.map(req => [req.id, req])
    );

    // Filter for non-compliant and partially-compliant items
    const actionItems = complianceStatus
      .filter(status =>
        status.status === 'non-compliant' ||
        status.status === 'partially-compliant'
      )
      .map(status => {
        const requirement = requirementsMap.get(status.requirementId);

        if (!requirement) {
          return null;
        }

        // Determine priority based on risk level and compliance status
        let priority = 0;

        if (requirement.riskLevel === 'high') {
          priority = status.status === 'non-compliant' ? 1 : 2;
        } else if (requirement.riskLevel === 'medium') {
          priority = status.status === 'non-compliant' ? 3 : 4;
        } else {
          priority = status.status === 'non-compliant' ? 5 : 6;
        }

        // Use implementation steps as actions
        const actions = requirement.implementationSteps;

        return {
          requirementId: requirement.id,
          priority,
          actions
        };
      })
      .filter(item => item !== null) as { requirementId: string; priority: number; actions: string[] }[];

    // Sort by priority (lower number = higher priority)
    actionItems.sort((a, b) => a.priority - b.priority);

    return actionItems;
  }

  /**
   * Calculate the next review date based on review frequency
   * @param frequency The recommended review frequency
   * @returns Date of next review
   */
  private static calculateNextReviewDate(
    frequency: ComplianceRequirement['reviewFrequency']
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
   * Generate compliance dashboard data
   * @param complianceStatus List of compliance statuses
   * @param requirements List of compliance requirements
   * @returns Dashboard data for compliance visualization
   */
  public static generateDashboardData(
    complianceStatus: ComplianceStatus[],
    requirements: ComplianceRequirement[]
  ): {
    overallCompliance: number;
    byFramework: { framework: ComplianceFrameworkType; compliance: number }[];
    byRiskLevel: { riskLevel: string; compliance: number }[];
    upcomingReviews: { requirementId: string; title: string; dueDate: Date }[];
  } {
    // Create a map of requirements by ID for easy lookup
    const requirementsMap = new Map(
      requirements.map(req => [req.id, req])
    );

    // Calculate overall compliance percentage
    const applicableStatuses = complianceStatus.filter(
      status => status.status !== 'not-applicable'
    );

    const compliantCount = applicableStatuses.filter(
      status => status.status === 'compliant'
    ).length;

    const partiallyCompliantCount = applicableStatuses.filter(
      status => status.status === 'partially-compliant'
    ).length;

    const overallCompliance = applicableStatuses.length > 0
      ? ((compliantCount + (partiallyCompliantCount * 0.5)) / applicableStatuses.length) * 100
      : 0;

    // Calculate compliance by framework
    const frameworkGroups = new Map<ComplianceFrameworkType, ComplianceStatus[]>();

    applicableStatuses.forEach(status => {
      const requirement = requirementsMap.get(status.requirementId);

      if (requirement) {
        const framework = requirement.frameworkType;
        const group = frameworkGroups.get(framework) || [];
        group.push(status);
        frameworkGroups.set(framework, group);
      }
    });

    const byFramework = Array.from(frameworkGroups.entries()).map(([framework, statuses]) => {
      const compliant = statuses.filter(s => s.status === 'compliant').length;
      const partiallyCompliant = statuses.filter(s => s.status === 'partially-compliant').length;
      const compliance = ((compliant + (partiallyCompliant * 0.5)) / statuses.length) * 100;

      return { framework, compliance };
    });

    // Calculate compliance by risk level
    const riskGroups = new Map<string, ComplianceStatus[]>();

    applicableStatuses.forEach(status => {
      const requirement = requirementsMap.get(status.requirementId);

      if (requirement) {
        const riskLevel = requirement.riskLevel;
        const group = riskGroups.get(riskLevel) || [];
        group.push(status);
        riskGroups.set(riskLevel, group);
      }
    });

    const byRiskLevel = Array.from(riskGroups.entries()).map(([riskLevel, statuses]) => {
      const compliant = statuses.filter(s => s.status === 'compliant').length;
      const partiallyCompliant = statuses.filter(s => s.status === 'partially-compliant').length;
      const compliance = ((compliant + (partiallyCompliant * 0.5)) / statuses.length) * 100;

      return { riskLevel, compliance };
    });

    // Get upcoming reviews (next 30 days)
    const now = new Date();
    const thirtyDaysFromNow = new Date(now);
    thirtyDaysFromNow.setDate(now.getDate() + 30);

    const upcomingReviews = complianceStatus
      .filter(status =>
        status.nextReviewDate >= now &&
        status.nextReviewDate <= thirtyDaysFromNow
      )
      .map(status => {
        const requirement = requirementsMap.get(status.requirementId);

        return {
          requirementId: status.requirementId,
          title: requirement ? requirement.title : 'Unknown Requirement',
          dueDate: status.nextReviewDate
        };
      })
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

    return {
      overallCompliance,
      byFramework,
      byRiskLevel,
      upcomingReviews
    };
  }
}

export default ComplianceVerificationSystem;
