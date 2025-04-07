// Example of a component with proper loading and error states
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function DashboardSummary() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) {
          throw new Error('User not authenticated');
        }
        
        const { data: assessmentData, error: assessmentError } = await supabase
          .from('assessments')
          .select('id, overall_score, score_position, completed_at')
          .eq('user_id', userData.user.id)
          .order('completed_at', { ascending: false })
          .limit(1)
          .single();
          
        if (assessmentError) throw assessmentError;
        
        setData(assessmentData);
      } catch (err: any) {
        console.error('Error loading dashboard data:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  if (!data) {
    return (
      <div className="p-6 text-center">
        <p>No assessment data available. Start an assessment to see your results.</p>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Business Health</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Overall Score</h3>
          <p className="text-3xl font-bold">{data.overall_score || 'N/A'}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Position</h3>
          <p className="text-3xl font-bold">{data.score_position || 'N/A'}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Last Updated</h3>
          <p className="text-lg">
            {data.completed_at 
              ? new Date(data.completed_at).toLocaleDateString() 
              : 'Not completed'}
          </p>
        </div>
      </div>
    </div>
  );
}
