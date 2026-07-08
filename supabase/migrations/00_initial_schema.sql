-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: users
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    gender TEXT,
    grade_cali INTEGER DEFAULT 0,
    grade_yoga INTEGER DEFAULT 0,
    pain_flags JSONB DEFAULT '[]'::jsonb,
    goal TEXT,
    minutes_available INTEGER DEFAULT 30,
    is_premium BOOLEAN DEFAULT FALSE,
    tier TEXT,
    lemonsqueezy_customer_id TEXT,
    currency TEXT,
    country_code TEXT,
    referral_code TEXT UNIQUE,
    referred_by TEXT,
    referrals_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: programs
CREATE TABLE programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    program_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: sessions
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
    session_number INTEGER NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    food_log JSONB DEFAULT '[]'::jsonb,
    pain_score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: daily_logs
CREATE TABLE daily_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    meals JSONB DEFAULT '[]'::jsonb,
    total_kcal INTEGER DEFAULT 0,
    protein_g INTEGER DEFAULT 0,
    carbs_g INTEGER DEFAULT 0,
    fat_g INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: food_items
CREATE TABLE food_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    name_hindi TEXT,
    kcal_per_100g INTEGER NOT NULL,
    protein_g DECIMAL NOT NULL,
    carbs_g DECIMAL NOT NULL,
    fat_g DECIMAL NOT NULL,
    serving_size_g INTEGER NOT NULL,
    serving_name TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for programs
CREATE POLICY "Users can view own programs" ON programs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own programs" ON programs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own programs" ON programs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own programs" ON programs FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for sessions
CREATE POLICY "Users can view own sessions" ON sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions" ON sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sessions" ON sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sessions" ON sessions FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for daily_logs
CREATE POLICY "Users can view own daily logs" ON daily_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own daily logs" ON daily_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own daily logs" ON daily_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own daily logs" ON daily_logs FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for food_items (Public Read-Only)
CREATE POLICY "Anyone can read food items" ON food_items FOR SELECT USING (true);

-- Seed Data for food_items (Top 20 Indian Foods as example)
INSERT INTO food_items (name, name_hindi, kcal_per_100g, protein_g, carbs_g, fat_g, serving_size_g, serving_name) VALUES
('Dal Tadka', 'दाल तड़का', 116, 6.2, 16.5, 3.2, 150, '1 Katori'),
('Roti (Chapati)', 'रोटी', 297, 9.8, 56.4, 3.7, 40, '1 Roti'),
('White Rice (Cooked)', 'सफेद चावल', 130, 2.7, 28.2, 0.3, 150, '1 Katori'),
('Paneer Butter Masala', 'पनीर बटर मसाला', 246, 8.5, 9.2, 19.5, 150, '1 Katori'),
('Chicken Curry', 'चिकन करी', 145, 15.2, 4.5, 7.8, 150, '1 Katori'),
('Idli', 'इडली', 105, 3.1, 23.5, 0.2, 50, '1 Idli'),
('Dosa (Plain)', 'सादा डोसा', 168, 3.8, 28.6, 3.7, 80, '1 Dosa'),
('Masala Dosa', 'मसाला डोसा', 210, 4.5, 32.1, 7.2, 120, '1 Dosa'),
('Sambar', 'सांभर', 65, 2.5, 9.8, 1.8, 150, '1 Katori'),
('Curd (Dahi)', 'दही', 98, 3.5, 4.7, 4.3, 100, '1 Katori'),
('Aloo Gobi', 'आलू गोभी', 85, 2.1, 10.5, 4.2, 150, '1 Katori'),
('Palak Paneer', 'पालक पनीर', 185, 9.2, 6.5, 14.5, 150, '1 Katori'),
('Chana Masala', 'चना मसाला', 165, 7.5, 22.4, 5.2, 150, '1 Katori'),
('Egg Curry', 'अंडा करी', 135, 9.5, 5.2, 8.5, 150, '1 Katori'),
('Poha', 'पोहा', 180, 3.5, 34.2, 3.1, 100, '1 Plate'),
('Upma', 'उपमा', 145, 3.2, 22.5, 4.8, 100, '1 Plate'),
('Bhindi Masala', 'भिंडी मसाला', 95, 2.4, 11.2, 5.5, 100, '1 Katori'),
('Rajma', 'राजमा', 135, 6.8, 20.5, 3.2, 150, '1 Katori'),
('Vegetable Biryani', 'वेजिटेबल बिरयानी', 160, 4.5, 28.5, 4.2, 200, '1 Plate'),
('Chicken Biryani', 'चिकन बिरयानी', 195, 12.5, 24.5, 6.5, 200, '1 Plate');
