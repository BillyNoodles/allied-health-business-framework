import { AssessmentCategory } from '@/lib/models/AssessmentCategory';
import { BusinessHealthScore, CategoryScore } from './BusinessHealthScoreCalculator';
import { DisciplineType } from '@/lib/models/DisciplineType';
import { PracticeSize } from '@/lib/models/PracticeSize';

// Define types for recommendations
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: AssessmentCategory;
  priority: 'high' | 'medium' | 'low';
  effort: 'minimal' | 'moderate' | 'significant';
  timeframe: 'immediate' | 'short-term' | 'long-term';
  estimatedRoi: {
    min: number;
    max: number;
    timeframeMonths: number;
  };
  implementationSteps: string[];
  resources: {
    title: string;
    url?: string;
    description: string;
    type: 'article' | 'tool' | 'template' | 'service' | 'other';
  }[];
  regulatoryRelevance?: {  // Added for regulatory compliance
    authority?: string;    // Regulatory authority (e.g., AHPRA, APA)
    standard?: string;     // Specific standard or requirement
    riskLevel?: 'low' | 'medium' | 'high'; // Risk level of non-compliance
  };
  geographicRelevance?: string[]; // Added for region-specific recommendations
  practiceTypeRelevance?: DisciplineType[]; // Added for discipline-specific recommendations
  practiceSizeRelevance?: PracticeSize[]; // Added for size-specific recommendations
  researchBasis?: string; // Added to reference research basis
}

export interface RecommendationSet {
  topRecommendations: Recommendation[];
  categoryRecommendations: Record<AssessmentCategory, Recommendation[]>;
  quickWins: Recommendation[];
  strategicInitiatives: Recommendation[];
  compliancePriorities?: Recommendation[]; // Added for regulatory compliance
  regionSpecific?: Recommendation[]; // Added for geographic considerations
}

// Recommendation Engine
export class RecommendationEngine {
  // Database of potential recommendations - Enhanced with domain-specific knowledge
  private static readonly RECOMMENDATION_DATABASE: Recommendation[] = [
    // Financial recommendations - Updated with fee schedule data
    {
      id: 'fin-001',
      title: 'Implement value-based pricing strategy',
      description: 'Transition from hourly or session-based pricing to value-based pricing that reflects the outcomes and benefits patients receive. Based on physiotherapy benchmarks, practices with value-based pricing achieve 15-30% higher margins.',
      category: AssessmentCategory.FINANCIAL,
      priority: 'high',
      effort: 'moderate',
      timeframe: 'short-term',
      estimatedRoi: {
        min: 15,
        max: 30,
        timeframeMonths: 6
      },
      implementationSteps: [
        'Analyze current pricing structure and profit margins',
        'Research competitor pricing and market rates using the fee schedule benchmarks',
        'Identify high-value services that can command premium pricing',
        'Develop packages that combine services for better value perception',
        'Create marketing materials explaining the value proposition',
        'Train staff on communicating the value to patients',
        'Implement new pricing structure with existing patients gradually'
      ],
      resources: [
        {
          title: 'Value-Based Pricing Guide for Healthcare Providers',
          url: 'https://example.com/value-pricing-guide',
          description: 'Comprehensive guide on implementing value-based pricing in healthcare practices',
          type: 'article'
        },
        {
          title: 'Pricing Strategy Template',
          description: 'Excel template for analyzing and setting optimal service prices',
          type: 'template'
        },
        {
          title: 'Physiotherapy Fee Schedule Benchmarks',
          description: 'Current market rates for physiotherapy services by region and practice size',
          type: 'article'
        }
      ],
      researchBasis: 'Healthcare Financial Analytics, 2023; Practice Growth, 2023',
      practiceTypeRelevance: [DisciplineType.PHYSIOTHERAPY, DisciplineType.OCCUPATIONAL_THERAPY, DisciplineType.SPEECH_THERAPY],
      practiceSizeRelevance: [PracticeSize.SOLO, PracticeSize.SMALL, PracticeSize.MEDIUM, PracticeSize.LARGE, PracticeSize.ENTERPRISE]
    },
    {
      id: 'fin-002',
      title: 'Optimize accounts receivable process',
      description: 'Reduce outstanding payments and improve cash flow by implementing a more efficient accounts receivable process. Physiotherapy benchmarks indicate optimal Days in AR should be ≤30 days with a collection rate of ≥95%.',
      category: AssessmentCategory.FINANCIAL,
      priority: 'high',
      effort: 'moderate',
      timeframe: 'immediate',
      estimatedRoi: {
        min: 5,
        max: 15,
        timeframeMonths: 3
      },
      implementationSteps: [
        'Audit current accounts receivable and identify patterns in late payments',
        'Implement automated payment reminders at 30, 60, and 90 days',
        'Offer multiple payment options including online and automatic payments',
        'Consider early payment discounts for prompt payment',
        'Train front desk staff on collecting payments at time of service',
        'Develop a clear policy for handling delinquent accounts',
        'Implement regular AR aging reports review'
      ],
      resources: [
        {
          title: 'Healthcare Accounts Receivable Best Practices',
          url: 'https://example.com/ar-best-practices',
          description: 'Guide to optimizing accounts receivable specifically for healthcare practices',
          type: 'article'
        },
        {
          title: 'Payment Reminder Templates',
          description: 'Email and letter templates for payment reminders at different stages',
          type: 'template'
        },
        {
          title: 'AR Management Dashboard Template',
          description: 'Excel template for tracking and managing accounts receivable metrics',
          type: 'template'
        }
      ],
      researchBasis: 'AR management benchmarks [Healthcare Financial Analytics, 2023]; Cash flow patterns in PT practices [J Healthcare Finance, 2023]',
      practiceTypeRelevance: [DisciplineType.PHYSIOTHERAPY, DisciplineType.OCCUPATIONAL_THERAPY, DisciplineType.SPEECH_THERAPY, DisciplineType.CHIROPRACTIC, DisciplineType.PODIATRY]
    },
    
    // New financial recommendation based on fee schedule
    {
      id: 'fin-003',
      title: 'Implement program-specific fee optimization',
      description: 'Optimize billing rates for different funding programs (WorkCover, DVA, NDIS) based on current fee schedules and service delivery costs to maximize profitability while maintaining compliance.',
      category: AssessmentCategory.FINANCIAL,
      priority: 'high',
      effort: 'moderate',
      timeframe: 'short-term',
      estimatedRoi: {
        min: 10,
        max: 20,
        timeframeMonths: 3
      },
      implementationSteps: [
        'Analyze current fee structure against program-specific fee schedules',
        'Calculate service delivery costs for each program type',
        'Identify services with highest and lowest profit margins',
        'Optimize appointment scheduling to prioritize higher-margin services',
        'Ensure billing codes and documentation meet program requirements',
        'Train staff on program-specific requirements and documentation',
        'Implement regular fee schedule monitoring for updates'
      ],
      resources: [
        {
          title: 'Program Fee Schedule Comparison Tool',
          description: 'Excel template for comparing fees across different funding programs',
          type: 'template'
        },
        {
          title: 'Service Profitability Calculator',
          description: 'Tool for calculating true profitability of different service types',
          type: 'tool'
        }
      ],
      regulatoryRelevance: {
        authority: 'WorkSafe, SIRA, WorkCover QLD, DVA, NDIS',
        standard: 'Program-specific fee schedules and billing requirements',
        riskLevel: 'high'
      },
      researchBasis: 'Fee Schedule Benchmarks, 2023; Financial Management Review, 2023',
      geographicRelevance: ['Victoria', 'New South Wales', 'Queensland', 'Australia'],
      practiceTypeRelevance: [DisciplineType.PHYSIOTHERAPY]
    },
    
    // Operations recommendations - Updated with practice research
    {
      id: 'ops-001',
      title: 'Streamline patient intake process',
      description: 'Reduce administrative burden and improve patient experience by optimizing the intake process with digital forms and automation. Benchmarks show this can improve schedule utilization by up to 10%.',
      category: AssessmentCategory.OPERATIONS,
      priority: 'high',
      effort: 'moderate',
      timeframe: 'short-term',
      estimatedRoi: {
        min: 10,
        max: 20,
        timeframeMonths: 4
      },
      implementationSteps: [
        'Audit current intake process and identify bottlenecks',
        'Select a digital intake form solution compatible with your practice management system',
        'Create digital versions of all intake forms',
        'Set up automated email/text system to send forms before appointments',
        'Train staff on the new system and troubleshooting',
        'Implement a process for patients who cannot complete digital forms',
        'Monitor completion rates and adjust the process as needed'
      ],
      resources: [
        {
          title: 'Digital Intake Form Solutions Comparison',
          url: 'https://example.com/intake-solutions',
          description: 'Comparison of top digital intake solutions for healthcare practices',
          type: 'article'
        },
        {
          title: 'Patient Communication Templates',
          description: 'Email and text templates for introducing patients to digital intake process',
          type: 'template'
        }
      ],
      researchBasis: 'Workflow optimization in PT [Operations Management Health, 2023]; Scheduling efficiency study [Healthcare Operations Research, 2023]',
      practiceTypeRelevance: [DisciplineType.PHYSIOTHERAPY, DisciplineType.OCCUPATIONAL_THERAPY, DisciplineType.SPEECH_THERAPY]
    },
    
    // New operations recommendation based on practice research
    {
      id: 'ops-002',
      title: 'Implement appointment optimization system',
      description: 'Optimize appointment scheduling to achieve the benchmark of ≥80% schedule utilization and reduce no-show rates to ≤10% through strategic scheduling policies and automated reminders.',
      category: AssessmentCategory.OPERATIONS,
      priority: 'high',
      effort: 'moderate',
      timeframe: 'immediate',
      estimatedRoi: {
        min: 15,
        max: 25,
        timeframeMonths: 3
      },
      implementationSteps: [
        'Analyze current appointment patterns and identify peak/slow periods',
        'Implement strategic scheduling templates based on historical demand',
        'Set up automated appointment reminders via SMS and email',
        'Develop a cancellation policy with appropriate notice requirements',
        'Create a waitlist system for filling cancelled appointments',
        'Train staff on managing the new scheduling system',
        'Monitor and adjust based on utilization metrics'
      ],
      resources: [
        {
          title: 'Scheduling Template Generator',
          description: 'Tool for creating optimized scheduling templates based on practice patterns',
          type: 'tool'
        },
        {
          title: 'No-show Reduction Strategies',
          description: 'Evidence-based approaches to reducing appointment no-shows',
          type: 'article'
        }
      ],
      researchBasis: 'Scheduling efficiency study [Healthcare Operations Research, 2023]; Resource utilization in PT [J Healthcare Management, 2023]',
      practiceTypeRelevance: [DisciplineType.PHYSIOTHERAPY]
    },
    
    // Patient Care recommendations - Updated with benchmarks
    {
      id: 'pat-001',
      title: 'Implement outcomes tracking system',
      description: 'Systematically track and analyze patient outcomes to demonstrate value, improve care protocols, and support value-based care initiatives. Benchmarks target ≥30% functional improvement, ≥40% pain reduction, and ≥25% ROM improvement.',
      category: AssessmentCategory.PATIENT_CARE,
      priority: 'high',
      effort: 'significant',
      timeframe: 'short-term',
      estimatedRoi: {
        min: 20,
        max: 40,
        timeframeMonths: 12
      },
      implementationSteps: [
        'Select appropriate outcome measures for each condition/treatment',
        'Implement a system for collecting outcome data at defined intervals',
        'Train clinicians on consistent administration of outcome measures',
        'Develop protocols for analyzing and acting on outcomes data',
        'Create reporting templates for sharing outcomes with patients and referrers',
        'Use aggregate data to identify opportunities for protocol improvements'
      ],
      resources: [
        {
          title: 'Physiotherapy Outcome Measures Guide',
          url: 'https://example.com/physio-outcomes',
          description: 'Comprehensive guide to validated outcome measures for physiotherapy',
          type: 'article'
        },
        {
          title: 'Outcomes Tracking Software Options',
          description: 'Comparison of software solutions for tracking patient outcomes',
          type: 'article'
        }
      ],
      researchBasis: 'Functional outcome measures [Physical Therapy Research, 2023]; Pain management efficacy [J Pain Research, 2023]; ROM improvement standards [Clinical Biomechanics, 2023]',
      practiceTypeRelevance: [DisciplineType.PHYSIOTHERAPY]
    },
    
    // Technology recommendations - Updated with cybersecurity framework
    {
      id: 'tech-001',
      title: 'Implement telehealth services',
      description: 'Expand practice reach and improve accessibility by offering secure telehealth services for appropriate patients and conditions. Ensure compliance with privacy and security requirements.',
      category: AssessmentCategory.TECHNOLOGY,
      priority: 'high',
      effort: 'moderate',
      timeframe: 'short-term',
      estimatedRoi: {
        min: 15,
        max: 25,
        timeframeMonths: 6
      },
      implementationSteps: [
        'Research telehealth platforms that meet security and compliance requirements',
        'Develop protocols for determining telehealth-appropriate patients and conditions',
        'Create documentation templates specific to telehealth encounters',
        'Train clinicians on effective telehealth delivery and troubleshooting',
        'Develop patient education materials about telehealth services',
        'Implement billing processes for telehealth services',
        'Create a feedback system to continuously improve telehealth delivery'
      ],
      resources: [
        {
          title: 'Telehealth Implementation Guide for Physical Therapy',
          url: 'https://example.com/telehealth-pt',
          description: 'Step-by-step guide to implementing telehealth in a physical therapy practice',
          type: 'article'
        },
        {
          title: 'Telehealth Platform Comparison',
          description: 'Detailed comparison of HIPAA-compliant telehealth platforms',
          type: 'article'
        }
      ],
      regulatoryRelevance: {
        authority: 'AHPRA, Privacy Act 1988',
        standard: 'Telehealth Practice Standards, Australian Privacy Principles',
        riskLevel: 'medium'
      },
      researchBasis: 'Telehealth effectiveness [Telemedicine J, 2023]; Digital transformation in PT [J Healthcare Tech, 2023]',
      practiceTypeRelevance: [DisciplineType.PHYSIOTHERAPY, DisciplineType.OCCUPATIONAL_THERAPY, DisciplineType.SPEECH_THERAPY]
    },
    
    // New technology recommendation based on cybersecurity framework
    {
      id: 'tech-002',
      title: 'Implement comprehensive cybersecurity framework',
      description: 'Protect patient data and practice operations by implementing the Essential Eight cybersecurity controls and ensuring compliance with Privacy Act requirements and the Notifiable Data Breaches scheme.',
      category: AssessmentCategory.TECHNOLOGY,
      priority: 'high',
      effort: 'significant',
      timeframe: 'immediate',
      estimatedRoi: {
        min: 0, // ROI measured in risk reduction rather than direct revenue
        max: 0,
        timeframeMonths: 3
      },
      implementationSteps: [
        'Conduct security risk assessment of current systems',
        'Implement application control (whitelist approved applications)',
        'Ensure all applications and operating systems are patched and up-to-date',
        'Configure Microsoft Office macro settings for security',
        'Implement user application hardening (browser security, PDF viewer settings)',
        'Restrict administrative privileges to necessary staff only',
        'Set up multi-factor authentication for all remote access and privileged accounts',
        'Establish regular backup system with offline copies and test restoration',
        'Develop data breach response plan'
      ],
      resources: [
        {
          title: 'Essential Eight Implementation Guide',
          description: 'Step-by-step guide to implementing the Essential Eight security controls',
          type: 'article'
        },
        {
          title: 'Healthcare Data Breach Response Plan Template',
          description: 'Template for creating a comprehensive data breach response plan',
          type: 'template'
        },
        {
          title: 'Security Training Materials for Healthcare Staff',
          description: 'Training resources for educating staff on cybersecurity best practices',
          type: 'service'
        }
      ],
      regulatoryRelevance: {
        authority: 'OAIC, Privacy Act 1988, Notifiable Data Breaches Scheme',
        standard: 'Australian Privacy Principles, Essential Eight Maturity Model',
        riskLevel: 'high'
      },
      researchBasis: 'Cybersecurity Framework; ADHA security conformance; Essential Eight compliance',
      practiceTypeRelevance: [DisciplineType.PHYSIOTHERAPY, DisciplineType.OCCUPATIONAL_THERAPY, DisciplineType.SPEECH_THERAPY, DisciplineType.CHIROPRACTIC, DisciplineType.PODIATRY]
    },
    
    // Compliance recommendations - Added based on regulatory framework
    {
      id: 'comp-001',
      title: 'Implement comprehensive compliance management system',
      description: 'Develop and implement a structured compliance management system covering AHPRA requirements, professional standards, and program-specific obligations to minimize regulatory risk.',
      category: AssessmentCategory.COMPLIANCE,
      priority: 'high',
      effort: 'significant',
      timeframe: 'immediate',
      estimatedRoi: {
        min: 0, // ROI measured in risk reduction rather than direct revenue
        max: 0,
        timeframeMonths: 3
      },
      implementationSteps: [
        'Create a compliance register documenting all regulatory obligations',
        'Develop a compliance calendar with key dates and renewal requirements',
        'Implement regular clinical documentation audits',
        'Establish a system for tracking CPD points for all practitioners',
        'Create a process for regular review of insurance coverage adequacy',
        'Develop standardized templates for program-specific documentation',
        'Implement quarterly compliance self-assessments',
        'Create a system for monitoring regulatory changes'
      ],
      resources: [
        {
          title: 'Physiotherapy Compliance Checklist',
          description: 'Comprehensive checklist of compliance requirements for physiotherapy practices',
          type: 'template'
        },
        {
          title: 'Clinical Documentation Audit Tool',
          description: 'Tool for conducting regular audits of clinical documentation',
          type: 'template'
        },
        {
          title: 'CPD Tracking System',
          description: 'System for tracking continuing professional development activities',
          type: 'tool'
        }
      ],
      regulatoryRelevance: {
        authority: 'AHPRA, APA, WorkCover, DVA, NDIS',
        standard: 'AHPRA Registration Standards, APA Practice Standards, Program-specific requirements',
        riskLevel: 'high'
      },
      researchBasis: 'Regulatory Framework; AHPRA Registration Standards [AHPRA, 2023]; APA Practice Standards [APA, 2023]',
      practiceTypeRelevance: [DisciplineType.PHYSIOTHERAPY]
    },
    
    // New compliance recommendation based on insurance compliance guide
    {
      id: 'comp-002',
      title: 'Optimize professional indemnity and business insurance coverage',
      description: 'Review and optimize insurance coverage to ensure compliance with regulatory requirements while maximizing protection against practice-specific risks.',
      category: AssessmentCategory.COMPLIANCE,
      priority: 'high',
      effort: 'moderate',
      timeframe: 'immediate',
      estimatedRoi: {
        min: 0, // ROI measured in risk reduction rather than direct revenue
        max: 0,
        timeframeMonths: 3
      },
      implementationSteps: [
        'Review current professional indemnity insurance for minimum $20M coverage',
        'Assess need for additional coverage types (cyber, business interruption)',
        'Implement annual insurance review process',
        'Develop risk assessment protocol to identify coverage gaps',
        'Create incident documentation system for potential claims',
        'Train staff on incident reporting procedures',
        'Establish relationship with insurance broker specializing in healthcare'
      ],
      resources: [
        {
          title: 'Physiotherapy Insurance Requirements Guide',
          description: 'Comprehensive guide to insurance requirements for physiotherapy practices',
          type: 'article'
        },
        {
          title: 'Risk Assessment Template',
          description: 'Template for conducting practice risk assessments',
          type: 'template'
        },
        {
          title: 'Incident Documentation Form',
          description: 'Standardized form for documenting incidents that may lead to claims',
          type: 'template'
        }
      ],
      regulatoryRelevance: {
        authority: 'AHPRA, PBA',
        standard: 'Professional Indemnity Insurance Requirements',
        riskLevel: 'high'
      },
      researchBasis: 'Insurance Compliance Guide; Professional Indemnity Requirements [PBA, 2023]',
      practiceTypeRelevance: [DisciplineType.PHYSIOTHERAPY, DisciplineType.OCCUPATIONAL_THERAPY, DisciplineType.SPEECH_THERAPY]
    },
    
    // Many more recommendations would be included for all categories
  ];

  /**
   * Generate personalized recommendations based on assessment results
   * @param healthScore The business health score results
   * @param discipline The practice discipline
   * @param size The practice size
   * @param region Optional geographic region for region-specific recommendations
   * @returns Set of prioritized recommendations
   */
  public static generateRecommendations(
    healthScore: BusinessHealthScore,
    discipline: DisciplineType,
    size: PracticeSize,
    region?: string
  ): RecommendationSet {
    // Filter recommendations by relevance to this practice
    const relevantRecommendations = this.filterRelevantRecommendations(
      healthScore,
      discipline,
      size,
      region
    );
    
    // Prioritize recommendations based on scores and impact
    const prioritizedRecommendations = this.prioritizeRecommendations(
      relevantRecommendations,
      healthScore
    );
    
    // Group recommendations by category
    const categoryRecommendations = this.groupRecommendationsByCategory(
      prioritizedRecommendations
    );
    
    // Identify quick wins (high impact, low effort)
    const quickWins = this.identifyQuickWins(prioritizedRecommendations);
    
    // Identify strategic initiatives (high impact, higher effort)
    const strategicInitiatives = this.identifyStrategicInitiatives(
      prioritizedRecommendations
    );
    
    // Select top recommendations across categories
    const topRecommendations = this.selectTopRecommendations(
      prioritizedRecommendations,
      healthScore
    );
    
    // Identify compliance priorities - Added for regulatory compliance
    const compliancePriorities = this.identifyCompliancePriorities(
      prioritizedRecommendations
    );
    
    // Identify region-specific recommendations - Added for geographic considerations
    const regionSpecific = region ? 
      this.identifyRegionSpecificRecommendations(prioritizedRecommendations, region) : 
      undefined;
    
    return {
      topRecommendations,
      categoryRecommendations,
      quickWins,
      strategicInitiatives,
      compliancePriorities,
      regionSpecific
    };
  }

  /**
   * Filter recommendations by relevance to the specific practice
   * @param healthScore The business health score results
   * @param discipline The practice discipline
   * @param size The practice size
   * @param region Optional geographic region
   * @returns Filtered list of relevant recommendations
   */
  private static filterRelevantRecommendations(
    healthScore: BusinessHealthScore,
    discipline: DisciplineType,
    size: PracticeSize,
    region?: string
  ): Recommendation[] {
    // Enhanced implementation with domain-specific filtering
    const relevantRecommendations: Recommendation[] = [];
    
    // Get all recommendations from the database
    const allRecommendations = [...this.RECOMMENDATION_DATABASE];
    
    // For each recommendation, check if it's relevant based on multiple factors
    allRecommendations.forEach(recommendation => {
      // Check discipline relevance
      const isDisciplineRelevant = !recommendation.practiceTypeRelevance || 
                                 recommendation.practiceTypeRelevance.includes(discipline) ||
                                 recommendation.practiceTypeRelevance.includes(DisciplineType.GENERAL);
      
      // Check size relevance
      const isSizeRelevant = !recommendation.practiceSizeRelevance || 
                           recommendation.practiceSizeRelevance.includes(size);
      
      // Check geographic relevance if region is provided
      const isRegionRelevant = !region || 
                             !recommendation.geographicRelevance ||
                             recommendation.geographicRelevance.some(geo => 
                               region.toLowerCase().includes(geo.toLowerCase()));
      
      // Find the score for this recommendation's category
      const categoryScore = healthScore.categories.find(
        cs => cs.category === recommendation.category
      );
      
      // Determine score-based relevance (more sophisticated approach)
      let isScoreRelevant = true;
      
      if (categoryScore) {
        // High priority recommendations relevant for low and medium scores
        if (recommendation.priority === 'high' && categoryScore.score >= 85) {
          isScoreRelevant = false;
        }
        
        // Medium priority recommendations relevant for low scores
        if (recommendation.priority === 'medium' && categoryScore.score >= 75) {
          isScoreRelevant = false;
        }
        
        // Low priority recommendations only relevant for very low scores
        if (recommendation.priority === 'low' && categoryScore.score >= 65) {
          isScoreRelevant = false;
        }
      }
      
      // Add recommendation if it passes all relevance checks
      if (isDisciplineRelevant && isSizeRelevant && isRegionRelevant && isScoreRelevant) {
        relevantRecommendations.push(recommendation);
      }
    });
    
    return relevantRecommendations;
  }

  /**
   * Prioritize recommendations based on scores and potential impact
   * @param recommendations List of relevant recommendations
   * @param healthScore The business health score results
   * @returns Prioritized list of recommendations
   */
  private static prioritizeRecommendations(
    recommendations: Recommendation[],
    healthScore: BusinessHealthScore
  ): Recommendation[] {
    // Enhanced implementation with domain-specific prioritization
    const scoredRecommendations = recommendations.map(recommendation => {
      // Find the score for this recommendation's category
      const categoryScore = healthScore.categories.find(
        cs => cs.category === recommendation.category
      );
      
      // Calculate priority score based on multiple factors
      let priorityScore = 0;
      
      // Factor 1: Category score (0-100, lower score = higher priority)
      if (categoryScore) {
        priorityScore += (100 - categoryScore.score) * 0.5;
      } else {
        priorityScore += 50; // Default if category not scored
      }
      
      // Factor 2: Recommendation priority level
      switch (recommendation.priority) {
        case 'high':
          priorityScore += 30;
          break;
        case 'medium':
          priorityScore += 20;
          break;
        case 'low':
          priorityScore += 10;
          break;
      }
      
      // Factor 3: Potential ROI (average of min and max)
      const avgRoi = (recommendation.estimatedRoi.min + recommendation.estimatedRoi.max) / 2;
      priorityScore += avgRoi * 0.5;
      
      // Factor 4: Regulatory relevance (added for compliance)
      if (recommendation.regulatoryRelevance) {
        switch (recommendation.regulatoryRelevance.riskLevel) {
          case 'high':
            priorityScore += 25;
            break;
          case 'medium':
            priorityScore += 15;
            break;
          case 'low':
            priorityScore += 5;
            break;
        }
      }
      
      // Factor 5: Implementation timeframe (quicker = higher priority)
      switch (recommendation.timeframe) {
        case 'immediate':
          priorityScore += 15;
          break;
        case 'short-term':
          priorityScore += 10;
          break;
        case 'long-term':
          priorityScore += 5;
          break;
      }
      
      return {
        recommendation,
        priorityScore
      };
    });
    
    // Sort by priority score (highest first)
    scoredRecommendations.sort((a, b) => b.priorityScore - a.priorityScore);
    
    // Return sorted recommendations
    return scoredRecommendations.map(sr => sr.recommendation);
  }

  /**
   * Group recommendations by category
   * @param recommendations List of recommendations
   * @returns Record of recommendations grouped by category
   */
  private static groupRecommendationsByCategory(
    recommendations: Recommendation[]
  ): Record<AssessmentCategory, Recommendation[]> {
    const grouped: Record<AssessmentCategory, Recommendation[]> = {} as Record<AssessmentCategory, Recommendation[]>;
    
    // Initialize empty arrays for each category
    Object.values(AssessmentCategory).forEach(category => {
      grouped[category] = [];
    });
    
    // Group recommendations by category
    recommendations.forEach(recommendation => {
      grouped[recommendation.category].push(recommendation);
    });
    
    return grouped;
  }

  /**
   * Identify quick wins (high impact, low effort recommendations)
   * @param recommendations List of recommendations
   * @returns List of quick win recommendations
   */
  private static identifyQuickWins(
    recommendations: Recommendation[]
  ): Recommendation[] {
    // Enhanced implementation with more nuanced criteria
    return recommendations.filter(recommendation => 
      (recommendation.priority === 'high' || recommendation.priority === 'medium') && 
      recommendation.effort === 'minimal' &&
      (recommendation.timeframe === 'immediate' || recommendation.timeframe === 'short-term')
    );
  }

  /**
   * Identify strategic initiatives (high impact, higher effort recommendations)
   * @param recommendations List of recommendations
   * @returns List of strategic initiative recommendations
   */
  private static identifyStrategicInitiatives(
    recommendations: Recommendation[]
  ): Recommendation[] {
    // Enhanced implementation with more nuanced criteria
    return recommendations.filter(recommendation => 
      recommendation.priority === 'high' && 
      (recommendation.effort === 'moderate' || recommendation.effort === 'significant') &&
      (recommendation.timeframe === 'short-term' || recommendation.timeframe === 'long-term') &&
      recommendation.estimatedRoi.min >= 15 // Higher ROI threshold for strategic initiatives
    );
  }

  /**
   * Identify compliance priorities (regulatory compliance recommendations)
   * @param recommendations List of recommendations
   * @returns List of compliance priority recommendations
   */
  private static identifyCompliancePriorities(
    recommendations: Recommendation[]
  ): Recommendation[] {
    // New method for identifying compliance priorities
    return recommendations.filter(recommendation => 
      recommendation.regulatoryRelevance && 
      (recommendation.regulatoryRelevance.riskLevel === 'high' || 
       recommendation.regulatoryRelevance.riskLevel === 'medium')
    );
  }

  /**
   * Identify region-specific recommendations
   * @param recommendations List of recommendations
   * @param region Geographic region
   * @returns List of region-specific recommendations
   */
  private static identifyRegionSpecificRecommendations(
    recommendations: Recommendation[],
    region: string
  ): Recommendation[] {
    // New method for identifying region-specific recommendations
    return recommendations.filter(recommendation => 
      recommendation.geographicRelevance && 
      recommendation.geographicRelevance.some(geo => 
        region.toLowerCase().includes(geo.toLowerCase())
      )
    );
  }

  /**
   * Select top recommendations across categories
   * @param recommendations List of prioritized recommendations
   * @param healthScore The business health score results
   * @returns List of top recommendations
   */
  private static selectTopRecommendations(
    recommendations: Recommendation[],
    healthScore: BusinessHealthScore
  ): Recommendation[] {
    // Enhanced implementation with more sophisticated selection
    
    // Get the lowest scoring categories
    const sortedCategories = [...healthScore.categories].sort(
      (a, b) => a.score - b.score
    );
    
    const topRecommendations: Recommendation[] = [];
    const includedCategories = new Set<AssessmentCategory>();
    
    // First, include one recommendation from each of the 3 lowest scoring categories
    for (let i = 0; i < Math.min(3, sortedCategories.length); i++) {
      const category = sortedCategories[i].category;
      const categoryRecs = recommendations.filter(rec => rec.category === category);
      
      if (categoryRecs.length > 0) {
        topRecommendations.push(categoryRecs[0]);
        includedCategories.add(category);
      }
    }
    
    // Always include at least one compliance recommendation if available
    const complianceRecs = recommendations.filter(
      rec => rec.category === AssessmentCategory.COMPLIANCE && 
             rec.regulatoryRelevance?.riskLevel === 'high'
    );
    
    if (complianceRecs.length > 0 && !includedCategories.has(AssessmentCategory.COMPLIANCE)) {
      topRecommendations.push(complianceRecs[0]);
      includedCategories.add(AssessmentCategory.COMPLIANCE);
    }
    
    // Then, add more high-priority recommendations until we have 5 total
    let index = 0;
    while (topRecommendations.length < 5 && index < recommendations.length) {
      const recommendation = recommendations[index];
      
      // Only add if we don't already have 2 from this category
      const categoryCount = topRecommendations.filter(
        rec => rec.category === recommendation.category
      ).length;
      
      if (categoryCount < 2 && !topRecommendations.includes(recommendation)) {
        topRecommendations.push(recommendation);
      }
      
      index++;
    }
    
    return topRecommendations;
  }
}

// Export the engine for use in other modules
export default RecommendationEngine;
