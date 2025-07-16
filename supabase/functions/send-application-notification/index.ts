import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailPayload {
  to: string[]
  subject: string
  html: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { record, table } = await req.json()
    
    // Determine application type and format email content
    let applicationType = ''
    let emailContent = ''
    
    if (table === 'driver_applications') {
      applicationType = 'Driver Application'
      emailContent = `
        <h2>🚗 New Driver Application Received</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Application Details:</h3>
          <p><strong>Full Name:</strong> ${record.full_name}</p>
          <p><strong>Date of Birth:</strong> ${record.date_of_birth}</p>
          <p><strong>Mobile Number:</strong> ${record.mobile_number}</p>
          <p><strong>Has Own Car:</strong> ${record.has_own_car ? 'Yes' : 'No'}</p>
          ${record.has_own_car ? `
            <p><strong>Car Model:</strong> ${record.car_model || 'N/A'}</p>
            <p><strong>Car Year:</strong> ${record.car_year || 'N/A'}</p>
          ` : `
            <p><strong>Work Preferences:</strong> ${record.work_preferences ? record.work_preferences.join(', ') : 'N/A'}</p>
          `}
          <p><strong>Submitted At:</strong> ${new Date(record.created_at).toLocaleString()}</p>
        </div>
      `
    } else if (table === 'delivery_applications') {
      applicationType = 'Delivery Application'
      emailContent = `
        <h2>📦 New Delivery Application Received</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Application Details:</h3>
          <p><strong>Vehicle Type:</strong> ${record.vehicle_type}</p>
          <p><strong>Full Name:</strong> ${record.full_name}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Phone:</strong> ${record.phone}</p>
          <p><strong>Date of Birth:</strong> ${record.date_of_birth}</p>
          <p><strong>Submitted At:</strong> ${new Date(record.created_at).toLocaleString()}</p>
        </div>
      `
    } else if (table === 'entrepreneur_applications') {
      applicationType = 'Entrepreneur Application'
      emailContent = `
        <h2>🏢 New Entrepreneur Application Received</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Application Details:</h3>
          <p><strong>Name:</strong> ${record.first_name} ${record.last_name}</p>
          <p><strong>Phone:</strong> ${record.phone}</p>
          <p><strong>Company Name:</strong> ${record.company_name || 'Not specified'}</p>
          <p><strong>Number of Cars:</strong> ${record.number_of_cars}</p>
          <p><strong>Work Conditions:</strong> ${record.work_conditions ? record.work_conditions.join(', ') : 'N/A'}</p>
          <p><strong>Submitted At:</strong> ${new Date(record.created_at).toLocaleString()}</p>
        </div>
      `
    }

    // Prepare email payload
    const emailPayload: EmailPayload = {
      to: ['mr.azerq@gmail.com'],
      subject: `Yango - New ${applicationType} Submitted`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center;">
            <h1>Yango Application Notification</h1>
          </div>
          ${emailContent}
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This is an automated notification from your Yango recruitment system.
            </p>
          </div>
        </div>
      `
    }

    // Send email using Resend API
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY environment variable is not set - skipping email notification')
      return new Response(
        JSON.stringify({ success: true, message: 'Application saved successfully (email notification skipped - API key not configured)' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Yango Notifications <mr.azerq@gmail.com>',
        ...emailPayload,
      }),
    })

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      throw new Error(`Failed to send email: ${errorText}`)
    }

    const emailResult = await emailResponse.json()
    console.log('Email sent successfully:', emailResult)

    return new Response(
      JSON.stringify({ success: true, message: 'Email notification sent' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error sending email notification:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})