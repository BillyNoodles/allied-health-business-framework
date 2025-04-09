// In src/lib/models/DatabaseModels.ts
export interface User {
    id: string;
    email: string;
    full_name?: string;
    created_at: string;
    updated_at: string;
    discipline?: string;
    practice_size?: string;
    country?: string;
    region?: string;
    onboarding_completed: boolean;
  }
  
  export interface PracticeInformation {
    id: string;
    user_id: string;
    practice_name?: string;
    practice_address?: string;
    practice_phone?: string;
    practice_email?: string;
    practice_website?: string;
    number_of_practitioners?: number;
    number_of_support_staff?: number;
    years_in_operation?: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface Assessment {
    id: string;
    user_id: string;
    started_at: string;
    completed_at?: string;
    overall_score?: number;
    score_position?: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface AssessmentResponse {
    id: string;
    assessment_id: string;
    question_id: string;
    response_value: any;
    created_at: string;
    updated_at: string;
  }
  
  // Add more interfaces for other database tables
  