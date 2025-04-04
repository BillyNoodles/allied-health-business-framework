'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

export default function ResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [results, setResults] = useState({
    overallScore: 74,
    categoryScores: {
      financial: 72,
      compliance: 85,
      patientCare: 78,
      operations: 63,
      technology: 68,
      facilities: 70,
      marketing: 65,
      geographic: 72
    },
    healthStatus: 'Strong',
    recommendations: [
      {
        id: 1,
        category: 'OPERATIONS',
        title: 'Optimize Patient Scheduling',
        description: 'Implement a more efficient scheduling system to reduce wait times and improve patient flow.',
        impact: 'HIGH',
        effort: 'MEDIUM',
        timeframe: 'SHORT_TERM',
        steps: [
          'Analyze current scheduling patterns',
          'Identify bottlenecks in patient flow',
          'Research scheduling optimization tools',
          'Implement new scheduling protocols'
        ],
        crossDomainImpacts: [
          { area: 'FINANCIAL', score: 8, statement: 'Improved scheduling will increase throughput and revenue' },
          { area: 'PATIENT_CARE', score: 7, statement: 'Reduced wait times will improve patient satisfaction' }
        ]
      },
      {
        id: 2,
        category: 'FINANCIAL',
        title: 'Improve Collection Rate',
        description: 'Implement processes to increase collection rate from current 92% to benchmark of 95%.',
        impact: 'HIGH',
        effort: 'MEDIUM',
        timeframe: 'IMMEDIATE',
        steps: [
          'Review current billing procedures',
          'Identify accounts with outstanding balances',
          'Implement automated payment reminders',
          'Train staff on collection best practices'
        ],
        crossDomainImpacts: [
          { area: 'OPERATIONS', score: 6, statement: 'Improved collections will streamline administrative processes' }
        ]
      },
      {
        id: 3,
        category: 'TECHNOLOGY',
        title: 'Increase Online Booking Adoption',
        description: 'Boost online booking usage from current 20% to benchmark of 30%.',
        impact: 'MEDIUM',
        effort: 'LOW',
        timeframe: 'SHORT_TERM',
        steps: [
          'Enhance online booking visibility on website',
          'Train staff to promote online booking',
          'Implement incentives for online booking',
          'Send follow-up reminders via online system'
        ],
        crossDomainImpacts: [
          { area: 'OPERATIONS', score: 7, statement: 'Reduced phone bookings will free up staff time' },
          { area: 'PATIENT_CARE', score: 5, statement: 'Convenient booking options improve patient experience' }
        ]
      }
    ],
    interconnectedness: [
      { source: 'FINANCIAL', target: 'OPERATIONS', strength: 0.81 },
      { source: 'PATIENT_CARE', target: 'FINANCIAL', strength: 0.88 },
      { source: 'COMPLIANCE', target: 'FINANCIAL', strength: 0.85 },
      { source: 'TECHNOLOGY', target: 'OPERATIONS', strength: 0.67 }
    ]
  });

  useEffect(() => {
    // In a real implementation, we would fetch results from Supabase
    // For MVP, we'll use mock data
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="container mx-auto py-10">Loading results...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Assessment Results</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Business Health Score</CardTitle>
          <CardDescription>
            Your overall business health score and category breakdown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-lg font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                  {results.healthStatus}
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold inline-block text-green-600">
                  {results.overallScore}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-green-200">
              <div 
                style={{ width: `${results.overallScore}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
              ></div>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Financial Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{results.categoryScores.financial}%</div>
                <Progress value={results.categoryScores.financial} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{results.categoryScores.compliance}%</div>
                <Progress value={results.categoryScores.compliance} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Patient Care</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{results.categoryScores.patientCare}%</div>
                <Progress value={results.categoryScores.patientCare} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{results.categoryScores.operations}%</div>
                <Progress value={results.categoryScores.operations} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="interconnectedness">Interconnectedness</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Prioritized Recommendations</CardTitle>
              <CardDescription>
                Based on your assessment results, here are your top recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {results.recommendations.map((rec) => (
                  <Card key={rec.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{rec.title}</CardTitle>
                          <CardDescription>{rec.category.replace('_', ' ')}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-100 text-blue-600">
                            {rec.impact}
                          </span>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-yellow-100 text-yellow-600">
                            {rec.effort}
                          </span>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-purple-100 text-purple-600">
                            {rec.timeframe.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{rec.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Implementation Steps:</h4>
                        <ol className="list-decimal list-inside space-y-1">
                          {rec.steps.map((step, index) => (
                            <li key={index} className="text-sm">{step}</li>
                          ))}
                        </ol>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Cross-Domain Impacts:</h4>
                        <div className="space-y-2">
                          {rec.crossDomainImpacts.map((impact, index) => (
                            <div key={index} className="flex items-center">
                              <div className="w-24 text-xs font-medium">{impact.area.replace('_', ' ')}</div>
                              <div className="w-12 text-xs font-medium">{impact.score}/10</div>
                              <div className="flex-1 text-xs">{impact.statement}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Track Implementation
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="interconnectedness">
          <Card>
            <CardHeader>
              <CardTitle>Business Area Interconnectedness</CardTitle>
              <CardDescription>
                How different areas of your practice influence each other
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded-md p-4 mb-4">
                <p className="text-center text-gray-500">
                  Interconnectedness visualization will be displayed here.<br />
                  (D3.js network diagram implementation)
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Key Relationships</h3>
                
                <div className="space-y-2">
                  {results.interconnectedness.map((rel, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="font-medium">{rel.source.replace('_', ' ')}</div>
                        <div className="mx-2">→</div>
                        <div className="font-medium">{rel.target.replace('_', ' ')}</div>
                      </div>
                      <div className="text-sm">
                        Strength: <span className="font-medium">{rel.strength.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-sm text-gray-600">
                  Understanding these relationships helps you make more informed decisions by seeing how changes in one area affect others.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="benchmarks">
          <Card>
            <CardHeader>
              <CardTitle>Industry Benchmarks</CardTitle>
              <CardDescription>
                How your practice compares to industry standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Financial Benchmarks</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-2 text-left">Metric</th>
                          <th className="border p-2 text-left">Your Practice</th>
                          <th className="border p-2 text-left">Benchmark</th>
                          <th className="border p-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-2">Operating Margin</td>
                          <td className="border p-2">18%</td>
                          <td className="border p-2">15-25%</td>
                          <td className="border p-2">
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-100 text-green-600">
                              Meeting
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="border p-2">Revenue/Provider</td>
                          <td className="border p-2">$125K</td>
                          <td className="border p-2">$135-150K</td>
                          <td className="border p-2">
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-yellow-100 text-yellow-600">
                              Below
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="border p-2">Collection Rate</td>
                          <td className="border p-2">92%</td>
                          <td className="border p-2">≥95%</td>
                          <td className="border p-2">
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-yellow-100 text-yellow-600">
                              Below
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="border p-2">Days in AR</td>
                          <td className="border p-2">35</td>
                          <td className="border p-2">≤30</td>
                          <td className="border p-2">
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-yellow-100 text-yellow-600">
                              Below
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Operational Benchmarks</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-2 text-left">Metric</th>
                          <th className="border p-2 text-left">Your Practice</th>
                          <th className="border p-2 text-left">Benchmark</th>
                          <th className="border p-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-2">Patient Throughput</td>
                          <td className="border p-2">7/day</td>
                          <td className="border p-2">8-12/day</td>
                          <td className="border p-2">
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-yellow-100 text-yellow-600">
                              Below
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="border p-2">No-show Rate</td>
                          <td className="border p-2">12%</td>
                          <td className="border p-2">≤10%</td>
                          <td className="border p-2">
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-yellow-100 text-yellow-600">
                              Below
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="border p-2">Rebooking Rate</td>
                          <td className="border p-2">78%</td>
                          <td className="border p-2">≥75%</td>
                          <td className="border p-2">
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-100 text-green-600">
                              Meeting
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="border p-2">Documentation Time</td>
                          <td className="border p-2">12 min</td>
                          <td className="border p-2">≤15 min</td>
                          <td className="border p-2">
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-100 text-green-600">
                              Meeting
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
