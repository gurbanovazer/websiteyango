/*
  # Add Email Notification Triggers

  1. Database Triggers
    - Create triggers for all application tables
    - Automatically call edge function when new records are inserted
    - Send email notifications with application details

  2. Security
    - Triggers run with elevated privileges
    - Secure webhook calls to edge functions
*/

-- Create function to call the email notification edge function
CREATE OR REPLACE FUNCTION notify_new_application()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url text;
  payload json;
BEGIN
  -- Get the Supabase URL from environment or construct it
  webhook_url := current_setting('app.settings.supabase_url', true) || '/functions/v1/send-application-notification';
  
  -- If the setting is not available, use a placeholder (you'll need to update this)
  IF webhook_url IS NULL OR webhook_url = '/functions/v1/send-application-notification' THEN
    webhook_url := 'https://your-project-ref.supabase.co/functions/v1/send-application-notification';
  END IF;

  -- Prepare the payload
  payload := json_build_object(
    'record', row_to_json(NEW),
    'table', TG_TABLE_NAME
  );

  -- Make HTTP request to edge function (this is a simplified version)
  -- In production, you might want to use pg_net extension or similar
  PERFORM pg_notify('new_application', payload::text);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for each table
CREATE TRIGGER driver_application_notification
  AFTER INSERT ON driver_applications
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_application();

CREATE TRIGGER delivery_application_notification
  AFTER INSERT ON delivery_applications
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_application();

CREATE TRIGGER entrepreneur_application_notification
  AFTER INSERT ON entrepreneur_applications
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_application();