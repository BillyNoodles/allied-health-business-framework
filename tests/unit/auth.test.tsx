import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AuthPage from '@/app/auth/page';

// Mock the useRouter hook
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock the supabase client
vi.mock('@/lib/supabase/client', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
    },
    from: vi.fn().mockReturnValue({
      insert: vi.fn().mockReturnValue({
        error: null,
      }),
    }),
  },
}));

describe('AuthPage', () => {
  it('renders the sign in and sign up tabs', () => {
    render(<AuthPage />);
    
    expect(screen.getByText('Allied Health Business Assessment Tool')).toBeInTheDocument();
    expect(screen.getByText('Sign in or create an account to get started')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Sign Up' })).toBeInTheDocument();
  });

  it('allows users to enter email and password', () => {
    render(<AuthPage />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('shows sign in button by default', () => {
    render(<AuthPage />);
    
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('switches to sign up form when sign up tab is clicked', () => {
    render(<AuthPage />);
    
    const signUpTab = screen.getByRole('tab', { name: 'Sign Up' });
    fireEvent.click(signUpTab);
    
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  });
});
