-- Initial database schema for Allied Health Business Assessment Tool
-- This will be used with Supabase/PostgreSQL

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create schema
CREATE SCHEMA IF NOT EXISTS public;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Practice profiles
CREATE TABLE IF NOT EXISTS practice_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  practice_type TEXT NOT NULL DEFAULT 'PHYSIOTHERAPY',
  number_of_practitioners INTEGER NOT NULL,
  years_in_operation INTEGER,
  address TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'Australia',
  annual_revenue DECIMAL,
  patient_volume INTEGER,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment modules
CREATE TABLE IF NOT EXISTS assessment_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment questions
CREATE TABLE IF NOT EXISTS assessment_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES assessment_modules(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  type TEXT NOT NULL,
  options JSONB,
  weight FLOAT NOT NULL DEFAULT 1.0,
  benchmark_reference TEXT,
  interconnectedness_score FLOAT DEFAULT 0.0,
  related_business_areas JSONB,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment responses
CREATE TABLE IF NOT EXISTS assessment_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  practice_id UUID NOT NULL REFERENCES practice_profiles(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES assessment_modules(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  responses JSONB NOT NULL,
  score FLOAT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recommendations
CREATE TABLE IF NOT EXISTS recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  practice_id UUID NOT NULL REFERENCES practice_profiles(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES assessment_responses(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  impact TEXT NOT NULL,
  effort TEXT NOT NULL,
  timeframe TEXT NOT NULL,
  steps JSONB,
  implementation_status TEXT DEFAULT 'NOT_STARTED',
  cross_domain_impacts JSONB,
  interconnectedness_score FLOAT DEFAULT 0.0,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Business area interconnectedness
CREATE TABLE IF NOT EXISTS business_area_interconnectedness (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  practice_id UUID NOT NULL REFERENCES practice_profiles(id) ON DELETE CASCADE,
  source_category TEXT NOT NULL,
  impacted_category TEXT NOT NULL,
  impact_score FLOAT NOT NULL,
  impact_statement TEXT,
  related_source_questions JSONB,
  related_impacted_questions JSONB,
  keywords JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_area_interconnectedness ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY users_policy ON users
  FOR ALL USING (auth.uid() = id);

-- Practice profiles can only be accessed by their owners
CREATE POLICY practice_profiles_policy ON practice_profiles
  FOR ALL USING (auth.uid() = user_id);

-- Assessment responses can only be accessed by the practice owner
CREATE POLICY assessment_responses_policy ON assessment_responses
  FOR ALL USING (auth.uid() = user_id);

-- Recommendations can only be accessed by the practice owner
CREATE POLICY recommendations_policy ON recommendations
  FOR ALL USING (auth.uid() = user_id);

-- Business area interconnectedness can only be accessed by the practice owner
CREATE POLICY business_area_interconnectedness_policy ON business_area_interconnectedness
  FOR ALL USING (EXISTS (
    SELECT 1 FROM practice_profiles
    WHERE practice_profiles.id = business_area_interconnectedness.practice_id
    AND practice_profiles.user_id = auth.uid()
  ));

-- Assessment modules and questions are public read-only
ALTER TABLE assessment_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY assessment_modules_read_policy ON assessment_modules
  FOR SELECT USING (TRUE);

CREATE POLICY assessment_questions_read_policy ON assessment_questions
  FOR SELECT USING (TRUE);
