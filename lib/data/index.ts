import { Question } from '../models/Question';
import { AssessmentCategory } from '../models/AssessmentCategory';
import { QuestionType } from '../models/QuestionType';
import { DisciplineType } from '../models/DisciplineType';

// Import all question categories
import { financialQuestions } from './questions/financial';
import { operationsQuestions } from './questions/operations';
import { patientCareQuestions } from './questions/patient-care';
import { technologyQuestions } from './questions/technology';
import { complianceQuestions } from './questions/compliance';
import { facilitiesQuestions } from './questions/facilities';
import { marketingQuestions } from './questions/marketing';
import { geographyQuestions } from './questions/geography';
import { staffingQuestions } from './questions/staffing';
import { automationQuestions } from './questions/automation';

// Combine all questions into a single array
export const allQuestions: Question[] = [
  ...financialQuestions,
  ...operationsQuestions,
  ...patientCareQuestions,
  ...technologyQuestions,
  ...complianceQuestions,
  ...facilitiesQuestions,
  ...marketingQuestions,
  ...geographyQuestions,
  ...staffingQuestions,
  ...automationQuestions,
];

// Export individual question categories
export {
  financialQuestions,
  operationsQuestions,
  patientCareQuestions,
  technologyQuestions,
  complianceQuestions,
  facilitiesQuestions,
  marketingQuestions,
  geographyQuestions,
  staffingQuestions,
  automationQuestions,
};

// Get questions by category
export const getQuestionsByCategory = (category: AssessmentCategory): Question[] => {
  return allQuestions.filter(question => question.category === category);
};

// Get questions by module ID
export const getQuestionsByModule = (moduleId: string): Question[] => {
  return allQuestions.filter(question => question.moduleId === moduleId);
};

// Get questions by discipline
export const getQuestionsByDiscipline = (discipline: DisciplineType): Question[] => {
  return allQuestions.filter(
    question => 
      question.applicableDisciplines.includes(discipline) || 
      question.universalQuestion
  );
};

// Get questions by type
export const getQuestionsByType = (type: QuestionType): Question[] => {
  return allQuestions.filter(question => question.type === type);
};
