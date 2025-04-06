import { AssessmentCategory } from '@/lib/models/AssessmentCategory';
import { QuestionResponse, ModuleProgress } from './BusinessHealthScoreCalculator';
import { DisciplineType } from '@/lib/models/DisciplineType';
import { PracticeSize } from '@/lib/models/PracticeSize';

// Define types for progress tracking
export interface AssessmentModule {
  id: string;
  title: string;
  category: AssessmentCategory;
  description: string;
  estimatedTimeMinutes: number;
  questionCount: number;
  order: number;
  prerequisiteModules?: string[];
  isRequired: boolean;
}

export interface UserAssessmentProgress {
  userId: string;
  practiceId: string;
  startedAt: Date;
  lastUpdatedAt: Date;
  moduleProgress: Record<string, ModuleProgressStatus>;
  completedModules: string[];
  currentModule?: string;
  overallProgress: number; // 0-100 percentage
}

export interface ModuleProgressStatus {
  moduleId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt?: Date;
  completedAt?: Date;
  currentQuestionIndex?: number;
  responses: QuestionResponse[];
  progress: number; // 0-100 percentage
}

export interface AssessmentRecommendation {
  moduleId: string;
  title: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

// Progress Tracking System
export class ProgressTrackingSystem {
  // Database of assessment modules
  private static readonly ASSESSMENT_MODULES: AssessmentModule[] = [
    // Financial modules
    {
      id: 'fin-pricing',
      title: 'Pricing Strategy',
      category: AssessmentCategory.FINANCIAL,
      description: 'Evaluate your pricing model, fee structure, and value-based pricing approach.',
      estimatedTimeMinutes: 15,
      questionCount: 10,
      order: 1,
      isRequired: true
    },
    {
      id: 'fin-cashflow',
      title: 'Cash Flow Management',
      category: AssessmentCategory.FINANCIAL,
      description: 'Assess your cash flow tracking, forecasting, and management practices.',
      estimatedTimeMinutes: 20,
      questionCount: 12,
      order: 2,
      isRequired: true
    },
    {
      id: 'fin-revenue',
      title: 'Revenue Diversification',
      category: AssessmentCategory.FINANCIAL,
      description: 'Evaluate your revenue streams and opportunities for diversification.',
      estimatedTimeMinutes: 15,
      questionCount: 8,
      order: 3,
      isRequired: true
    },
    {
      id: 'fin-billing',
      title: 'Billing and Collections',
      category: AssessmentCategory.FINANCIAL,
      description: 'Assess your billing processes, insurance claims, and collection procedures.',
      estimatedTimeMinutes: 25,
      questionCount: 15,
      order: 4,
      isRequired: true
    },
    {
      id: 'fin-profitability',
      title: 'Profitability Analysis',
      category: AssessmentCategory.FINANCIAL,
      description: 'Evaluate your profit margins, cost structure, and financial performance.',
      estimatedTimeMinutes: 20,
      questionCount: 12,
      order: 5,
      isRequired: true
    },
    
    // Operations modules
    {
      id: 'ops-scheduling',
      title: 'Appointment Scheduling',
      category: AssessmentCategory.OPERATIONS,
      description: 'Assess your scheduling system, policies, and efficiency.',
      estimatedTimeMinutes: 15,
      questionCount: 10,
      order: 1,
      isRequired: true
    },
    {
      id: 'ops-workflow',
      title: 'Clinical Workflow',
      category: AssessmentCategory.OPERATIONS,
      description: 'Evaluate your clinical processes, patient flow, and operational efficiency.',
      estimatedTimeMinutes: 20,
      questionCount: 12,
      order: 2,
      isRequired: true
    },
    {
      id: 'ops-documentation',
      title: 'Documentation Practices',
      category: AssessmentCategory.OPERATIONS,
      description: 'Assess your clinical documentation processes, templates, and efficiency.',
      estimatedTimeMinutes: 15,
      questionCount: 10,
      order: 3,
      isRequired: true
    },
    
    // Patient Care modules
    {
      id: 'pat-outcomes',
      title: 'Outcomes Tracking',
      category: AssessmentCategory.PATIENT_CARE,
      description: 'Evaluate your patient outcome measurement and tracking systems.',
      estimatedTimeMinutes: 15,
      questionCount: 10,
      order: 1,
      isRequired: true
    },
    {
      id: 'pat-experience',
      title: 'Patient Experience',
      category: AssessmentCategory.PATIENT_CARE,
      description: 'Assess your patient satisfaction, communication, and experience management.',
      estimatedTimeMinutes: 15,
      questionCount: 10,
      order: 2,
      isRequired: true
    },
    
    // Technology modules
    {
      id: 'tech-systems',
      title: 'Practice Management Systems',
      category: AssessmentCategory.TECHNOLOGY,
      description: 'Evaluate your practice management software, EHR, and technology infrastructure.',
      estimatedTimeMinutes: 20,
      questionCount: 12,
      order: 1,
      isRequired: true
    },
    {
      id: 'tech-telehealth',
      title: 'Telehealth Capabilities',
      category: AssessmentCategory.TECHNOLOGY,
      description: 'Assess your telehealth implementation, processes, and technology.',
      estimatedTimeMinutes: 15,
      questionCount: 8,
      order: 2,
      isRequired: false
    },
    
    // Compliance modules
    {
      id: 'comp-hipaa',
      title: 'HIPAA Compliance',
      category: AssessmentCategory.COMPLIANCE,
      description: 'Evaluate your HIPAA compliance policies, procedures, and training.',
      estimatedTimeMinutes: 20,
      questionCount: 15,
      order: 1,
      isRequired: true
    },
    {
      id: 'comp-documentation',
      title: 'Documentation Compliance',
      category: AssessmentCategory.COMPLIANCE,
      description: 'Assess your clinical documentation compliance with regulatory requirements.',
      estimatedTimeMinutes: 15,
      questionCount: 10,
      order: 2,
      isRequired: true
    },
    
    // Additional modules for other categories would be defined here
  ];

  /**
   * Initialize a new assessment progress for a user
   * @param userId The user ID
   * @param practiceId The practice ID
   * @param discipline The practice discipline
   * @param size The practice size
   * @returns New assessment progress object
   */
  public static initializeAssessment(
    userId: string,
    practiceId: string,
    discipline: DisciplineType,
    size: PracticeSize
  ): UserAssessmentProgress {
    // Get relevant modules for this discipline and practice size
    const relevantModules = this.getRelevantModules(discipline, size);
    
    // Initialize module progress for each module
    const moduleProgress: Record<string, ModuleProgressStatus> = {};
    
    relevantModules.forEach(module => {
      moduleProgress[module.id] = {
        moduleId: module.id,
        status: 'not_started',
        responses: [],
        progress: 0
      };
    });
    
    // Determine first module
    const firstModule = relevantModules.find(m => m.order === 1 && m.category === AssessmentCategory.FINANCIAL);
    
    // Create assessment progress object
    const assessmentProgress: UserAssessmentProgress = {
      userId,
      practiceId,
      startedAt: new Date(),
      lastUpdatedAt: new Date(),
      moduleProgress,
      completedModules: [],
      currentModule: firstModule?.id,
      overallProgress: 0
    };
    
    return assessmentProgress;
  }

  /**
   * Get modules relevant to a specific discipline and practice size
   * @param discipline The practice discipline
   * @param size The practice size
   * @returns List of relevant assessment modules
   */
  public static getRelevantModules(
    discipline: DisciplineType,
    size: PracticeSize
  ): AssessmentModule[] {
    // In a real implementation, this would filter modules based on
    // discipline-specific and size-specific relevance
    
    // For now, returning all modules with some basic filtering
    let modules = [...this.ASSESSMENT_MODULES];
    
    // For solo practices, exclude certain modules
    if (size === PracticeSize.SOLO) {
      modules = modules.filter(module => 
        // Exclude modules that don't apply to solo practices
        module.id !== 'ops-workflow' &&
        module.id !== 'tech-telehealth'
      );
    }
    
    // Sort modules by category and order
    modules.sort((a, b) => {
      // First sort by category
      if (a.category !== b.category) {
        return Object.values(AssessmentCategory).indexOf(a.category) - 
               Object.values(AssessmentCategory).indexOf(b.category);
      }
      
      // Then sort by order within category
      return a.order - b.order;
    });
    
    return modules;
  }

  /**
   * Update progress for a specific module
   * @param progress The current assessment progress
   * @param moduleId The module ID to update
   * @param responses The question responses for this module
   * @param isComplete Whether the module is complete
   * @returns Updated assessment progress
   */
  public static updateModuleProgress(
    progress: UserAssessmentProgress,
    moduleId: string,
    responses: QuestionResponse[],
    isComplete: boolean = false
  ): UserAssessmentProgress {
    // Create a copy of the progress object to avoid mutations
    const updatedProgress = { ...progress };
    
    // Get the module
    const module = this.ASSESSMENT_MODULES.find(m => m.id === moduleId);
    
    if (!module) {
      throw new Error(`Module with ID ${moduleId} not found`);
    }
    
    // Calculate module completion percentage
    const completionPercentage = Math.min(
      100,
      Math.round((responses.length / module.questionCount) * 100)
    );
    
    // Update module progress
    const moduleProgressStatus: ModuleProgressStatus = {
      moduleId,
      status: isComplete ? 'completed' : 'in_progress',
      startedAt: updatedProgress.moduleProgress[moduleId]?.startedAt || new Date(),
      completedAt: isComplete ? new Date() : undefined,
      currentQuestionIndex: isComplete ? module.questionCount : responses.length,
      responses,
      progress: isComplete ? 100 : completionPercentage
    };
    
    updatedProgress.moduleProgress[moduleId] = moduleProgressStatus;
    updatedProgress.lastUpdatedAt = new Date();
    
    // If module is complete, add to completed modules
    if (isComplete && !updatedProgress.completedModules.includes(moduleId)) {
      updatedProgress.completedModules.push(moduleId);
      
      // Determine next module
      updatedProgress.currentModule = this.determineNextModule(updatedProgress);
    }
    
    // Calculate overall progress
    updatedProgress.overallProgress = this.calculateOverallProgress(updatedProgress);
    
    return updatedProgress;
  }

  /**
   * Determine the next module to complete
   * @param progress The current assessment progress
   * @returns ID of the next module to complete, or undefined if all complete
   */
  private static determineNextModule(
    progress: UserAssessmentProgress
  ): string | undefined {
    // Get all modules
    const allModules = this.ASSESSMENT_MODULES;
    
    // Get modules that are in the progress object
    const availableModules = Object.keys(progress.moduleProgress);
    
    // Find incomplete required modules first
    const incompleteRequiredModules = allModules.filter(module => 
      availableModules.includes(module.id) &&
      !progress.completedModules.includes(module.id) &&
      module.isRequired
    );
    
    if (incompleteRequiredModules.length > 0) {
      // Sort by category and order
      incompleteRequiredModules.sort((a, b) => {
        // First sort by category
        if (a.category !== b.category) {
          return Object.values(AssessmentCategory).indexOf(a.category) - 
                 Object.values(AssessmentCategory).indexOf(b.category);
        }
        
        // Then sort by order within category
        return a.order - b.order;
      });
      
      return incompleteRequiredModules[0].id;
    }
    
    // If all required modules are complete, find incomplete optional modules
    const incompleteOptionalModules = allModules.filter(module => 
      availableModules.includes(module.id) &&
      !progress.completedModules.includes(module.id) &&
      !module.isRequired
    );
    
    if (incompleteOptionalModules.length > 0) {
      // Sort by category and order
      incompleteOptionalModules.sort((a, b) => {
        // First sort by category
        if (a.category !== b.category) {
          return Object.values(AssessmentCategory).indexOf(a.category) - 
                 Object.values(AssessmentCategory).indexOf(b.category);
        }
        
        // Then sort by order within category
        return a.order - b.order;
      });
      
      return incompleteOptionalModules[0].id;
    }
    
    // If all modules are complete, return undefined
    return undefined;
  }

  /**
   * Calculate overall assessment progress
   * @param progress The current assessment progress
   * @returns Overall progress percentage (0-100)
   */
  private static calculateOverallProgress(
    progress: UserAssessmentProgress
  ): number {
    // Get all modules in the progress object
    const moduleIds = Object.keys(progress.moduleProgress);
    
    // Count required modules
    const requiredModules = this.ASSESSMENT_MODULES.filter(module => 
      moduleIds.includes(module.id) && module.isRequired
    );
    
    const requiredModuleCount = requiredModules.length;
    
    if (requiredModuleCount === 0) return 0;
    
    // Calculate progress for required modules
    let totalProgress = 0;
    
    requiredModules.forEach(module => {
      const moduleProgress = progress.moduleProgress[module.id];
      totalProgress += moduleProgress?.progress || 0;
    });
    
    // Calculate average progress
    return Math.round(totalProgress / requiredModuleCount);
  }

  /**
   * Get recommended modules based on current progress
   * @param progress The current assessment progress
   * @returns List of recommended modules with reasons
   */
  public static getRecommendedModules(
    progress: UserAssessmentProgress
  ): AssessmentRecommendation[] {
    const recommendations: AssessmentRecommendation[] = [];
    
    // First, recommend the current module if there is one
    if (progress.currentModule) {
      const currentModule = this.ASSESSMENT_MODULES.find(
        m => m.id === progress.currentModule
      );
      
      if (currentModule) {
        recommendations.push({
          moduleId: currentModule.id,
          title: currentModule.title,
          reason: 'Current module in progress',
          priority: 'high'
        });
      }
    }
    
    // Then, recommend incomplete required modules
    const incompleteRequiredModules = this.ASSESSMENT_MODULES.filter(module => 
      Object.keys(progress.moduleProgress).includes(module.id) &&
      !progress.completedModules.includes(module.id) &&
      module.isRequired &&
      module.id !== progress.currentModule
    );
    
    // Sort by category priority and order
    const categoryPriority = [
      AssessmentCategory.FINANCIAL,
      AssessmentCategory.OPERATIONS,
      AssessmentCategory.PATIENT_CARE,
      AssessmentCategory.COMPLIANCE,
      AssessmentCategory.TECHNOLOGY,
      AssessmentCategory.STAFFING,
      AssessmentCategory.MARKETING,
      AssessmentCategory.FACILITIES,
      AssessmentCategory.GEOGRAPHY,
      AssessmentCategory.AUTOMATION
    ];
    
    incompleteRequiredModules.sort((a, b) => {
      // First sort by category priority
      const aCategoryIndex = categoryPriority.indexOf(a.category);
      const bCategoryIndex = categoryPriority.indexOf(b.category);
      
      if (aCategoryIndex !== bCategoryIndex) {
        return aCategoryIndex - bCategoryIndex;
      }
      
      // Then sort by order within category
      return a.order - b.order;
    });
    
    // Add top 3 incomplete required modules
    incompleteRequiredModules.slice(0, 3).forEach(module => {
      recommendations.push({
        moduleId: module.id,
        title: module.title,
        reason: `Required module for ${module.category} assessment`,
        priority: 'medium'
      });
    });
    
    // Finally, recommend incomplete optional modules if we have space
    if (recommendations.length < 5) {
      const incompleteOptionalModules = this.ASSESSMENT_MODULES.filter(module => 
        Object.keys(progress.moduleProgress).includes(module.id) &&
        !progress.completedModules.includes(module.id) &&
        !module.isRequired &&
        module.id !== progress.currentModule &&
        !recommendations.some(r => r.moduleId === module.id)
      );
      
      // Sort by category priority and order
      incompleteOptionalModules.sort((a, b) => {
        // First sort by category priority
        const aCategoryIndex = categoryPriority.indexOf(a.category);
        const bCategoryIndex = categoryPriority.indexOf(b.category);
        
        if (aCategoryIndex !== bCategoryIndex) {
          return aCategoryIndex - bCategoryIndex;
        }
        
        // Then sort by order within category
        return a.order - b.order;
      });
      
      // Add remaining optional modules to fill up to 5 recommendations
      incompleteOptionalModules
        .slice(0, 5 - recommendations.length)
        .forEach(module => {
          recommendations.push({
            moduleId: module.id,
            title: module.title,
            reason: `Optional module for ${module.category} assessment`,
            priority: 'low'
          });
        });
    }
    
    return recommendations;
  }

  /**
   * Get estimated time to complete the assessment
   * @param progress The current assessment progress
   * @returns Estimated completion time in minutes
   */
  public static getEstimatedCompletionTime(
    progress: UserAssessmentProgress
  ): number {
    let totalTimeRemaining = 0;
    
    // Calculate time for incomplete modules
    Object.entries(progress.moduleProgress).forEach(([moduleId, moduleProgress]) => {
      // Skip completed modules
      if (moduleProgress.status === 'completed') return;
      
      // Find the module
      const module = this.ASSESSMENT_MODULES.find(m => m.id === moduleId);
      
      if (!module) return;
      
      // If module is in progress, estimate remaining time
      if (moduleProgress.status === 'in_progress') {
        const percentComplete = moduleProgress.progress / 100;
        const remainingTime = Math.round(module.estimatedTimeMinutes * (1 - percentComplete));
        totalTimeRemaining += remainingTime;
      } else {
        // If module is not started, add full time
        totalTimeRemaining += module.estimatedTimeMinutes;
      }
    });
    
    return totalTimeRemaining;
  }

  /**
   * Get module completion statistics by category
   * @param progress The current assessment progress
   * @returns Completion statistics by category
   */
  public static getCategoryCompletionStats(
    progress: UserAssessmentProgress
  ): Record<AssessmentCategory, { completed: number, total: number, percentage: number }> {
    const stats: Record<AssessmentCategory, { completed: number, total: number, percentage: number }> = {} as Record<AssessmentCategory, { completed: number, total: number, percentage: number }>;
    
    // Initialize stats for each category
    Object.values(AssessmentCategory).forEach(category => {
      stats[category] = { completed: 0, total: 0, percentage: 0 };
    });
    
    // Count modules by category
    Object.entries(progress.moduleProgress).forEach(([moduleId, moduleProgress]) => {
      // Find the module
      const module = this.ASSESSMENT_MODULES.find(m => m.id === moduleId);
      
      if (!module) return;
      
      // Increment total count for this category
      stats[module.category].total += 1;
      
      // If module is completed, increment completed count
      if (moduleProgress.status === 'completed') {
        stats[module.category].completed += 1;
      }
    });
    
    // Calculate percentages
    Object.values(AssessmentCategory).forEach(category => {
      const { completed, total } = stats[category];
      
      if (total > 0) {
        stats[category].percentage = Math.round((completed / total) * 100);
      }
    });
    
    return stats;
  }
}

// Export the system for use in other modules
export default ProgressTrackingSystem;
