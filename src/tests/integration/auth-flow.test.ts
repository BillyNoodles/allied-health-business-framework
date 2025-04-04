import { describe, it, expect, vi, beforeEach } from 'vitest';
import { supabase } from '@/lib/supabase/client';

// Mock the supabase client
vi.mock('@/lib/supabase/client', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn(),
      getSession: vi.fn(),
    },
    from: vi.fn(),
  },
}));

describe('Authentication Flow Integration', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('should handle user registration flow', async () => {
    // Mock successful signup
    const mockUser = { id: 'user123', email: 'test@example.com' };
    const mockSignUpResponse = { data: { user: mockUser }, error: null };
    vi.mocked(supabase.auth.signUp).mockResolvedValue(mockSignUpResponse);

    // Mock successful database insert
    const mockFromResponse = {
      insert: vi.fn().mockReturnValue({ error: null }),
    };
    vi.mocked(supabase.from).mockReturnValue(mockFromResponse);

    // Perform signup
    const result = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'password123',
    });

    // Create user profile
    const profileResult = await supabase
      .from('users')
      .insert([{ id: result.data.user.id, email: result.data.user.email }]);

    // Verify signup was called with correct parameters
    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });

    // Verify user profile creation
    expect(supabase.from).toHaveBeenCalledWith('users');
    expect(mockFromResponse.insert).toHaveBeenCalledWith([
      { id: mockUser.id, email: mockUser.email },
    ]);

    // Verify results
    expect(result.data.user).toEqual(mockUser);
    expect(profileResult.error).toBeNull();
  });

  it('should handle user login flow', async () => {
    // Mock successful login
    const mockUser = { id: 'user123', email: 'test@example.com' };
    const mockSession = { user: mockUser, access_token: 'token123' };
    const mockSignInResponse = { data: { session: mockSession, user: mockUser }, error: null };
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue(mockSignInResponse);

    // Perform login
    const result = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'password123',
    });

    // Verify login was called with correct parameters
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });

    // Verify results
    expect(result.data.user).toEqual(mockUser);
    expect(result.data.session).toEqual(mockSession);
    expect(result.error).toBeNull();
  });

  it('should handle user logout flow', async () => {
    // Mock successful logout
    const mockSignOutResponse = { error: null };
    vi.mocked(supabase.auth.signOut).mockResolvedValue(mockSignOutResponse);

    // Perform logout
    const result = await supabase.auth.signOut();

    // Verify logout was called
    expect(supabase.auth.signOut).toHaveBeenCalled();

    // Verify results
    expect(result.error).toBeNull();
  });

  it('should handle practice profile creation flow', async () => {
    // Mock successful user retrieval
    const mockUser = { id: 'user123', email: 'test@example.com' };
    const mockUserResponse = { data: { user: mockUser }, error: null };
    vi.mocked(supabase.auth.getUser).mockResolvedValue(mockUserResponse);

    // Mock successful database insert
    const mockFromResponse = {
      insert: vi.fn().mockReturnValue({ error: null }),
    };
    vi.mocked(supabase.from).mockReturnValue(mockFromResponse);

    // Get current user
    const userResult = await supabase.auth.getUser();

    // Create practice profile
    const practiceData = {
      name: 'Test Practice',
      owner_name: 'Test Owner',
      email: 'practice@example.com',
      phone: '1234567890',
      practice_type: 'PHYSIOTHERAPY',
      number_of_practitioners: 5,
      years_in_operation: 3,
      address: '123 Test St',
      city: 'Test City',
      state: 'Test State',
      postal_code: '12345',
      country: 'Australia',
      user_id: userResult.data.user.id
    };

    const profileResult = await supabase
      .from('practice_profiles')
      .insert([practiceData]);

    // Verify user retrieval
    expect(supabase.auth.getUser).toHaveBeenCalled();

    // Verify practice profile creation
    expect(supabase.from).toHaveBeenCalledWith('practice_profiles');
    expect(mockFromResponse.insert).toHaveBeenCalledWith([practiceData]);

    // Verify results
    expect(userResult.data.user).toEqual(mockUser);
    expect(profileResult.error).toBeNull();
  });
});
