import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResultsPage from '@/app/results/page';

// Mock the useRouter hook
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock the useState and useEffect hooks
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useState: vi.fn().mockImplementation(actual.useState),
    useEffect: vi.fn().mockImplementation((cb) => cb()),
  };
});

describe('ResultsPage', () => {
  it('renders the assessment results title', () => {
    render(<ResultsPage />);
    
    expect(screen.getByText('Assessment Results')).toBeInTheDocument();
  });

  it('displays the business health score', () => {
    render(<ResultsPage />);
    
    expect(screen.getByText('Business Health Score')).toBeInTheDocument();
    expect(screen.getByText('Strong')).toBeInTheDocument();
    expect(screen.getByText('74%')).toBeInTheDocument();
  });

  it('shows the category scores', () => {
    render(<ResultsPage />);
    
    expect(screen.getByText('Financial Health')).toBeInTheDocument();
    expect(screen.getByText('72%')).toBeInTheDocument();
    expect(screen.getByText('Compliance')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('Patient Care')).toBeInTheDocument();
    expect(screen.getByText('78%')).toBeInTheDocument();
    expect(screen.getByText('Operations')).toBeInTheDocument();
    expect(screen.getByText('63%')).toBeInTheDocument();
  });

  it('has tabs for different result views', () => {
    render(<ResultsPage />);
    
    expect(screen.getByRole('tab', { name: 'Recommendations' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Interconnectedness' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Benchmarks' })).toBeInTheDocument();
  });

  it('shows recommendations by default', () => {
    render(<ResultsPage />);
    
    expect(screen.getByText('Prioritized Recommendations')).toBeInTheDocument();
    expect(screen.getByText('Optimize Patient Scheduling')).toBeInTheDocument();
    expect(screen.getByText('Improve Collection Rate')).toBeInTheDocument();
    expect(screen.getByText('Increase Online Booking Adoption')).toBeInTheDocument();
  });

  it('switches to interconnectedness tab when clicked', () => {
    render(<ResultsPage />);
    
    const interconnectednessTab = screen.getByRole('tab', { name: 'Interconnectedness' });
    fireEvent.click(interconnectednessTab);
    
    expect(screen.getByText('Business Area Interconnectedness')).toBeInTheDocument();
    expect(screen.getByText('How different areas of your practice influence each other')).toBeInTheDocument();
    expect(screen.getByText('Key Relationships')).toBeInTheDocument();
  });

  it('switches to benchmarks tab when clicked', () => {
    render(<ResultsPage />);
    
    const benchmarksTab = screen.getByRole('tab', { name: 'Benchmarks' });
    fireEvent.click(benchmarksTab);
    
    expect(screen.getByText('Industry Benchmarks')).toBeInTheDocument();
    expect(screen.getByText('How your practice compares to industry standards')).toBeInTheDocument();
    expect(screen.getByText('Financial Benchmarks')).toBeInTheDocument();
    expect(screen.getByText('Operational Benchmarks')).toBeInTheDocument();
  });
});
