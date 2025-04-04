'use client';

import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';

export default function AssessmentForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const form = useForm();
  
  // Example questions for the Financial Health module
  const questions = [
    {
      id: 'operating-margin',
      text: 'What is your practice\'s current operating margin?',
      type: 'NUMERIC',
      options: null,
      weight: 1.5,
      benchmarkReference: 'Operating Margin: 15-25% (size dependent)',
    },
    {
      id: 'revenue-per-provider',
      text: 'What is your average revenue per provider?',
      type: 'NUMERIC',
      options: null,
      weight: 1.2,
      benchmarkReference: 'Revenue/Provider: $135-150K',
    },
    {
      id: 'collection-rate',
      text: 'What is your current collection rate?',
      type: 'NUMERIC',
      options: null,
      weight: 1.0,
      benchmarkReference: 'Collection Rate: ≥95%',
    },
    {
      id: 'days-in-ar',
      text: 'How many days on average does it take to collect accounts receivable?',
      type: 'NUMERIC',
      options: null,
      weight: 1.0,
      benchmarkReference: 'Days in AR: ≤30',
    },
    {
      id: 'cash-reserve',
      text: 'How many months of cash reserve does your practice maintain?',
      type: 'NUMERIC',
      options: null,
      weight: 1.0,
      benchmarkReference: 'Cash Reserve: 3-6 months',
    },
    {
      id: 'fee-per-visit',
      text: 'What is your average fee per visit?',
      type: 'NUMERIC',
      options: null,
      weight: 0.8,
      benchmarkReference: 'Fee/Visit: $65-80',
    },
    {
      id: 'financial-challenges',
      text: 'What are your practice\'s biggest financial challenges?',
      type: 'MULTIPLE_CHOICE',
      options: [
        'Cash flow management',
        'Insurance reimbursement rates',
        'Operating expenses',
        'Debt management',
        'Revenue growth',
        'Staff compensation',
        'Other'
      ],
      weight: 0.5,
      benchmarkReference: null,
    },
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  const currentQ = questions[currentQuestion] || questions[0];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Financial Health Assessment</h1>
      
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${(currentQuestion / (questions.length - 1)) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{currentQ.text}</CardTitle>
          {currentQ.benchmarkReference && (
            <CardDescription>
              Benchmark: {currentQ.benchmarkReference}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <FormField
              name={currentQ.id}
              render={() => (
                <FormItem>
                  <FormControl>
                    {currentQ.type === 'NUMERIC' ? (
                      <Input 
                        type="number" 
                        placeholder="Enter a number" 
                        value={answers[currentQ.id] || ''}
                        onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                      />
                    ) : currentQ.type === 'MULTIPLE_CHOICE' && currentQ.options ? (
                      <Select 
                        value={answers[currentQ.id] || ''}
                        onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {currentQ.options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input 
                        type="text" 
                        placeholder="Enter your answer" 
                        value={answers[currentQ.id] || ''}
                        onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
