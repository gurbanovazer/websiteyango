import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DriverApplication {
  id?: string;
  full_name: string;
  date_of_birth: string;
  mobile_number: string;
  has_own_car: boolean;
  car_model?: string;
  car_year?: number;
  work_preferences?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface DeliveryApplication {
  id?: string;
  vehicle_type: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  created_at?: string;
  updated_at?: string;
}

export interface EntrepreneurApplication {
  id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  company_name?: string;
  number_of_cars: number;
  work_conditions: string[];
  created_at?: string;
  updated_at?: string;
}