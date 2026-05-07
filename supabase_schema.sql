-- Create Challenge Settings table
CREATE TABLE IF NOT EXISTS challenge_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  start_date DATE NOT NULL DEFAULT '2026-05-01',
  total_budget NUMERIC NOT NULL DEFAULT 5000,
  target_revenue NUMERIC NOT NULL DEFAULT 15000,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Experiments table
CREATE TABLE IF NOT EXISTS experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  budget NUMERIC NOT NULL,
  spent NUMERIC DEFAULT 0,
  enquiries INTEGER DEFAULT 0,
  meetings_booked INTEGER DEFAULT 0,
  meetings_completed INTEGER DEFAULT 0,
  proposals_sent INTEGER DEFAULT 0,
  deals INTEGER DEFAULT 0,
  revenue NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'Running',
  status_badge TEXT,
  color TEXT,
  gradient TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed initial experiments
INSERT INTO experiments (slug, name, role, budget, status, status_badge, color, gradient)
VALUES 
('web-development', 'Web Development', 'Main Offer', 2000, 'Running', 'Primary', '#06b6d4', 'from-blue-600 to-cyan-400'),
('free-branding-consultation', 'Free Branding Consultation', 'Lead Magnet / Meeting Funnel', 1000, 'Running', 'Active', '#d946ef', 'from-purple-600 to-pink-400'),
('branding', 'Branding', 'Brand Identity / Company Profile / Design', 700, 'Testing', 'Testing', '#f59e0b', 'from-gold-600 to-orange-400'),
('ai-agency-work', 'AI Agency Work', 'Premium Service', 800, 'Running', 'Organic / Premium', '#8b5cf6', 'from-violet-600 to-blue-400'),
('business-services', 'Business Services', 'UAE Business Leads', 300, 'Testing', 'Testing', '#10b981', 'from-green-600 to-emerald-400'),
('digital-marketing', 'Digital Marketing', 'Upsell Only', 200, 'Running', 'Upsell', '#ef4444', 'from-red-600 to-orange-400')
ON CONFLICT (slug) DO NOTHING;

-- Seed initial challenge settings
INSERT INTO challenge_settings (start_date, total_budget, target_revenue)
SELECT '2026-05-01', 5000, 15000
WHERE NOT EXISTS (SELECT 1 FROM challenge_settings);

-- Enable Row Level Security (RLS)
ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public Read Experiments" ON experiments FOR SELECT USING (true);
CREATE POLICY "Public Read Challenge Settings" ON challenge_settings FOR SELECT USING (true);

-- Create policies for admin update access (simplified for now, ideally use Auth)
CREATE POLICY "Admin Update Experiments" ON experiments FOR UPDATE USING (true);
CREATE POLICY "Admin Update Challenge Settings" ON challenge_settings FOR UPDATE USING (true);
