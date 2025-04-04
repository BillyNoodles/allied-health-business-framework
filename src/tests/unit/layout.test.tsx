import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Layout from '@/app/layout';

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
      onAuthStateChange: vi.fn().mockReturnValue({ data: {} }),
      signOut: vi.fn(),
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

// Mock the useRouter hook
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Layout', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('renders the header with logo', () => {
    render(<Layout>Test Content</Layout>);
    
    expect(screen.getByText('Allied Health Assessment')).toBeInTheDocument();
  });

  it('displays the children content', () => {
    render(<Layout>Test Content</Layout>);
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('shows the footer with copyright', () => {
    render(<Layout>Test Content</Layout>);
    
    expect(screen.getByText(/© 2025 Allied Health Business Assessment Tool/)).toBeInTheDocument();
  });

  it('displays navigation links for non-authenticated users', () => {
    render(<Layout>Test Content</Layout>);
    
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('shows the mobile menu button', () => {
    render(<Layout>Test Content</Layout>);
    
    const menuButton = screen.getByRole('button', { name: '' });
    expect(menuButton).toBeInTheDocument();
  });

  it('shows footer links', () => {
    render(<Layout>Test Content</Layout>);
    
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});
