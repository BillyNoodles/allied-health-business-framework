import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DisciplineType } from '@/lib/models/DisciplineType';
import { PracticeSize } from '@/lib/models/PracticeSize';
import { Country } from '@/lib/models/Country';

export default function OnboardingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to Allied Health Business Assessment</h1>
        <p className="text-gray-500 mt-2">
          Let's set up your practice profile to customize your assessment experience
        </p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Practice Profile Setup</CardTitle>
          <CardDescription>
            This information helps us tailor the assessment to your specific practice needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Practice Details</TabsTrigger>
              <TabsTrigger value="specialties">Specialties</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4 pt-4">
              <div>
                <Label htmlFor="practice-name">Practice Name</Label>
                <Input id="practice-name" placeholder="Enter your practice name" className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="discipline-type">Primary Discipline</Label>
                <Select>
                  <SelectTrigger id="discipline-type" className="mt-1">
                    <SelectValue placeholder="Select your primary discipline" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(DisciplineType).map((discipline) => (
                      <SelectItem key={discipline} value={discipline}>
                        {discipline.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="practice-size">Practice Size</Label>
                  <Select>
                    <SelectTrigger id="practice-size" className="mt-1">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(PracticeSize).map((size) => (
                        <SelectItem key={size} value={size}>
                          {size.charAt(0) + size.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="years-operation">Years in Operation</Label>
                  <Input id="years-operation" type="number" min="0" placeholder="e.g., 5" className="mt-1" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger id="country" className="mt-1">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Country).map((country) => (
                        <SelectItem key={country} value={country}>
                          {country === 'US' ? 'United States' : 
                           country === 'UK' ? 'United Kingdom' : 
                           country === 'CA' ? 'Canada' : 
                           country === 'AU' ? 'Australia' : 
                           country === 'NZ' ? 'New Zealand' : 'Other'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" placeholder="e.g., California" className="mt-1" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="e.g., San Francisco" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input id="postal-code" placeholder="e.g., 94103" className="mt-1" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weekly-patients">Weekly Patient Volume</Label>
                  <Input id="weekly-patients" type="number" min="0" placeholder="e.g., 50" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="staff-count">Total Staff Count</Label>
                  <Input id="staff-count" type="number" min="0" placeholder="e.g., 8" className="mt-1" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specialties" className="space-y-4 pt-4">
              <div>
                <Label className="mb-2 block">Practice Specialties</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    'Orthopedics', 'Sports Rehabilitation', 'Pediatrics', 
                    'Geriatrics', 'Neurology', 'Women\'s Health',
                    'Manual Therapy', 'Vestibular Rehabilitation', 'Pain Management',
                    'Post-Surgical Rehabilitation', 'Workplace Injuries', 'Chronic Conditions'
                  ].map((specialty, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input type="checkbox" id={`specialty-${index}`} className="h-4 w-4" />
                      <Label htmlFor={`specialty-${index}`} className="text-sm cursor-pointer">
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="other-specialties">Other Specialties</Label>
                <Input id="other-specialties" placeholder="Enter any other specialties" className="mt-1" />
              </div>
              
              <div>
                <Label htmlFor="assessment-goals">Assessment Goals</Label>
                <textarea 
                  id="assessment-goals" 
                  className="w-full min-h-[100px] p-2 border rounded-md mt-1"
                  placeholder="What specific areas of your practice are you looking to improve?"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save for Later</Button>
          <Button>Complete Profile & Start Assessment</Button>
        </CardFooter>
      </Card>

      <div className="mt-8 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Why Complete Your Profile?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Personalized Assessment</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              Your profile information helps us tailor questions to your specific practice type and size.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Relevant Benchmarks</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              Compare your results with similar practices in your specialty and region.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Targeted Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              Receive actionable recommendations specific to your practice characteristics.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
