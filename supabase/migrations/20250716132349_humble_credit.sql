/*
  # Remove date of birth requirement from applications

  1. Changes to Tables
    - `driver_applications`
      - Make `date_of_birth` column nullable
    - `delivery_applications` 
      - Make `date_of_birth` column nullable

  2. Security
    - No changes to RLS policies needed
    - Existing policies remain intact

  This migration makes the date_of_birth field optional in both driver and delivery applications
  to simplify the registration process while maintaining data integrity.
*/

-- Make date_of_birth nullable in driver_applications
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'driver_applications' AND column_name = 'date_of_birth'
  ) THEN
    ALTER TABLE driver_applications ALTER COLUMN date_of_birth DROP NOT NULL;
  END IF;
END $$;

-- Make date_of_birth nullable in delivery_applications  
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'delivery_applications' AND column_name = 'date_of_birth'
  ) THEN
    ALTER TABLE delivery_applications ALTER COLUMN date_of_birth DROP NOT NULL;
  END IF;
END $$;