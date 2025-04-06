import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AssessmentForm from '@/app/assessment/financial/page';

// Mock the useState hook
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useState: vi.fn().mockImplementation(actual.useState),
  };
});

describe('AssessmentForm', () => {
  it('renders the financial health assessment title', () => {
    render(<AssessmentForm />);
    
    expect(screen.getByText('Financial Health Assessment')).toBeInTheDocument();
  });

  it('displays the first question by default', () => {
    render(<AssessmentForm />);
    
    expect(screen.getByText("What is your practice's current operating margin?")).toBeInTheDocument();
    expect(screen.getByText('Benchmark: Operating Margin: 15-25% (size dependent)')).toBeInTheDocument();
  });

  it('shows the progress indicator', () => {
    render(<AssessmentForm />);
    
    expect(screen.getByText('Question 1 of 7')).toBeInTheDocument();
  });

  it('has a disabled previous button on the first question', () => {
    render(<AssessmentForm />);
    
    const previousButton = screen.getByRole('button', { name: 'Previous' });
    expect(previousButton).toBeDisabled();
  });

  it('has an enabled next button on the first question', () => {
    render(<AssessmentForm />);
    
    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).not.toBeDisabled();
  });

  it('allows users to enter a numeric answer', () => {
    render(<AssessmentForm />);
    
    const input = screen.getByPlaceholderText('Enter a number');
    fireEvent.change(input, { target: { value: '20' } });
    
    expect(input.value).toBe('20');
  });

  it('moves to the next question when next button is clicked', () => {
    render(<AssessmentForm />);
    
    const nextButton = screen.getByRole('button', { name: 'Next' });
    fireEvent.click(nextButton);
    
    expect(screen.getByText('What is your average revenue per provider?')).toBeInTheDocument();
    expect(screen.getByText('Benchmark: Revenue/Provider: $135-150K')).toBeInTheDocument();
    expect(screen.getByText('Question 2 of 7')).toBeInTheDocument();
  });
});
