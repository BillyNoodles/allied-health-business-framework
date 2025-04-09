// In src/lib/supabase/db.ts
import { supabase } from './client';
import { toast } from 'sonner'; // Assuming you're using sonner for toast notifications

export async function saveAssessmentResponse(assessmentId: string, questionId: string, value: any) {
    try {
        const { data, error } = await supabase
            .from('assessment_responses')
            .upsert({
                assessment_id: assessmentId,
                question_id: questionId,
                response_value: value,
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'assessment_id,question_id'
            });

        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        console.error('Error saving assessment response:', error);
        toast.error('Failed to save your response. Please try again.');
        return { data: null, error };
    }
}
