import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { SOPType } from '@/lib/models/SOPType';

export default function SOPGeneratorPage() {
  // Mock SOP types and templates
  const sopTypes = [
    {
      id: SOPType.CLINICAL,
      title: 'Clinical SOPs',
      description: 'Treatment protocols, patient management, clinical documentation',
      templates: [
        { id: 'tmpl-001', title: 'Initial Assessment Protocol', category: SOPType.CLINICAL },
        { id: 'tmpl-002', title: 'Treatment Documentation Guidelines', category: SOPType.CLINICAL },
        { id: 'tmpl-003', title: 'Patient Progress Tracking', category: SOPType.CLINICAL },
        { id: 'tmpl-004', title: 'Discharge Planning Process', category: SOPType.CLINICAL },
      ]
    },
    {
      id: SOPType.ADMINISTRATIVE,
      title: 'Administrative SOPs',
      description: 'Scheduling, billing, patient onboarding, staff management',
      templates: [
        { id: 'tmpl-005', title: 'Patient Scheduling Process', category: SOPType.ADMINISTRATIVE },
        { id: 'tmpl-006', title: 'Insurance Verification Procedure', category: SOPType.ADMINISTRATIVE },
        { id: 'tmpl-007', title: 'New Patient Onboarding', category: SOPType.ADMINISTRATIVE },
        { id: 'tmpl-008', title: 'Staff Meeting Protocol', category: SOPType.ADMINISTRATIVE },
      ]
    },
    {
      id: SOPType.COMPLIANCE,
      title: 'Compliance SOPs',
      description: 'Privacy procedures, regulatory compliance, risk management',
      templates: [
        { id: 'tmpl-009', title: 'HIPAA Compliance Procedures', category: SOPType.COMPLIANCE },
        { id: 'tmpl-010', title: 'Incident Reporting Protocol', category: SOPType.COMPLIANCE },
        { id: 'tmpl-011', title: 'Medical Records Management', category: SOPType.COMPLIANCE },
        { id: 'tmpl-012', title: 'Safety Inspection Checklist', category: SOPType.COMPLIANCE },
      ]
    },
    {
      id: SOPType.FINANCIAL,
      title: 'Financial SOPs',
      description: 'Billing procedures, payment processing, financial reporting',
      templates: [
        { id: 'tmpl-013', title: 'Billing and Coding Procedure', category: SOPType.FINANCIAL },
        { id: 'tmpl-014', title: 'Payment Collection Process', category: SOPType.FINANCIAL },
        { id: 'tmpl-015', title: 'Financial Reporting Schedule', category: SOPType.FINANCIAL },
        { id: 'tmpl-016', title: 'Expense Approval Workflow', category: SOPType.FINANCIAL },
      ]
    },
  ];

  // Mock generated SOPs
  const mockGeneratedSOPs = [
    {
      id: 'sop-001',
      title: 'New Patient Onboarding Process',
      type: SOPType.ADMINISTRATIVE,
      createdAt: '2025-04-01T10:30:00Z',
      status: 'published'
    },
    {
      id: 'sop-002',
      title: 'Treatment Documentation Guidelines',
      type: SOPType.CLINICAL,
      createdAt: '2025-03-28T14:15:00Z',
      status: 'published'
    },
    {
      id: 'sop-003',
      title: 'HIPAA Compliance Procedures',
      type: SOPType.COMPLIANCE,
      createdAt: '2025-03-25T09:45:00Z',
      status: 'published'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">SOP Generator</h1>
        <p className="text-gray-500 mt-2">
          Create customized standard operating procedures based on your assessment results
        </p>
      </div>

      <Tabs defaultValue="generate" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="generate">Generate New SOP</TabsTrigger>
          <TabsTrigger value="library">SOP Library</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>Generate a New SOP</CardTitle>
              <CardDescription>
                Select a template and customize it to your practice needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="sop-title">SOP Title</Label>
                  <Input id="sop-title" placeholder="Enter a title for your SOP" className="mt-1" />
                </div>
                
                <div>
                  <Label>SOP Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                    {sopTypes.map((type) => (
                      <Card key={type.id} className="cursor-pointer hover:border-blue-500 transition-colors">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{type.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          {type.description}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Select a Template</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {sopTypes[0].templates.map((template) => (
                      <div key={template.id} className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:border-blue-500 transition-colors">
                        <input type="radio" id={template.id} name="template" className="h-4 w-4 text-blue-600" />
                        <Label htmlFor={template.id} className="cursor-pointer">{template.title}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Customization Options</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="practice-name" className="text-sm">Practice Name</Label>
                      <Input id="practice-name" placeholder="Your practice name" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="practice-type" className="text-sm">Practice Type</Label>
                      <Input id="practice-type" placeholder="e.g., Physiotherapy" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="staff-roles" className="text-sm">Staff Roles to Include</Label>
                      <Input id="staff-roles" placeholder="e.g., Therapists, Admin Staff" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="compliance-reqs" className="text-sm">Compliance Requirements</Label>
                      <Input id="compliance-reqs" placeholder="e.g., HIPAA, State Regulations" className="mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Preview</Button>
              <Button>Generate SOP</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="library">
          <Card>
            <CardHeader>
              <CardTitle>Your SOP Library</CardTitle>
              <CardDescription>
                Access and manage your generated SOPs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockGeneratedSOPs.length > 0 ? (
                  mockGeneratedSOPs.map((sop) => (
                    <div key={sop.id} className="flex justify-between items-center border-b pb-4">
                      <div>
                        <h3 className="font-medium">{sop.title}</h3>
                        <p className="text-sm text-gray-500">
                          {sop.type} • Created on {new Date(sop.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't generated any SOPs yet</p>
                    <Button variant="outline">Generate Your First SOP</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* SOP Benefits Section */}
      <Card>
        <CardHeader>
          <CardTitle>Benefits of Standardized Operating Procedures</CardTitle>
          <CardDescription>
            How SOPs can improve your practice efficiency and quality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Consistency</h3>
              <p className="text-sm">
                Ensure all staff follow the same processes, reducing errors and improving service quality.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Efficiency</h3>
              <p className="text-sm">
                Streamline workflows and reduce time spent on routine tasks through clear documentation.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Training</h3>
              <p className="text-sm">
                Simplify onboarding and training of new staff with documented procedures and expectations.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Compliance</h3>
              <p className="text-sm">
                Maintain regulatory compliance by documenting required processes and responsibilities.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Quality Control</h3>
              <p className="text-sm">
                Establish standards for quality and create a framework for continuous improvement.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Risk Management</h3>
              <p className="text-sm">
                Reduce liability and risk by ensuring proper procedures are documented and followed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
