'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return <div className="container mx-auto py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Allied Health Business Assessment Tool</h1>
        <p className="text-xl max-w-3xl mb-8">
          A comprehensive solution for physiotherapy practices to analyze business operations, 
          identify improvement opportunities, and enhance practice performance.
        </p>
        {user ? (
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/assessment">Continue Assessment</Link>
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/auth">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        )}
      </div>

      <div id="features" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Comprehensive Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Evaluate all aspects of your practice with our weighted scoring system covering financial health, 
              operations, patient care, compliance, technology, and more.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data-Driven Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Receive quantifiable metrics and benchmarks to understand your practice's position 
              relative to industry standards.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actionable Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Get prioritized, actionable recommendations with implementation guidance and 
              expected ROI for each identified opportunity.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Understand your overall business health with a concrete score and detailed breakdown 
              across all business areas.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interconnectedness Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Visualize how different areas of your practice influence each other to make more 
              informed decisions with cross-domain impact awareness.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Physiotherapy-Specific</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Tailored specifically for physiotherapy practices with relevant benchmarks, metrics, 
              and recommendations for your field.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">1</div>
            <h3 className="text-xl font-medium mb-2">Create Account</h3>
            <p className="text-sm">Sign up and create your practice profile</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">2</div>
            <h3 className="text-xl font-medium mb-2">Complete Assessment</h3>
            <p className="text-sm">Answer questions about your practice operations</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">3</div>
            <h3 className="text-xl font-medium mb-2">Review Results</h3>
            <p className="text-sm">Get your business health score and detailed analysis</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">4</div>
            <h3 className="text-xl font-medium mb-2">Implement Changes</h3>
            <p className="text-sm">Follow recommendations to improve your practice</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to optimize your practice?</h2>
        <Button asChild size="lg">
          <Link href={user ? "/dashboard" : "/auth"}>
            {user ? "Go to Dashboard" : "Get Started Now"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
