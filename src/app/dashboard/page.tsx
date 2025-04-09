import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { assessmentModules } from '@/data/modules';
import { AssessmentCategory } from '@/lib/models/AssessmentCategory';
import { DisciplineType } from '@/lib/models/DisciplineType';

export default function Dashboard() {
  // Mock data for the dashboard - would be replaced with real data from Supabase
  const mockProgress = {
    overall: 42,
    modules: {
      'mod-financial-001': 75,
      'mod-operations-001': 60,
      'mod-patient-care-001': 30,
      'mod-technology-001': 45,
      'mod-compliance-001': 20,
      'mod-facilities-001': 0,
      'mod-marketing-001': 0,
      'mod-geography-001': 0,
      'mod-staffing-001': 0,
      'mod-automation-001': 0,
    }
  };

  const mockBusinessHealthScore = {
    overall: 68,
    categories: {
      [AssessmentCategory.FINANCIAL]: 72,
      [AssessmentCategory.OPERATIONS]: 65,
      [AssessmentCategory.PATIENT_CARE]: 80,
      [AssessmentCategory.TECHNOLOGY]: 55,
      [AssessmentCategory.COMPLIANCE]: 70,
      [AssessmentCategory.FACILITIES]: 60,
      [AssessmentCategory.MARKETING]: 45,
      [AssessmentCategory.GEOGRAPHY]: 75,
      [AssessmentCategory.STAFFING]: 68,
      [AssessmentCategory.AUTOMATION]: 40,
    }
  };

  const mockRecommendations = [
    {
      id: 'rec-001',
      title: 'Implement online booking system',
      category: AssessmentCategory.TECHNOLOGY,
      priority: 9,
      description: 'Adding an online booking system could reduce administrative workload by 30% and improve patient satisfaction.',
      estimatedTimeframe: '1-2 months',
      estimatedCost: '$1,000-2,500',
      roi: 'High'
    },
    {
      id: 'rec-002',
      title: 'Review and update pricing strategy',
      category: AssessmentCategory.FINANCIAL,
      priority: 8,
      description: 'Current pricing is below market average. Implementing value-based pricing could increase revenue by 15-20%.',
      estimatedTimeframe: '2-4 weeks',
      estimatedCost: '$0-500',
      roi: 'Very High'
    },
    {
      id: 'rec-003',
      title: 'Develop standardized treatment protocols',
      category: AssessmentCategory.PATIENT_CARE,
      priority: 7,
      description: 'Standardized protocols can improve treatment consistency, outcomes tracking, and training efficiency.',
      estimatedTimeframe: '2-3 months',
      estimatedCost: '$500-1,500',
      roi: 'Medium'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Practice Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Business Health Score Card */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Business Health Score</CardTitle>
            <CardDescription>Your overall practice performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">{mockBusinessHealthScore.overall}</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * mockBusinessHealthScore.overall / 100)}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Last updated: April 6, 2025</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">View Detailed Report</Button>
          </CardFooter>
        </Card>

        {/* Assessment Progress Card */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Assessment Progress</CardTitle>
            <CardDescription>Complete all modules for a comprehensive analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-medium">{mockProgress.overall}%</span>
                </div>
                <Progress value={mockProgress.overall} className="h-2" />
              </div>

              {assessmentModules.slice(0, 5).map(module => (
                <div key={module.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{module.title}</span>
                    <span className="text-sm font-medium">{mockProgress.modules[module.id]}%</span>
                  </div>
                  <Progress value={mockProgress.modules[module.id]} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Continue Assessment</Button>
          </CardFooter>
        </Card>

        {/* Top Recommendations Card */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Top Recommendations</CardTitle>
            <CardDescription>Prioritized actions to improve your practice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecommendations.map(rec => (
                <div key={rec.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-medium">{rec.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">
                    Priority: {rec.priority}/10 • ROI: {rec.roi}
                  </p>
                  <p className="text-sm line-clamp-2">{rec.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">View All Recommendations</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Assessment Modules Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Assessment Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assessmentModules.map(module => (
            <Card key={module.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <span className="mr-2">{module.title}</span>
                  {mockProgress.modules[module.id] === 100 && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Completed</span>
                  )}
                </CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">{mockProgress.modules[module.id]}%</span>
                </div>
                <Progress value={mockProgress.modules[module.id]} className="h-2 mb-4" />
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-gray-100 px-2 py-1 rounded">{module.questionCount} questions</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">~{module.estimatedTimeMinutes} min</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={mockProgress.modules[module.id] > 0 ? "default" : "outline"}
                >
                  {mockProgress.modules[module.id] > 0 ? "Continue" : "Start"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Category Performance Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Category Performance</h2>
        <Tabs defaultValue="scores">
          <TabsList className="mb-4">
            <TabsTrigger value="scores">Scores</TabsTrigger>
            <TabsTrigger value="interconnections">Interconnections</TabsTrigger>
          </TabsList>
          <TabsContent value="scores">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(mockBusinessHealthScore.categories).map(([category, score]) => (
                <Card key={category}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{category.replace('_', ' ')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center mr-4">
                        <span className="text-2xl font-bold">{score}</span>
                      </div>
                      <div>
                        <p className="text-sm">
                          {score >= 80 ? 'Excellent' :
                            score >= 70 ? 'Good' :
                              score >= 60 ? 'Average' :
                                score >= 50 ? 'Fair' : 'Needs Improvement'}
                        </p>
                        <Progress value={score} className="h-2 w-32 mt-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="interconnections">
            <Card>
              <CardHeader>
                <CardTitle>Business Area Interconnections</CardTitle>
                <CardDescription>
                  Visualize how different areas of your practice influence each other
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center border rounded-md">
                  <p className="text-center text-gray-500">
                    Interconnection visualization will appear here after completing at least 3 assessment modules
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* SOP Generator Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">SOP Generator</h2>
        <Card>
          <CardHeader>
            <CardTitle>Standard Operating Procedures</CardTitle>
            <CardDescription>
              Generate customized SOPs based on your assessment results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Clinical SOPs</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  Treatment protocols, patient management, clinical documentation
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Generate</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Administrative SOPs</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  Scheduling, billing, patient onboarding, staff management
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Generate</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Compliance SOPs</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  Privacy procedures, regulatory compliance, risk management
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Generate</Button>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
