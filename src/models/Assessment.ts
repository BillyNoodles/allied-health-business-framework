import { z } from 'zod';

export interface BusinessHealthScore {
  id: string;
  userId: string;
  overallScore: number;
  categoryScores: {
    [key: string]: number;
  };
  strengths: string[];
  weaknesses: string[];
  createdAt: string;
}

export const BusinessHealthScoreSchema = z.object({
  id: z.string(),
  userId: z.string(),
  overallScore: z.number().min(0).max(100),
  categoryScores: z.record(z.string(), z.number().min(0).max(100)),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  createdAt: z.string().datetime()
});

export interface Recommendation {
  id: string;
  userId: string;
  category: string;
  title: string;
  description: string;
  priority: number;
  impactAreas: string[];
  implementationSteps: string[];
  estimatedTimeframe: string;
  estimatedCost: string;
  roi: string;
  createdAt: string;
}

export const RecommendationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  category: z.string(),
  title: z.string(),
  description: z.string(),
  priority: z.number().min(1).max(10),
  impactAreas: z.array(z.string()),
  implementationSteps: z.array(z.string()),
  estimatedTimeframe: z.string(),
  estimatedCost: z.string(),
  roi: z.string(),
  createdAt: z.string().datetime()
});

export interface SOP {
  id: string;
  userId: string;
  title: string;
  sopType: string;
  content: string;
  version: string;
  status: 'draft' | 'published' | 'archived',
  createdAt: string;
  updatedAt: string;
}

export const SOPSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  sopType: z.string(),
  content: z.string(),
  version: z.string(),
  status: z.enum(['draft', 'published', 'archived']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export interface PracticeProfile {
  id: string;
  userId: string;
  practiceName: string;
  disciplineType: string;
  practiceSize: string;
  yearsInOperation: number;
  location: {
    country: string;
    state: string;
    city: string;
    postalCode: string;
  };
  patientVolume: {
    weekly: number;
    monthly: number;
  };
  staffCount: number;
  specialties: string[];
  createdAt: string;
  updatedAt: string;
}

export const PracticeProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  practiceName: z.string(),
  disciplineType: z.string(),
  practiceSize: z.string(),
  yearsInOperation: z.number().min(0),
  location: z.object({
    country: z.string(),
    state: z.string(),
    city: z.string(),
    postalCode: z.string()
  }),
  patientVolume: z.object({
    weekly: z.number().min(0),
    monthly: z.number().min(0)
  }),
  staffCount: z.number().min(0),
  specialties: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export interface AssessmentResponse {
  id: string;
  userId: string;
  questionId: string;
  responseValue: any;
  createdAt: string;
  updatedAt: string;
}

export const AssessmentResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  questionId: z.string(),
  responseValue: z.any(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export interface AssessmentProgress {
  completed: number;
  total: number;
  percentage: number;
  moduleProgress: {
    [moduleId: string]: {
      completed: number;
      total: number;
      percentage: number;
    }
  };
}

export const AssessmentProgressSchema = z.object({
  completed: z.number().min(0),
  total: z.number().min(0),
  percentage: z.number().min(0).max(100),
  moduleProgress: z.record(z.string(), z.object({
    completed: z.number().min(0),
    total: z.number().min(0),
    percentage: z.number().min(0).max(100)
  }))
});

export interface Interconnection {
  id: string;
  sourceCategory: string;
  targetCategory: string;
  strength: number;
  description: string;
}

export const InterconnectionSchema = z.object({
  id: z.string(),
  sourceCategory: z.string(),
  targetCategory: z.string(),
  strength: z.number().min(0).max(10),
  description: z.string()
});
