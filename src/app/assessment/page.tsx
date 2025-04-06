import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { assessmentModules } from '@/lib/data/modules';
import { AssessmentCategory } from '@/lib/models/AssessmentCategory';

export default function AssessmentPage() {
  // Mock data for assessment progress
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

  // Group modules by category for the tabbed interface
  const modulesByCategory = assessmentModules.reduce((acc, module) => {
    const category = module.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(module);
    return acc;
  }, {} as Record<string, typeof assessmentModules>);

  // Get unique categories for tabs
  const categories = Object.keys(modulesByCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Assessment Modules</h1>
        <p className="text-gray-500 mt-2">
          Complete all modules to receive a comprehensive analysis of your practice
        </p>
      </div>

      {/* Overall progress */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle>Overall Assessment Progress</CardTitle>
          <CardDescription>
            Your progress across all assessment modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{mockProgress.overall}%</span>
          </div>
          <Progress value={mockProgress.overall} className="h-2 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-gray-500">Modules</p>
              <p className="text-xl font-bold">{assessmentModules.length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-bold">{Object.values(mockProgress.modules).filter(p => p === 100).length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-xl font-bold">{Object.values(mockProgress.modules).filter(p => p > 0 && p < 100).length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-gray-500">Not Started</p>
              <p className="text-xl font-bold">{Object.values(mockProgress.modules).filter(p => p === 0).length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules by category */}
      <Tabs defaultValue={categories[0]} className="mb-8">
        <TabsList className="mb-4 flex flex-wrap h-auto">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="mb-1">
              {category.replace('_', ' ')}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modulesByCategory[category].map(module => (
                <Card key={module.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          <span className="mr-2">{module.title}</span>
                          {mockProgress.modules[module.id] === 100 && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Completed</span>
                          )}
                        </CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                      <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {module.questionCount} questions
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">{mockProgress.modules[module.id]}%</span>
                    </div>
                    <Progress value={mockProgress.modules[module.id]} className="h-2 mb-4" />
                    
                    <div className="text-sm">
                      <h4 className="font-medium mb-1">Impact Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {module.impactAreas.map(area => (
                          <span key={area} className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-gray-500">
                      ~{module.estimatedTimeMinutes} min to complete
                    </div>
                    <Button 
                      variant={mockProgress.modules[module.id] > 0 ? "default" : "outline"}
                    >
                      {mockProgress.modules[module.id] > 0 ? "Continue" : "Start"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Assessment tips */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Tips</CardTitle>
          <CardDescription>
            Get the most out of your practice assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="bg-blue-100 text-blue-800 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium">Complete modules in any order</h3>
                <p className="text-sm text-gray-500">
                  Focus on the areas most relevant to your current business challenges.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-blue-100 text-blue-800 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium">Save and continue later</h3>
                <p className="text-sm text-gray-500">
                  Your progress is automatically saved. Return anytime to continue.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-blue-100 text-blue-800 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium">Answer honestly for accurate results</h3>
                <p className="text-sm text-gray-500">
                  The assessment is most valuable when your answers reflect your actual practices.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-blue-100 text-blue-800 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-medium">Review your results regularly</h3>
                <p className="text-sm text-gray-500">
                  Reassess every 3-6 months to track your progress and identify new opportunities.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
