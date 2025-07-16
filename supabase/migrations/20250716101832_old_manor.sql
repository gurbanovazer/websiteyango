/*
  # Create forms tables for Yango recruitment

  1. New Tables
    - `driver_applications`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `date_of_birth` (date)
      - `mobile_number` (text)
      - `has_own_car` (boolean)
      - `car_model` (text, nullable)
      - `car_year` (integer, nullable)
      - `work_preferences` (text array, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `delivery_applications`
      - `id` (uuid, primary key)
      - `vehicle_type` (text)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `date_of_birth` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `entrepreneur_applications`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `phone` (text)
      - `company_name` (text, nullable)
      - `number_of_cars` (integer)
      - `work_conditions` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to insert their own data
    - Add policies for service role to read all data
*/

-- Driver Applications Table
CREATE TABLE IF NOT EXISTS driver_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  date_of_birth date NOT NULL,
  mobile_number text NOT NULL,
  has_own_car boolean NOT NULL,
  car_model text,
  car_year integer,
  work_preferences text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE driver_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert driver applications"
  ON driver_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role can read driver applications"
  ON driver_applications
  FOR SELECT
  TO service_role
  USING (true);

-- Delivery Applications Table
CREATE TABLE IF NOT EXISTS delivery_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_type text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date_of_birth date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE delivery_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert delivery applications"
  ON delivery_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role can read delivery applications"
  ON delivery_applications
  FOR SELECT
  TO service_role
  USING (true);

-- Entrepreneur Applications Table
CREATE TABLE IF NOT EXISTS entrepreneur_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  company_name text,
  number_of_cars integer NOT NULL,
  work_conditions text[] NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE entrepreneur_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert entrepreneur applications"
  ON entrepreneur_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role can read entrepreneur applications"
  ON entrepreneur_applications
  FOR SELECT
  TO service_role
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_driver_applications_updated_at
    BEFORE UPDATE ON driver_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_delivery_applications_updated_at
    BEFORE UPDATE ON delivery_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_entrepreneur_applications_updated_at
    BEFORE UPDATE ON entrepreneur_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();