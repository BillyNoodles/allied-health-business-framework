import { z } from 'zod';

// Define the option schema
export const OptionSchema = z.object({
  value: z.string(),
  score: z.number(),
  text: z.string(),
});

export type Option = z.infer<typeof OptionSchema>;

// Define the score interpretation schema
export const ScoreInterpretationSchema = z.record(
  z.string(),
  z.object({
    interpretation: z.string(),
    actionPrompts: z.array(z.string()),
    priority: z.number().optional(),
    timeframe: z.string().optional(),
  })
);

export type ScoreInterpretation = z.infer<typeof ScoreInterpretationSchema>;

// Define the SOP relevance schema
export const SOPRelevanceSchema = z.object({
  relevant: z.boolean(),
  sopTypes: z.array(z.string()).optional(),
  ragParameters: z.object({
    contextTags: z.array(z.string()).optional(),
    contentPriority: z.number().optional(),
  }).optional(),
});

export type SOPRelevance = z.infer<typeof SOPRelevanceSchema>;

// Define the discipline specific schema
export const DisciplineSpecificSchema = z.record(
  z.string(),
  z.object({
    helpText: z.string().optional(),
    options: z.array(OptionSchema).optional(),
    weight: z.number().optional(),
  })
);

export type DisciplineSpecific = z.infer<typeof DisciplineSpecificSchema>;

// Define the question schema
export const QuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  type: z.string(),
  category: z.string(),
  moduleId: z.string(),
  applicableDisciplines: z.array(z.string()),
  universalQuestion: z.boolean().optional(),
  options: z.array(OptionSchema).optional(),
  weight: z.number(),
  helpText: z.string().optional(),
  impactAreas: z.array(z.string()).optional(),
  applicablePracticeSizes: z.array(z.string()).optional(),
  trackingPeriod: z.string().optional(),
  benchmarkReference: z.string().optional(),
  scoreInterpretation: ScoreInterpretationSchema.optional(),
  sopRelevance: SOPRelevanceSchema.optional(),
  disciplineSpecific: DisciplineSpecificSchema.optional(),
});

export type Question = z.infer<typeof QuestionSchema>;
