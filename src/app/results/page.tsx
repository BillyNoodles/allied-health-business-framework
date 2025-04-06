import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScorePosition } from '@/lib/models/ScorePosition';
import { AssessmentCategory } from '@/lib/models/AssessmentCategory';

export default function ResultsPage() {
  // Mock data for business health score
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
    },
    strengths: [
      'Patient care protocols and outcomes tracking',
      'Financial record keeping and reporting',
      'Geographic market positioning',
      'Compliance with regulatory requirements'
    ],
    weaknesses: [
      'Marketing strategy and execution',
      'Technology adoption and integration',
      'Process automation',
      'Facilities utilization'
    ],
    benchmarks: {
      industry: 65,
      similar_size: 62,
      top_performers: 85
    }
  };

  // Mock recommendations data
  const mockRecommendations = [
    {
      id: 'rec-001',
      title: 'Implement online booking system',
      category: AssessmentCategory.TECHNOLOGY,
      priority: 9,
      description: 'Adding an online booking system could reduce administrative workload by 30% and improve patient satisfaction.',
      impactAreas: ['Operational Efficiency', 'Patient Experience', 'Staff Productivity'],
      implementationSteps: [
        'Research booking systems compatible with your practice management software',
        'Select a system with patient self-scheduling capabilities',
        'Integrate with your website and existing systems',
        'Train staff on new workflow',
        'Communicate change to patients'
      ],
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
      impactAreas: ['Revenue Growth', 'Profit Margins', 'Business Sustainability'],
      implementationSteps: [
        'Conduct market analysis of competitor pricing',
        'Analyze your cost structure for each service',
        'Develop tiered pricing based on practitioner experience',
        'Create communication plan for existing patients',
        'Update all pricing materials and systems'
      ],
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
      impactAreas: ['Clinical Outcomes', 'Quality of Care', 'Staff Training'],
      implementationSteps: [
        'Review current best practices and evidence-based guidelines',
        'Document protocols for most common conditions',
        'Create documentation templates in your EMR',
        'Train all practitioners on protocols',
        'Implement regular review process'
      ],
      estimatedTimeframe: '2-3 months',
      estimatedCost: '$500-1,500',
      roi: 'Medium'
    },
    {
      id: 'rec-004',
      title: 'Implement automated appointment reminders',
      category: AssessmentCategory.AUTOMATION,
      priority: 7,
      description: 'Automated reminders can reduce no-shows by up to 30% and free up staff time currently spent on manual calls.',
      impactAreas: ['Operational Efficiency', 'Revenue Protection', 'Staff Productivity'],
      implementationSteps: [
        'Select SMS/email reminder system',
        'Configure reminder timing and frequency',
        'Create message templates',
        'Test with sample patients',
        'Monitor no-show rates after implementation'
      ],
      estimatedTimeframe: '2-4 weeks',
      estimatedCost: '$500-1,200/year',
      roi: 'High'
    },
    {
      id: 'rec-005',
      title: 'Develop targeted marketing campaign',
      category: AssessmentCategory.MARKETING,
      priority: 6,
      description: 'Your practice\'s marketing efforts need focus. A targeted campaign could increase new patient acquisition by 25%.',
      impactAreas: ['Patient Acquisition', 'Revenue Growth', 'Brand Awareness'],
      implementationSteps: [
        'Define target patient demographics',
        'Develop messaging focused on your strengths',
        'Create content for digital and print channels',
        'Implement tracking for campaign performance',
        'Adjust based on results'
      ],
      estimatedTimeframe: '1-3 months',
      estimatedCost: '$2,000-5,000',
      roi: 'Medium-High'
    }
  ];

  // Helper function to get score position label
  const getScorePositionLabel = (score: number): ScorePosition => {
    if (score >= 80) return ScorePosition.EXCELLENT;
    if (score >= 70) return ScorePosition.GOOD;
    if (score >= 60) return ScorePosition.AVERAGE;
    if (score >= 50) return ScorePosition.POOR;
    return ScorePosition.CRITICAL;
  };

  // Helper function to get color based on score
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 70) return 'bg-green-400';
    if (score >= 60) return 'bg-yellow-400';
    if (score >= 50) return 'bg-orange-400';
    return 'bg-red-500';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Assessment Results</h1>
        <p className="text-gray-500 mt-2">
          Your comprehensive business health analysis and recommendations
        </p>
      </div>

      {/* Business Health Score Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Business Health Score</CardTitle>
          <CardDescription>
            Your overall practice performance compared to industry benchmarks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 mb-4">
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-4xl font-bold">{mockBusinessHealthScore.overall}</span>
                  <span className="text-sm font-medium">
                    {getScorePositionLabel(mockBusinessHealthScore.overall)}
                  </span>
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
                    stroke={getScoreColor(mockBusinessHealthScore.overall).replace('bg-', 'text-')} 
                    strokeWidth="10" 
                    strokeDasharray="283" 
                    strokeDashoffset={283 - (283 * mockBusinessHealthScore.overall / 100)} 
                    transform="rotate(-90 50 50)" 
                  />
                </svg>
              </div>
              <p className="text-center text-sm text-gray-500">Your Overall Score</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Benchmark Comparison</h3>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Industry Average</span>
                  <span className="text-sm font-medium">{mockBusinessHealthScore.benchmarks.industry}</span>
                </div>
                <Progress value={mockBusinessHealthScore.benchmarks.industry} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Similar Size Practices</span>
                  <span className="text-sm font-medium">{mockBusinessHealthScore.benchmarks.similar_size}</span>
                </div>
                <Progress value={mockBusinessHealthScore.benchmarks.similar_size} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Top Performers</span>
                  <span className="text-sm font-medium">{mockBusinessHealthScore.benchmarks.top_performers}</span>
                </div>
                <Progress value={mockBusinessHealthScore.benchmarks.top_performers} className="h-2" />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Strengths</h3>
                <ul className="space-y-1">
                  {mockBusinessHealthScore.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Areas for Improvement</h3>
                <ul className="space-y-1">
                  {mockBusinessHealthScore.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Scores */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
          <CardDescription>
            Detailed breakdown of your performance across business areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(mockBusinessHealthScore.categories).map(([category, score]) => (
              <div key={category} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{category.replace('_', ' ')}</h3>
                  <div className={`${getScoreColor(score)} text-white text-sm px-2 py-1 rounded`}>
                    {score}
                  </div>
                </div>
                <Progress value={score} className="h-2 mb-2" />
                <p className="text-sm text-gray-500">
                  {getScorePositionLabel(score)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prioritized Recommendations */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Prioritized Recommendations</CardTitle>
          <CardDescription>
            Actionable steps to improve your practice performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockRecommendations.map((rec) => (
              <Card key={rec.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                      <CardDescription>{rec.category.replace('_', ' ')}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        Priority: {rec.priority}/10
                      </div>
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        ROI: {rec.roi}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{rec.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Impact Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {rec.impactAreas.map((area, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Implementation Steps:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      {rec.implementationSteps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Estimated Timeframe:</span> {rec.estimatedTimeframe}
                    </div>
                    <div>
                      <span className="font-medium">Estimated Cost:</span> {rec.estimatedCost}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Generate Implementation Plan</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">View All Recommendations</Button>
        </CardFooter>
      </Card>

      {/* Interconnectedness Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Interconnectedness Analysis</CardTitle>
          <CardDescription>
            Visualize how different areas of your practice influence each other
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center border rounded-md">
            <div className="text-center">
              <p className="text-gray-500 mb-4">
                Complete at least 5 assessment modules to unlock the interconnectedness analysis
              </p>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
