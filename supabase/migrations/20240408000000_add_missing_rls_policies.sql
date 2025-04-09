-- Enable RLS for tables that might have been missed
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_categories ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for questions and assessment_categories
CREATE POLICY "Authenticated users can read questions" ON questions
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read categories" ON assessment_categories
    FOR SELECT USING (auth.role() = 'authenticated');

-- Separate INSERT policies for better control
CREATE POLICY "Users can insert own practice info" ON practice_information
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments" ON assessments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own SOPs" ON sops
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own compliance data" ON compliance_verifications
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON progress_tracking
    FOR INSERT WITH CHECK (auth.uid() = user_id); 