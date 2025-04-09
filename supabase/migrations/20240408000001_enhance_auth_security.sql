-- Update auth.users table for enhanced security
ALTER TABLE auth.users 
  ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_failed_login TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS locked_until TIMESTAMP WITH TIME ZONE;

-- Create function to handle failed login attempts
CREATE OR REPLACE FUNCTION handle_failed_login()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE auth.users
  SET 
    failed_login_attempts = failed_login_attempts + 1,
    last_failed_login = NOW(),
    locked_until = CASE 
      WHEN failed_login_attempts >= 5 THEN NOW() + INTERVAL '15 minutes'
      ELSE locked_until
    END
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for failed logins
DROP TRIGGER IF EXISTS on_auth_failed_login ON auth.users;
CREATE TRIGGER on_auth_failed_login
  AFTER UPDATE OF failed_login_attempts ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_failed_login();

-- Create function to reset failed login attempts on successful login
CREATE OR REPLACE FUNCTION reset_failed_login_attempts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE auth.users
  SET 
    failed_login_attempts = 0,
    last_failed_login = NULL,
    locked_until = NULL
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for successful logins
DROP TRIGGER IF EXISTS on_auth_successful_login ON auth.users;
CREATE TRIGGER on_auth_successful_login
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION reset_failed_login_attempts(); 