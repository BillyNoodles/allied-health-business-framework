import { AssessmentCategory } from '@/lib/models/AssessmentCategory';
import { DisciplineType } from '@/lib/models/DisciplineType';

export interface Module {
  id: string;
  title: string;
  description: string;
  category: AssessmentCategory;
  icon: string;
  order: number;
  applicableDisciplines: DisciplineType[];
  questionCount: number;
  estimatedTimeMinutes: number;
  impactAreas: string[];
}

export const assessmentModules: Module[] = [
  {
    id: 'mod-financial-001',
    title: 'Financial Health',
    description: 'Evaluate your practice\'s financial stability, profitability, and revenue management',
    category: AssessmentCategory.FINANCIAL,
    icon: 'dollar-sign',
    order: 1,
    applicableDisciplines: [DisciplineType.PHYSIOTHERAPY, DisciplineType.GENERAL],
    questionCount: 25,
    estimatedTimeMinutes: 15,
    impactAreas: ['Profitability', 'Cash Flow', 'Revenue Growth', 'Financial Stability']
  },
  {
    id: 'mod-operations-001',
    title: 'Operations & Workflow',
    description: 'Assess your operational efficiency, scheduling, and administrative processes',
    category: AssessmentCategory.OPERATIONS,
    icon: 'settings',
    order: 2,
    applicableDisciplines: [DisciplineType.PHYSIOTHERAPY, DisciplineType.GENERAL],
    questionCount: 20,
    estimatedTimeMinutes: 12,
    impactAreas: ['Efficiency', 'Patient Flow', 'Resource Utilization', 'Staff Productivity']
  },
  {
    id: 'mod-patient-care-001',
    title: 'Patient Care & Outcomes',
    description: 'Evaluate your clinical effectiveness, patient satisfaction, and treatment outcomes',
    category: AssessmentCategory.PATIENT_CARE,
    icon: 'heart',
    order: 3,
    applicableDisciplines: [DisciplineType.PHYSIOTHERAPY, DisciplineType.GENERAL],
    questionCount: 18,
    estimatedTimeMinutes: 10,
    impactAreas: ['Clinical Outcomes', 'Patient Satisfaction', 'Quality of Care', 'Treatment Effectiveness']
  },
  {
    id: 'mod-technology-001',
    title: 'Technology & Automation',
    description: 'Assess your practice\'s use of technology, digital tools, and automation',
    category: AssessmentCategory.TECHNOLOGY,
    icon: 'cpu',
    order: 4,
    applicableDisciplines: [DisciplineType.PHYSIOTHERAPY, DisciplineType.GENERAL],
    questionCount: 15,
    estimatedTimeMinutes: 8,
    impactAreas: ['Digital Transformation', 'Efficiency', 'Patient Experience', 'Data Management']
  },
  {
    id: 'mod-compliance-001',
    title: 'Compliance & Risk',
    description: 'Evaluate your regulatory compliance, risk management, and legal safeguards',
    category: AssessmentCategory.COMPLIANCE,
    icon: 'shield',
    order: 5,
    applicableDisciplines: [DisciplineType.PHYSIOTHERAPY, DisciplineType.GENERAL],
    questionCount: 22,
    estimatedTimeMinutes: 14,
    impactAreas: ['Legal Protection', 'Regulatory Compliance', 'Risk Mitigation', 'Documentation']
  },
  {
    id: 'mod-facilities-001',
    title: 'Facilities Management',
    description: 'Assess your physical space, equipment, and facility management',
    category: AssessmentCategory.FACILITIES,
    icon: 'building',
    order: 6,
    applicableDisciplines: [DisciplineType.PHYSIOTHERAPY, DisciplineType.GENERAL],
    questionCount: 12,
    estimatedTimeMinutes: 7,
    impactAreas: ['Patient Experience', 'Operational Efficiency', 'Safety', 'Resource Utilization']
  },
  {
    id: 'mod-marketing-001',
    title: 'Marketing & Growth',
    description: 'Evaluate your marketing strategy, patient acquisition, and practice growth',
    category: AssessmentCategory.MARKETING,
    icon: 'trending-up',
    order: 7,
    applicableDisciplines: [DisciplineType.PHYSIOTHERAPY, DisciplineType.GENERAL],
    questionCount: 16,
    estimatedTimeMinutes: 9,
    impactAreas: ['Patient Acquisition', 'Brand Awareness', 'Referral Growth', 'Market Positioning']
  },
  {
    id: 'mod-geography-001',
    title: 'Geographic Considerations',
    description: 'Assess how your location impacts your practice and patient demographics',
    category: AssessmentCategory.GEOGRAPHY,
    icon: 'map-pin',
    order: 8,
    applicableDisciplines: [DisciplineType.PHYSIOTHERAPY, DisciplineType.GENERAL],
    questionCount: 10,
    estimatedTimeMinutes: 6,
    impactAreas: ['Market Reach', 'Accessibility', 'Competition', 'Community Integration']
  },
  {
    id: 'mod-staffing-001',
    title: 'Staffing & HR',
    description: 'Evaluate your team management, recruitment, and staff development',
    category: AssessmentCategory.STAFFING,
    icon: 'users',
    order: 9,
    applicableDisciplines: [DisciplineType.PHYSIOTHERAPY, DisciplineType.GENERAL],
    questionCount: 18,
    estimatedTimeMinutes: 11,
    impactAreas: ['Team Performance', 'Staff Retention', 'Workplace Culture', 'Skill Development']
  },
  {
    id: 'mod-automation-001',
    title: 'Process Automation',
    description: 'Assess your practice\'s automation of routine tasks and workflows',
    category: AssessmentCategory.AUTOMATION,
    icon: 'zap',
    order: 10,
    applicableDisciplines: [DisciplineType.PHYSIOTHERAPY, DisciplineType.GENERAL],
    questionCount: 14,
    estimatedTimeMinutes: 8,
    impactAreas: ['Operational Efficiency', 'Staff Productivity', 'Error Reduction', 'Time Savings']
  }
];

export const getModuleById = (id: string): Module | undefined => {
  return assessmentModules.find(module => module.id === id);
};

export const getModulesByCategory = (category: AssessmentCategory): Module[] => {
  return assessmentModules.filter(module => module.category === category);
};

export const getModulesByDiscipline = (discipline: DisciplineType): Module[] => {
  return assessmentModules.filter(module => module.applicableDisciplines.includes(discipline));
};
