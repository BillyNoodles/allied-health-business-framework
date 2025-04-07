import { createClient } from '@supabase/supabase-js';
import { BusinessHealthScoreCalculator } from '@/lib/algorithms/BusinessHealthScoreCalculator';
import { InterconnectednessAnalyzer } from '@/lib/algorithms/InterconnectednessAnalyzer';
import { RecommendationEngine } from '@/lib/algorithms/RecommendationEngine';
import { SOPGenerator } from '@/lib/algorithms/SOPGenerator';
import { ComplianceVerificationSystem } from '@/lib/algorithms/ComplianceVerificationSystem';
import { FinancialAssessmentCalculator } from '@/lib/algorithms/FinancialAssessmentCalculator';
import { DisciplineType } from '@/lib/models/DisciplineType';
import { PracticeSize } from '@/lib/models/PracticeSize';
import { Country } from '@/lib/models/Country';
import { ComplianceFrameworkType, ComplianceRequirement, ComplianceStatus } from '@/lib/models/ComplianceFramework';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication functions
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Assessment-related functions
export async function saveAssessmentResponse(userId: string, questionId: string, response: any) {
  const { data, error } = await supabase
    .from('assessment_responses')
    .upsert({
      user_id: userId,
      question_id: questionId,
      response_value: response,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,question_id'
    });

  if (error) {
    console.error('Error saving assessment response:', error);
    throw error;
  }

  return data;
}

export async function getAssessmentResponses(userId: string, moduleId?: string) {
  let query = supabase
    .from('assessment_responses')
    .select('*, question:question_id(*)')
    .eq('user_id', userId);

  if (moduleId) {
    query = query.eq('question.module_id', moduleId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching assessment responses:', error);
    throw error;
  }

  return data;
}

export async function getAssessmentProgress(userId: string) {
  const { data: responses, error: responsesError } = await supabase
    .from('assessment_responses')
    .select('question_id')
    .eq('user_id', userId);

  if (responsesError) {
    console.error('Error fetching assessment progress:', responsesError);
    throw responsesError;
  }

  const { data: totalQuestions, error: questionsError } = await supabase
    .from('assessment_questions')
    .select('id');

  if (questionsError) {
    console.error('Error fetching total questions:', questionsError);
    throw questionsError;
  }

  return {
    completed: responses?.length || 0,
    total: totalQuestions?.length || 0,
    percentage: totalQuestions?.length ? Math.round((responses?.length || 0) / totalQuestions.length * 100) : 0
  };
}

// User profile functions
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('practice_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
    console.error('Error fetching user profile:', error);
    throw error;
  }

  return data;
}

export async function updateUserProfile(userId: string, profileData: any) {
  const { data, error } = await supabase
    .from('practice_profiles')
    .upsert({
      user_id: userId,
      ...profileData,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    });

  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }

  return data;
}

// Business health score functions
export async function calculateAndSaveBusinessHealthScore(userId: string) {
  try {
    // Get user profile to determine practice details
    const profile = await getUserProfile(userId);
    if (!profile) {
      throw new Error('User profile not found');
    }

    // Get assessment responses
    const responses = await getAssessmentResponses(userId);
    
    // Convert responses to the format expected by the calculator
    const formattedResponses = responses.reduce((acc: Record<string, any>, response: any) => {
      acc[response.question.key] = response.response_value;
      return acc;
    }, {});

    // Calculate business health score
    const healthScore = BusinessHealthScoreCalculator.calculateScore(
      formattedResponses,
      profile.discipline as DisciplineType,
      profile.practice_size as PracticeSize,
      profile.country as Country
    );

    // Save score to database
    const { data, error } = await supabase
      .from('business_health_scores')
      .insert({
        user_id: userId,
        overall_score: healthScore.overallScore,
        category_scores: healthScore.categories,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving business health score:', error);
      throw error;
    }

    // Generate and save recommendations
    await generateAndSaveRecommendations(userId, healthScore, profile);

    return data;
  } catch (error) {
    console.error('Error calculating business health score:', error);
    throw error;
  }
}

export async function getBusinessHealthScore(userId: string) {
  const { data, error } = await supabase
    .from('business_health_scores')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching business health score:', error);
    throw error;
  }

  return data;
}

// Interconnectedness analysis functions
export async function analyzeInterconnectedness(userId: string) {
  try {
    // Get latest business health score
    const healthScore = await getBusinessHealthScore(userId);
    if (!healthScore) {
      throw new Error('Business health score not found');
    }

    // Get user profile
    const profile = await getUserProfile(userId);
    if (!profile) {
      throw new Error('User profile not found');
    }

    // Analyze interconnectedness
    const analysis = InterconnectednessAnalyzer.analyzeConnections(
      healthScore.category_scores,
      profile.practice_size as PracticeSize
    );

    // Save analysis to database
    const { data, error } = await supabase
      .from('interconnectedness_analyses')
      .insert({
        user_id: userId,
        connections: analysis.connections,
        key_insights: analysis.keyInsights,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving interconnectedness analysis:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error analyzing interconnectedness:', error);
    throw error;
  }
}

export async function getInterconnectednessAnalysis(userId: string) {
  const { data, error } = await supabase
    .from('interconnectedness_analyses')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching interconnectedness analysis:', error);
    throw error;
  }

  return data;
}

// Recommendations functions
async function generateAndSaveRecommendations(userId: string, healthScore: any, profile: any) {
  try {
    // Generate recommendations
    const recommendations = RecommendationEngine.generateRecommendations(
      healthScore,
      profile.discipline as DisciplineType,
      profile.practice_size as PracticeSize,
      profile.country as Country
    );

    // Delete existing recommendations
    const { error: deleteError } = await supabase
      .from('recommendations')
      .delete()
      .eq('user_id', userId);

    if (deleteError) {
      console.error('Error deleting existing recommendations:', deleteError);
      throw deleteError;
    }

    // Save new recommendations
    const recommendationsToInsert = recommendations.map((rec, index) => ({
      user_id: userId,
      category: rec.category,
      recommendation: rec.text,
      priority: rec.priority,
      difficulty: rec.difficulty,
      impact: rec.impact,
      timeframe: rec.timeframe,
      created_at: new Date().toISOString()
    }));

    const { data, error } = await supabase
      .from('recommendations')
      .insert(recommendationsToInsert);

    if (error) {
      console.error('Error saving recommendations:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error generating and saving recommendations:', error);
    throw error;
  }
}

export async function getRecommendations(userId: string, limit = 5) {
  const { data, error } = await supabase
    .from('recommendations')
    .select('*')
    .eq('user_id', userId)
    .order('priority', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }

  return data;
}

// SOP functions
export async function generateSOP(userId: string, sopType: string, title: string) {
  try {
    // Get user profile
    const profile = await getUserProfile(userId);
    if (!profile) {
      throw new Error('User profile not found');
    }

    // Get business health score
    const healthScore = await getBusinessHealthScore(userId);
    if (!healthScore) {
      throw new Error('Business health score not found');
    }

    // Get assessment responses for practice-specific data
    const responses = await getAssessmentResponses(userId);
    const practiceData = responses.reduce((acc: Record<string, string>, response: any) => {
      if (typeof response.response_value === 'string') {
        acc[response.question.key] = response.response_value;
      }
      return acc;
    }, {});

    // Add practice name and other basic info
    practiceData.practiceName = profile.practice_name || 'Your Practice';

    // Create request record
    const { data: requestData, error: requestError } = await supabase
      .from('sop_requests')
      .insert({
        user_id: userId,
        sop_type: sopType,
        title: title,
        status: 'processing',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (requestError) {
      console.error('Error creating SOP request:', requestError);
      throw requestError;
    }

    // Find appropriate template based on health score and practice details
    const templates = SOPGenerator.recommendSOPs(
      healthScore,
      profile.discipline as DisciplineType,
      profile.practice_size as PracticeSize
    );

    // Use first template that matches the requested type, or first template if none match
    const template = templates.find(t => t.type === sopType) || templates[0];

    // Generate SOP
    const generatedSOP = SOPGenerator.generateSOP(template.id, practiceData);

    // Export to markdown
    const sopContent = SOPGenerator.exportSOP(generatedSOP, 'markdown');

    // Save generated SOP
    const { data: sopData, error: sopError } = await supabase
      .from('sop_documents')
      .insert({
        user_id: userId,
        request_id: requestData.id,
        title: generatedSOP.title,
        sop_type: generatedSOP.type,
        content: sopContent,
        template_id: template.id,
        status: 'active',
        created_at: new Date().toISOString(),
        next_review_date: generatedSOP.nextReviewDate.toISOString()
      })
      .select()
      .single();

    if (sopError) {
      console.error('Error saving generated SOP:', sopError);
      throw sopError;
    }

    // Update request status
    const { error: updateError } = await supabase
      .from('sop_requests')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', requestData.id);

    if (updateError) {
      console.error('Error updating SOP request status:', updateError);
      throw updateError;
    }

    return sopData;
  } catch (error) {
    console.error('Error in SOP generation process:', error);
    throw error;
  }
}

export async function getSOPs(userId: string) {
  const { data, error } = await supabase
    .from('sop_documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching SOPs:', error);
    throw error;
  }

  return data;
}

// Compliance verification functions
export async function verifyCompliance(userId: string) {
  try {
    // Get user profile
    const profile = await getUserProfile(userId);
    if (!profile) {
      throw new Error('User profile not found');
    }

    // Get assessment responses
    const responses = await getAssessmentResponses(userId);
    
    // Convert responses to the format expected by the verification system
    const practiceData = responses.reduce((acc: Record<string, any>, response: any) => {
      acc[response.question.key] = response.response_value;
      return acc;
    }, {});

    // Get applicable compliance frameworks
    const frameworks = ComplianceVerificationSystem.getApplicableFrameworks(
      profile.discipline as DisciplineType,
      profile.practice_size as PracticeSize,
      profile.country as Country
    );

    // Get all requirements from all frameworks
    const allRequirements = frameworks.flatMap(framework => framework.requirements);

    // Evaluate compliance
    const complianceStatus = ComplianceVerificationSystem.evaluateCompliance(
      practiceData,
      allRequirements
    );

    // Generate action plan
    const actionPlan = ComplianceVerificationSystem.generateActionPlan(
      complianceStatus,
      allRequirements
    );

    // Generate dashboard data
    const dashboardData = ComplianceVerificationSystem.generateDashboardData(
      complianceStatus,
      allRequirements
    );

    // Save compliance verification results
    const { data, error } = await supabase
      .from('compliance_verifications')
      .insert({
        user_id: userId,
        frameworks: frameworks.map(f => f.type),
        compliance_status: complianceStatus,
        action_plan: actionPlan,
        dashboard_data: dashboardData,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving compliance verification:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error verifying compliance:', error);
    throw error;
  }
}

export async function getComplianceVerification(userId: string) {
  const { data, error } = await supabase
    .from('compliance_verifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching compliance verification:', error);
    throw error;
  }

  return data;
}

export async function getComplianceRequirements(userId: string, frameworkType?: ComplianceFrameworkType) {
  try {
    // Get user profile
    const profile = await getUserProfile(userId);
    if (!profile) {
      throw new Error('User profile not found');
    }

    // Get applicable frameworks
    const frameworks = ComplianceVerificationSystem.getApplicableFrameworks(
      profile.discipline as DisciplineType,
      profile.practice_size as PracticeSize,
      profile.country as Country
    );

    // Filter by framework type if specified
    let requirements: ComplianceRequirement[] = [];
    if (frameworkType) {
      const framework = frameworks.find(f => f.type === frameworkType);
      requirements = framework ? framework.requirements : [];
    } else {
      requirements = frameworks.flatMap(f => f.requirements);
    }

    return requirements;
  } catch (error) {
    console.error('Error fetching compliance requirements:', error);
    throw error;
  }
}

// Financial assessment functions
export async function calculateFinancialHealth(userId: string) {
  try {
    // Get user profile
    const profile = await getUserProfile(userId);
    if (!profile) {
      throw new Error('User profile not found');
    }

    // Get assessment responses
    const responses = await getAssessmentResponses(userId);
    
    // Convert responses to the format expected by the calculator
    const formattedResponses = responses.reduce((acc: Record<string, any>, response: any) => {
      acc[response.question.key] = response.response_value;
      return acc;
    }, {});

    // Calculate financial health
    const financialAssessment = FinancialAssessmentCalculator.calculateFinancialHealth(
      formattedResponses,
      profile.discipline as DisciplineType,
      profile.practice_size as PracticeSize,
      profile.country as Country
    );

    // Save financial assessment results
    const { data, error } = await supabase
      .from('financial_assessments')
      .insert({
        user_id: userId,
        overall_score: financialAssessment.overallScore,
        category_scores: financialAssessment.categoryScores,
        recommendations: financialAssessment.recommendations,
        projections: financialAssessment.projections,
        benchmark_comparisons: financialAssessment.benchmarkComparisons,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving financial assessment:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error calculating financial health:', error);
    throw error;
  }
}

export async function getFinancialAssessment(userId: string) {
  const { data, error } = await supabase
    .from('financial_assessments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching financial assessment:', error);
    throw error;
  }

  return data;
}

// Progress tracking functions
export async function trackProgress(userId: string) {
  try {
    // Get previous business health scores
    const { data: previousScores, error: scoresError } = await supabase
      .from('business_health_scores')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (scoresError) {
      console.error('Error fetching previous scores:', scoresError);
      throw scoresError;
    }

    // Get completed recommendations
    const { data: completedRecommendations, error: recommendationsError } = await supabase
      .from('recommendation_tracking')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'completed');

    if (recommendationsError) {
      console.error('Error fetching completed recommendations:', recommendationsError);
      throw recommendationsError;
    }

    // Calculate progress metrics
    const progressData = {
      score_history: previousScores.map(score => ({
        date: score.created_at,
        overall_score: score.overall_score,
        category_scores: score.category_scores
      })),
      improvements: calculateImprovements(previousScores),
      completed_actions: completedRecommendations.length,
      key_achievements: identifyKeyAchievements(previousScores, completedRecommendations)
    };

    // Save progress tracking data
    const { data, error } = await supabase
      .from('progress_tracking')
      .insert({
        user_id: userId,
        progress_data: progressData,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving progress tracking data:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error tracking progress:', error);
    throw error;
  }
}

function calculateImprovements(scores: any[]) {
  if (scores.length < 2) {
    return [];
  }

  const latestScore = scores[0];
  const previousScore = scores[scores.length - 1];

  const improvements = latestScore.category_scores.map((category: any) => {
    const previousCategory = previousScore.category_scores.find(
      (c: any) => c.category === category.category
    );

    return {
      category: category.category,
      previous_score: previousCategory ? previousCategory.score : 0,
      current_score: category.score,
      improvement: previousCategory ? category.score - previousCategory.score : 0
    };
  });

  return improvements;
}

function identifyKeyAchievements(scores: any[], completedRecommendations: any[]) {
  const achievements = [];

  // Add score improvements as achievements
  if (scores.length >= 2) {
    const latestScore = scores[0];
    const previousScore = scores[scores.length - 1];

    if (latestScore.overall_score > previousScore.overall_score) {
      achievements.push({
        type: 'score_improvement',
        description: `Overall business health score improved by ${(latestScore.overall_score - previousScore.overall_score).toFixed(1)} points`
      });
    }

    // Find category with biggest improvement
    const categoryImprovements = latestScore.category_scores.map((category: any) => {
      const previousCategory = previousScore.category_scores.find(
        (c: any) => c.category === category.category
      );
      return {
        category: category.category,
        improvement: previousCategory ? category.score - previousCategory.score : 0
      };
    });

    categoryImprovements.sort((a, b) => b.improvement - a.improvement);

    if (categoryImprovements[0]?.improvement > 0) {
      achievements.push({
        type: 'category_improvement',
        description: `${categoryImprovements[0].category} score improved by ${categoryImprovements[0].improvement.toFixed(1)} points`
      });
    }
  }

  // Add completed recommendations as achievements
  if (completedRecommendations.length > 0) {
    achievements.push({
      type: 'recommendations_completed',
      description: `Completed ${completedRecommendations.length} recommended actions`
    });
  }

  return achievements;
}

export async function getProgressTracking(userId: string) {
  const { data, error } = await supabase
    .from('progress_tracking')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching progress tracking:', error);
    throw error;
  }

  return data;
}
