-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    discipline TEXT,
    practice_size TEXT,
    country TEXT,
    region TEXT,
    onboarding_completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS practice_information (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    practice_name TEXT,
    practice_address TEXT,
    practice_phone TEXT,
    practice_email TEXT,
    practice_website TEXT,
    number_of_practitioners INTEGER,
    number_of_support_staff INTEGER,
    years_in_operation INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assessment_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    weight DECIMAL NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id TEXT NOT NULL,
    category_id UUID REFERENCES assessment_categories(id),
    text TEXT NOT NULL,
    description TEXT,
    question_type TEXT NOT NULL,
    options JSONB,
    required BOOLEAN DEFAULT TRUE,
    weight DECIMAL DEFAULT 1.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    overall_score DECIMAL,
    score_position TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assessment_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id),
    response_value JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS category_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
    category_id UUID REFERENCES assessment_categories(id),
    score DECIMAL NOT NULL,
    position TEXT NOT NULL,
    strengths JSONB,
    weaknesses JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES assessment_categories(id),
    priority INTEGER,
    impact_areas JSONB,
    implementation_steps JSONB,
    estimated_cost TEXT,
    estimated_time TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    sop_type TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS compliance_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    framework TEXT NOT NULL,
    status TEXT NOT NULL,
    verification_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    next_review_date TIMESTAMP WITH TIME ZONE,
    action_items JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS progress_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    assessment_id UUID REFERENCES assessments(id),
    metric_name TEXT NOT NULL,
    baseline_value DECIMAL,
    current_value DECIMAL,
    target_value DECIMAL,
    unit TEXT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default assessment categories
INSERT INTO assessment_categories (name, description, weight) VALUES
('FINANCIAL', 'Financial health and management', 0.20),
('OPERATIONS', 'Operational efficiency and workflows', 0.15),
('PATIENT_CARE', 'Clinical outcomes and patient experience', 0.15),
('COMPLIANCE', 'Regulatory compliance and risk management', 0.12),
('TECHNOLOGY', 'Technology infrastructure and digital capabilities', 0.10),
('MARKETING', 'Marketing strategy and patient acquisition', 0.08),
('STAFFING', 'Staff management and development', 0.08),
('FACILITIES', 'Physical space and equipment', 0.05),
('GEOGRAPHY', 'Location and market factors', 0.04),
('AUTOMATION', 'Process automation and efficiency', 0.03);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_information ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sops ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_tracking ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can read own data" ON users
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can CRUD own practice info" ON practice_information
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can CRUD own assessments" ON assessments
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can CRUD own responses" ON assessment_responses
    FOR ALL USING (
        auth.uid() = (
            SELECT user_id 
            FROM assessments 
            WHERE id = assessment_responses.assessment_id
        )
    );

CREATE POLICY "Users can read own scores" ON category_scores
    FOR SELECT USING (
        auth.uid() = (
            SELECT user_id 
            FROM assessments 
            WHERE id = category_scores.assessment_id
        )
    );

CREATE POLICY "Users can read own recommendations" ON recommendations
    FOR SELECT USING (
        auth.uid() = (
            SELECT user_id 
            FROM assessments 
            WHERE id = recommendations.assessment_id
        )
    );

CREATE POLICY "Users can CRUD own SOPs" ON sops
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can CRUD own compliance data" ON compliance_verifications
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can CRUD own progress" ON progress_tracking
    FOR ALL USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_assessment_responses_assessment_id ON assessment_responses(assessment_id);
CREATE INDEX idx_category_scores_assessment_id ON category_scores(assessment_id);
CREATE INDEX idx_recommendations_assessment_id ON recommendations(assessment_id);
CREATE INDEX idx_sops_user_id ON sops(user_id);
CREATE INDEX idx_compliance_verifications_user_id ON compliance_verifications(user_id);
CREATE INDEX idx_progress_tracking_user_id ON progress_tracking(user_id); 