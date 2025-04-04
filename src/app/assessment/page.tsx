'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';

export default function AssessmentModules() {
  const router = useRouter();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mock modules for MVP
  const mockModules = [
    {
      id: 'financial',
      name: 'Financial Health',
      description: 'Assess your practice\'s financial performance and sustainability',
      category: 'FINANCIAL',
      weight: 25,
      status: 'NOT_STARTED',
      progress: 0,
      order_index: 1,
      is_active: true,
      icon: '💰'
    },
    {
      id: 'compliance',
      name: 'Compliance & Risk',
      description: 'Evaluate your regulatory compliance and risk management',
      category: 'COMPLIANCE',
      weight: 20,
      status: 'NOT_STARTED',
      progress: 0,
      order_index: 2,
      is_active: true,
      icon: '🔒'
    },
    {
      id: 'patient-care',
      name: 'Patient Care & Outcomes',
      description: 'Measure your patient care quality and treatment outcomes',
      category: 'PATIENT_CARE',
      weight: 15,
      status: 'NOT_STARTED',
      progress: 0,
      order_index: 3,
      is_active: true,
      icon: '🏥'
    },
    {
      id: 'operations',
      name: 'Operations & Workflow',
      description: 'Analyze your operational efficiency and workflow optimization',
      category: 'OPERATIONS',
      weight: 15,
      status: 'NOT_STARTED',
      progress: 0,
      order_index: 4,
      is_active: true,
      icon: '⚡'
    },
    {
      id: 'technology',
      name: 'Technology & Automation',
      description: 'Evaluate your technology adoption and automation opportunities',
      category: 'TECHNOLOGY',
      weight: 10,
      status: 'NOT_STARTED',
      progress: 0,
      order_index: 5,
      is_active: true,
      icon: '💻'
    },
    {
      id: 'facilities',
      name: 'Facilities Management',
      description: 'Assess your physical space utilization and management',
      category: 'FACILITIES',
      weight: 5,
      status: 'NOT_STARTED',
      progress: 0,
      order_index: 6,
      is_active: true,
      icon: '🏢'
    },
    {
      id: 'marketing',
      name: 'Marketing & Growth',
      description: 'Evaluate your marketing effectiveness and growth strategies',
      category: 'MARKETING',
      weight: 5,
      status: 'NOT_STARTED',
      progress: 0,
      order_index: 7,
      is_active: true,
      icon: '📈'
    },
    {
      id: 'geographic',
      name: 'Geographic Considerations',
      description: 'Analyze your location-specific factors and market positioning',
      category: 'GEOGRAPHIC',
      weight: 5,
      status: 'NOT_STARTED',
      progress: 0,
      order_index: 8,
      is_active: true,
      icon: '🌏'
    }
  ];

  useEffect(() => {
    // In a real implementation, we would fetch modules from Supabase
    // For MVP, we'll use mock data
    setModules(mockModules);
    setLoading(false);
  }, []);

  const handleStartModule = (moduleId) => {
    router.push(`/assessment/${moduleId}`);
  };

  if (loading) {
    return <div className="container mx-auto py-10">Loading modules...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Assessment Modules</h1>
      
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-2">Overall Progress</h2>
        <Progress value={0} className="w-full h-2" />
        <p className="text-sm text-gray-500 mt-2">
          0% complete - 0 of 8 modules completed
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{module.name}</CardTitle>
                <span className="text-2xl">{module.icon}</span>
              </div>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">
                    {module.status === 'NOT_STARTED' ? 'Not Started' : 
                     module.status === 'IN_PROGRESS' ? 'In Progress' : 
                     module.status === 'COMPLETED' ? 'Completed' : ''}
                  </span>
                  <span className="text-sm text-gray-500">{module.weight}% of total</span>
                </div>
                <Progress value={module.progress} className="w-full h-2" />
              </div>
              
              <Button 
                onClick={() => handleStartModule(module.id)}
                className="w-full"
                variant={module.status === 'COMPLETED' ? 'outline' : 'default'}
              >
                {module.status === 'NOT_STARTED' ? 'Start Module' : 
                 module.status === 'IN_PROGRESS' ? 'Continue Module' : 
                 module.status === 'COMPLETED' ? 'Review Module' : ''}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
