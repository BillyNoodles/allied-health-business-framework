import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Allied Health Business Assessment Tool</h1>
            <p className="text-xl mb-8">
              A comprehensive solution for physiotherapy practices to analyze business operations, identify improvement opportunities, and enhance practice performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/auth">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-500">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Assessment</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Evaluate all aspects of your practice with our weighted scoring system covering financial health, operations, patient care, compliance, technology, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Data-Driven Insights</CardTitle>
                <CardDescription>
                  Receive quantifiable metrics and benchmarks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Understand your practice's position relative to industry standards with concrete data and visualizations that highlight your strengths and opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Actionable Recommendations</CardTitle>
                <CardDescription>
                  Get prioritized, actionable recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Receive specific, implementable suggestions with guidance and expected ROI for each identified opportunity to improve your practice.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Business Health Score</CardTitle>
                <CardDescription>
                  Understand your overall business health
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get a concrete score and detailed breakdown across all business areas to track your progress and identify priorities for improvement.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Interconnectedness Analysis</CardTitle>
                <CardDescription>
                  Visualize practice area relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  See how different areas of your practice influence each other to make more informed decisions with cross-domain impact awareness.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Physiotherapy-Specific</CardTitle>
                <CardDescription>
                  Tailored for physiotherapy practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Benefit from assessment questions, benchmarks, metrics, and recommendations specifically designed for physiotherapy practices.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>SOP Generator</CardTitle>
                <CardDescription>
                  Create customized standard operating procedures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Generate tailored standard operating procedures based on your assessment results to standardize and improve your practice operations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our simple four-step process helps you understand and improve your practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-800 h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Create Account</h3>
              <p className="text-gray-600">
                Sign up and create your practice profile
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-800 h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Complete Assessment</h3>
              <p className="text-gray-600">
                Answer questions about your practice operations
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-800 h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Review Results</h3>
              <p className="text-gray-600">
                Get your business health score and detailed analysis
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-800 h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-2">Implement Changes</h3>
              <p className="text-gray-600">
                Follow recommendations to improve your practice
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to optimize your practice?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of physiotherapy practices that have improved their operations, increased profitability, and enhanced patient care.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/auth">Get Started Now</Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Allied Health Assessment</h3>
              <p className="text-gray-400">
                Comprehensive business assessment tools for allied health practices.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Comprehensive Assessment</li>
                <li>Business Health Score</li>
                <li>Actionable Recommendations</li>
                <li>SOP Generator</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Blog</li>
                <li>Case Studies</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Allied Health Business Assessment Tool. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
