import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePage from '@/app/page';

// Mock the useState and useEffect hooks
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useState: vi.fn().mockImplementation((init) => [init, vi.fn()]),
    useEffect: vi.fn().mockImplementation((cb) => cb()),
  };
});

// Mock the supabase client
vi.mock('@/lib/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
    },
  },
}));

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  ),
}));

describe('HomePage', () => {
  it('renders the main title', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Allied Health Business Assessment Tool')).toBeInTheDocument();
  });

  it('displays the main description', () => {
    render(<HomePage />);
    
    expect(screen.getByText(/A comprehensive solution for physiotherapy practices/)).toBeInTheDocument();
  });

  it('shows the get started button for non-authenticated users', () => {
    render(<HomePage />);
    
    expect(screen.getByRole('link', { name: 'Get Started' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Learn More' })).toBeInTheDocument();
  });

  it('displays the features section', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Comprehensive Assessment')).toBeInTheDocument();
    expect(screen.getByText('Data-Driven Insights')).toBeInTheDocument();
    expect(screen.getByText('Actionable Recommendations')).toBeInTheDocument();
    expect(screen.getByText('Business Health Score')).toBeInTheDocument();
    expect(screen.getByText('Interconnectedness Analysis')).toBeInTheDocument();
    expect(screen.getByText('Physiotherapy-Specific')).toBeInTheDocument();
  });

  it('shows the how it works section', () => {
    render(<HomePage />);
    
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByText('Complete Assessment')).toBeInTheDocument();
    expect(screen.getByText('Review Results')).toBeInTheDocument();
    expect(screen.getByText('Implement Changes')).toBeInTheDocument();
  });

  it('displays the call to action at the bottom', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Ready to optimize your practice?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get Started Now' })).toBeInTheDocument();
  });
});
