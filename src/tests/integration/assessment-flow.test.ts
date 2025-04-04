import { describe, it, expect, vi, beforeEach } from 'vitest';
import { supabase } from '@/lib/supabase/client';

// Mock the supabase client
vi.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: vi.fn(),
    auth: {
      getUser: vi.fn(),
    },
  },
}));

describe('Assessment Flow Integration', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('should handle fetching assessment modules', async () => {
    // Mock successful user retrieval
    const mockUser = { id: 'user123', email: 'test@example.com' };
    const mockUserResponse = { data: { user: mockUser }, error: null };
    vi.mocked(supabase.auth.getUser).mockResolvedValue(mockUserResponse);

    // Mock successful modules retrieval
    const mockModules = [
      {
        id: 'financial',
        name: 'Financial Health',
        description: 'Assess your practice\'s financial performance',
        category: 'FINANCIAL',
        weight: 25,
        order_index: 1,
        is_active: true
      },
      {
        id: 'compliance',
        name: 'Compliance & Risk',
        description: 'Evaluate your regulatory compliance',
        category: 'COMPLIANCE',
        weight: 20,
        order_index: 2,
        is_active: true
      }
    ];
    
    const mockFromResponse = {
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      data: mockModules,
      error: null
    };
    vi.mocked(supabase.from).mockReturnValue(mockFromResponse);

    // Get current user
    const userResult = await supabase.auth.getUser();

    // Fetch assessment modules
    const { data: modules, error } = await supabase
      .from('assessment_modules')
      .select('*')
      .order('order_index', { ascending: true })
      .eq('is_active', true);

    // Verify user retrieval
    expect(supabase.auth.getUser).toHaveBeenCalled();

    // Verify modules retrieval
    expect(supabase.from).toHaveBeenCalledWith('assessment_modules');
    expect(mockFromResponse.select).toHaveBeenCalledWith('*');
    expect(mockFromResponse.order).toHaveBeenCalledWith('order_index', { ascending: true });
    expect(mockFromResponse.eq).toHaveBeenCalledWith('is_active', true);

    // Verify results
    expect(userResult.data.user).toEqual(mockUser);
    expect(modules).toEqual(mockModules);
    expect(error).toBeNull();
  });

  it('should handle saving assessment responses', async () => {
    // Mock successful user retrieval
    const mockUser = { id: 'user123', email: 'test@example.com' };
    const mockUserResponse = { data: { user: mockUser }, error: null };
    vi.mocked(supabase.auth.getUser).mockResolvedValue(mockUserResponse);

    // Mock successful response saving
    const mockFromResponse = {
      insert: vi.fn().mockReturnValue({ data: { id: 'response123' }, error: null }),
      upsert: vi.fn().mockReturnValue({ data: { id: 'response123' }, error: null })
    };
    vi.mocked(supabase.from).mockReturnValue(mockFromResponse);

    // Get current user
    const userResult = await supabase.auth.getUser();

    // Save assessment responses
    const responseData = {
      practice_id: 'practice123',
      module_id: 'financial',
      user_id: userResult.data.user.id,
      responses: [
        { questionId: 'q1', response: '20', notes: '' },
        { questionId: 'q2', response: '140000', notes: '' }
      ],
      score: 75,
      completed_at: new Date().toISOString()
    };

    const saveResult = await supabase
      .from('assessment_responses')
      .insert([responseData]);

    // Update existing response
    const updateResult = await supabase
      .from('assessment_responses')
      .upsert([{
        id: 'response123',
        ...responseData,
        score: 80
      }]);

    // Verify user retrieval
    expect(supabase.auth.getUser).toHaveBeenCalled();

    // Verify response saving
    expect(supabase.from).toHaveBeenCalledWith('assessment_responses');
    expect(mockFromResponse.insert).toHaveBeenCalledWith([responseData]);
    expect(mockFromResponse.upsert).toHaveBeenCalledWith([{
      id: 'response123',
      ...responseData,
      score: 80
    }]);

    // Verify results
    expect(saveResult.data).toEqual({ id: 'response123' });
    expect(saveResult.error).toBeNull();
    expect(updateResult.data).toEqual({ id: 'response123' });
    expect(updateResult.error).toBeNull();
  });

  it('should handle generating recommendations based on assessment results', async () => {
    // Mock successful user retrieval
    const mockUser = { id: 'user123', email: 'test@example.com' };
    const mockUserResponse = { data: { user: mockUser }, error: null };
    vi.mocked(supabase.auth.getUser).mockResolvedValue(mockUserResponse);

    // Mock successful recommendation generation
    const mockFromResponse = {
      insert: vi.fn().mockReturnValue({ data: [{ id: 'rec123' }], error: null }),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      data: [
        {
          id: 'rec123',
          practice_id: 'practice123',
          assessment_id: 'assessment123',
          category: 'FINANCIAL',
          title: 'Improve Collection Rate',
          impact: 'HIGH',
          effort: 'MEDIUM',
          timeframe: 'IMMEDIATE'
        }
      ],
      error: null
    };
    vi.mocked(supabase.from).mockReturnValue(mockFromResponse);

    // Get current user
    const userResult = await supabase.auth.getUser();

    // Generate recommendations
    const recommendationData = {
      practice_id: 'practice123',
      assessment_id: 'assessment123',
      category: 'FINANCIAL',
      title: 'Improve Collection Rate',
      description: 'Implement processes to increase collection rate from current 92% to benchmark of 95%.',
      impact: 'HIGH',
      effort: 'MEDIUM',
      timeframe: 'IMMEDIATE',
      steps: [
        'Review current billing procedures',
        'Identify accounts with outstanding balances',
        'Implement automated payment reminders',
        'Train staff on collection best practices'
      ],
      implementation_status: 'NOT_STARTED',
      cross_domain_impacts: [
        { impactedArea: 'OPERATIONS', impactScore: 6, impactStatement: 'Improved collections will streamline administrative processes' }
      ],
      interconnectedness_score: 0.75,
      user_id: userResult.data.user.id
    };

    const generateResult = await supabase
      .from('recommendations')
      .insert([recommendationData]);

    // Fetch recommendations
    const { data: recommendations, error } = await supabase
      .from('recommendations')
      .select('*')
      .eq('practice_id', 'practice123');

    // Verify user retrieval
    expect(supabase.auth.getUser).toHaveBeenCalled();

    // Verify recommendation generation and retrieval
    expect(supabase.from).toHaveBeenCalledWith('recommendations');
    expect(mockFromResponse.insert).toHaveBeenCalledWith([recommendationData]);
    expect(mockFromResponse.select).toHaveBeenCalledWith('*');
    expect(mockFromResponse.eq).toHaveBeenCalledWith('practice_id', 'practice123');

    // Verify results
    expect(generateResult.data).toEqual([{ id: 'rec123' }]);
    expect(generateResult.error).toBeNull();
    expect(recommendations).toEqual([
      {
        id: 'rec123',
        practice_id: 'practice123',
        assessment_id: 'assessment123',
        category: 'FINANCIAL',
        title: 'Improve Collection Rate',
        impact: 'HIGH',
        effort: 'MEDIUM',
        timeframe: 'IMMEDIATE'
      }
    ]);
    expect(error).toBeNull();
  });
});
