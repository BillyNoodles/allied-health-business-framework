// In src/app/assessment/[moduleId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { getModuleQuestions } from '@/lib/data/modules';
import { saveAssessmentResponse } from '@/lib/supabase/db';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const { moduleId } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<any[]>([]);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  
  useEffect(() => {
    async function loadModule() {
      try {
        setLoading(true);
        
        // Get or create assessment
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) {
          router.push('/auth');
          return;
        }
        
        // Get or create assessment
        const { data: assessmentData, error: assessmentError } = await supabase
          .from('assessments')
          .select('id')
          .eq('user_id', userData.user.id)
          .is('completed_at', null)
          .single();
          
        let currentAssessmentId;
        
        if (assessmentError || !assessmentData) {
          // Create new assessment
          const { data: newAssessment, error: createError } = await supabase
            .from('assessments')
            .insert({ user_id: userData.user.id })
            .select('id')
            .single();
            
          if (createError) throw createError;
          currentAssessmentId = newAssessment.id;
        } else {
          currentAssessmentId = assessmentData.id;
        }
        
        setAssessmentId(currentAssessmentId);
        
        // Load questions for this module
        const moduleQuestions = getModuleQuestions(moduleId);
        setQuestions(moduleQuestions);
        
        // Load existing responses
        const { data: responseData } = await supabase
          .from('assessment_responses')
          .select('question_id, response_value')
          .eq('assessment_id', currentAssessmentId);
          
        if (responseData) {
          const responseMap = responseData.reduce((acc, item) => {
            acc[item.question_id] = item.response_value;
            return acc;
          }, {} as Record<string, any>);
          
          setResponses(responseMap);
        }
        
      } catch (error) {
        console.error('Error loading module:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadModule();
  }, [moduleId, router]);
  
  const handleResponseChange = async (questionId: string, value: any) => {
    if (!assessmentId) return;
    
    // Update local state
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Save to database
    await saveAssessmentResponse(assessmentId, questionId, value);
  };
  
  const handleNext = () => {
    // Navigate to next module or results page
    // This would depend on your module sequence logic
    router.push('/assessment');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        {questions.length > 0 ? questions[0].module : 'Assessment Module'}
      </h1>
      
      {questions.map((question) => (
        <Card key={question.id} className="mb-6 p-6">
          <h2 className="text-xl font-semibold mb-2">{question.text}</h2>
          {question.description && (
            <p className="text-gray-600 mb-4">{question.description}</p>
          )}
          
          {/* Render different question types based on question.type */}
          {/* This is simplified - you'd need to implement different question components */}
          <input
            type="text"
            value={responses[question.id] || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            className="w-full p-2 border rounded"
          />
        </Card>
      ))}
      
      <div className="flex justify-end mt-6">
        <Button onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
