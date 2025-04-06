import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { QuestionType } from '@/lib/models/QuestionType';

export default function FinancialAssessment() {
  // Mock financial questions based on the structure from cursor-auto-rules-agile-workflow
  const mockQuestions = [
    {
      id: 'fin-price-001',
      text: 'What specific data points do you use to set your service prices?',
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { value: 'comprehensive', score: 5, text: 'Comprehensive analysis (costs, market rates, value, practitioner expertise, competitive positioning)' },
        { value: 'market_cost', score: 4, text: 'Market rates and cost analysis' },
        { value: 'market', score: 3, text: 'Primarily market rates' },
        { value: 'cost_plus', score: 2, text: 'Cost-plus markup only' },
        { value: 'arbitrary', score: 0, text: 'Arbitrary or historical pricing without recent analysis' }
      ],
      weight: 9,
      helpText: 'Pricing without comprehensive data leads to leaving money on the table or pricing yourself out of the market.',
      impactAreas: ['Revenue optimization', 'Competitive positioning', 'Profitability']
    },
    {
      id: 'fin-price-002',
      text: 'When was the last time you raised your prices, and by what percentage?',
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { value: 'recent_significant', score: 5, text: 'Within past year by 5% or more' },
        { value: 'recent_modest', score: 4, text: 'Within past year by less than 5%' },
        { value: 'over_year', score: 3, text: '1-2 years ago' },
        { value: 'over_two_years', score: 1, text: 'More than 2 years ago' },
        { value: 'never', score: 0, text: 'Never raised prices or don\'t know' }
      ],
      weight: 8,
      helpText: 'Failure to regularly adjust pricing leads to margin erosion as costs increase over time. Even small increases compound significantly.',
      impactAreas: ['Profit margins', 'Revenue growth', 'Business sustainability']
    },
    {
      id: 'fin-price-003',
      text: 'Do you offer discounts, and if so, what is your documented strategy for when and how they are applied?',
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { value: 'strategic', score: 5, text: 'Strategic discounting with documented rules, approval processes, and ROI tracking' },
        { value: 'documented', score: 3, text: 'Documented discount policies but limited tracking or analysis' },
        { value: 'informal', score: 2, text: 'Informal discounting at staff discretion' },
        { value: 'inconsistent', score: 1, text: 'Inconsistent discounting with no formal policy' },
        { value: 'none', score: 4, text: 'No discounts offered' }
      ],
      weight: 7,
      helpText: 'Uncontrolled discounting can rapidly erode margins and train clients to expect lower prices. Each 1% discount requires 3-4% volume increase to maintain profits.',
      impactAreas: ['Price integrity', 'Margin management', 'Value perception']
    },
    {
      id: 'fin-rev-001',
      text: 'How do you track and analyze your revenue streams?',
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { value: 'comprehensive', score: 5, text: 'Comprehensive tracking with regular analysis by service, practitioner, and referral source' },
        { value: 'basic_analysis', score: 4, text: 'Basic tracking with some analysis by major categories' },
        { value: 'tracking_only', score: 3, text: 'Track revenue but minimal analysis' },
        { value: 'minimal', score: 1, text: 'Minimal tracking of total revenue only' },
        { value: 'none', score: 0, text: 'No systematic tracking or analysis' }
      ],
      weight: 8,
      helpText: 'Detailed revenue tracking and analysis helps identify growth opportunities and potential issues before they become problems.',
      impactAreas: ['Revenue growth', 'Business intelligence', 'Strategic planning']
    },
    {
      id: 'fin-exp-001',
      text: 'How frequently do you review your practice expenses and look for cost-saving opportunities?',
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { value: 'monthly', score: 5, text: 'Monthly with systematic review process' },
        { value: 'quarterly', score: 4, text: 'Quarterly reviews' },
        { value: 'annually', score: 3, text: 'Annual reviews' },
        { value: 'occasionally', score: 2, text: 'Occasional reviews (no set schedule)' },
        { value: 'rarely', score: 0, text: 'Rarely or never review expenses systematically' }
      ],
      weight: 7,
      helpText: 'Regular expense reviews can identify unnecessary costs and improve profitability without affecting service quality.',
      impactAreas: ['Cost management', 'Profitability', 'Operational efficiency']
    }
  ];

  // Mock state for responses
  const [responses, setResponses] = React.useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  
  const handleResponseChange = (questionId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Financial Health Assessment</h1>
        <p className="text-gray-500 mt-2">
          Evaluate your practice's financial stability, profitability, and revenue management
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question card */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">Question {currentQuestionIndex + 1} of {mockQuestions.length}</CardTitle>
              <CardDescription>Financial Health • Pricing Strategy</CardDescription>
            </div>
            <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              Weight: {currentQuestion.weight}/10
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
          
          <RadioGroup 
            value={responses[currentQuestion.id] || ''} 
            onValueChange={(value) => handleResponseChange(currentQuestion.id, value)}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.value} className="flex items-start space-x-2 p-3 rounded-md border hover:border-blue-500 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={option.value} className="font-medium cursor-pointer">
                    {option.text}
                  </Label>
                </div>
                <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  Score: {option.score}
                </div>
              </div>
            ))}
          </RadioGroup>

          {currentQuestion.helpText && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <h4 className="font-medium text-blue-800 mb-1">Helpful Context</h4>
              <p className="text-sm text-blue-700">{currentQuestion.helpText}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={() => {}}
            >
              Save & Exit
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!responses[currentQuestion.id] || currentQuestionIndex === mockQuestions.length - 1}
            >
              {currentQuestionIndex === mockQuestions.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Impact areas */}
      <Card>
        <CardHeader>
          <CardTitle>Impact Areas</CardTitle>
          <CardDescription>
            This question affects the following areas of your practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {currentQuestion.impactAreas.map((area) => (
              <div key={area} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {area}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
