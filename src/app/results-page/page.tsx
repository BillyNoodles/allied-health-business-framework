// In src/app/results/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { BusinessHealthScoreCalculator } from '@/lib/core/assessment/calculators/BusinessHealthScoreCalculator';
import { DisciplineType } from '@/models/DisciplineType';
import { PracticeSize } from '@/models/PracticeSize';
import { Spinner } from '@/components/ui/spinner';

export default function ResultsPage() {
    const [loading, setLoading] = useState(true);
    const [assessmentData, setAssessmentData] = useState<any>(null);
    const [healthScore, setHealthScore] = useState<any>(null);

    useEffect(() => {
        async function loadResults() {
            try {
                setLoading(true);

                const { data: userData } = await supabase.auth.getUser();
                if (!userData.user) {
                    throw new Error('User not authenticated');
                }

                // Get user profile to determine discipline and practice size
                const { data: profileData } = await supabase
                    .from('users')
                    .select('discipline, practice_size, region')
                    .eq('id', userData.user.id)
                    .single();

                // Get latest assessment
                const { data: assessment } = await supabase
                    .from('assessments')
                    .select('id')
                    .eq('user_id', userData.user.id)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single();

                if (!assessment) {
                    throw new Error('No assessment found');
                }

                // Get all modules and responses for this assessment
                const { data: responses } = await supabase
                    .from('assessment_responses')
                    .select('question_id, response_value')
                    .eq('assessment_id', assessment.id);

                // Format data for the calculator
                const modules = []; // You would need to organize responses by module

                // Calculate health score
                const progress = {
                    userId: userData.user.id,
                    modules: modules,
                    lastUpdated: new Date()
                };

                const discipline = profileData?.discipline as DisciplineType || DisciplineType.PHYSIOTHERAPY;
                const size = profileData?.practice_size as PracticeSize || PracticeSize.SMALL;
                const region = profileData?.region;

                const score = BusinessHealthScoreCalculator.calculateScore(
                    progress,
                    discipline,
                    size,
                    region
                );

                setHealthScore(score);
                setAssessmentData(assessment);

                // Save the calculated score back to the database
                await supabase
                    .from('assessments')
                    .update({
                        overall_score: score.overall,
                        score_position: score.position,
                        completed_at: new Date().toISOString()
                    })
                    .eq('id', assessment.id);

                // Save category scores
                for (const categoryScore of score.categories) {
                    await supabase
                        .from('category_scores')
                        .upsert({
                            assessment_id: assessment.id,
                            category_id: categoryScore.category, // You might need to map this to the actual UUID
                            score: categoryScore.score,
                            position: categoryScore.position,
                            strengths: categoryScore.strengths,
                            weaknesses: categoryScore.weaknesses
                        });
                }

            } catch (error) {
                console.error('Error loading results:', error);
            } finally {
                setLoading(false);
            }
        }

        loadResults();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!healthScore) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-6">Results Not Available</h1>
                <p>Please complete an assessment to view your results.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Your Business Health Results</h1>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Overall Score</h2>
                <div className="text-5xl font-bold text-center mb-4">
                    {healthScore.overall}
                </div>
                <p className="text-center text-xl">
                    Your business health is <span className="font-semibold">{healthScore.position}</span>
                </p>
            </div>

            <h2 className="text-xl font-semibold mb-4">Category Scores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {healthScore.categories.map((category: any) => (
                    <div key={category.category} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2">{category.category}</h3>
                        <div className="text-3xl font-bold mb-2">{category.score}</div>
                        <p className="mb-4">Position: {category.position}</p>

                        <h4 className="font-medium mb-2">Strengths:</h4>
                        <ul className="list-disc pl-5 mb-4">
                            {category.strengths.map((strength: string, i: number) => (
                                <li key={i}>{strength}</li>
                            ))}
                        </ul>

                        <h4 className="font-medium mb-2">Areas for Improvement:</h4>
                        <ul className="list-disc pl-5">
                            {category.weaknesses.map((weakness: string, i: number) => (
                                <li key={i}>{weakness}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
