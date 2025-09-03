export const getContactEmailTemplate = ({
  name,
  email,
  subject,
  message,
}: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f3f4f6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">
            New Portfolio Contact
          </h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">
            Someone reached out through your portfolio website
          </p>
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
          
          <!-- Contact Info -->
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #374151; margin: 0 0 15px 0; font-size: 18px;">Contact Information</h2>
            <div style="display: grid; gap: 10px;">
              <div style="display: flex; align-items: center;">
                <span style="font-weight: bold; color: #4b5563; width: 80px;">Name:</span>
                <span style="color: #1f2937;">${name}</span>
              </div>
              <div style="display: flex; align-items: center;">
                <span style="font-weight: bold; color: #4b5563; width: 80px;">Email:</span>
                <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
              </div>
              <div style="display: flex; align-items: center;">
                <span style="font-weight: bold; color: #4b5563; width: 80px;">Subject:</span>
                <span style="color: #1f2937;">${subject}</span>
              </div>
            </div>
          </div>

          <!-- Message -->
          <div style="background-color: white; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px;">
            <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 16px;">Message:</h3>
            <div style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>

          <!-- Action Button -->
          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${email}?subject=Re: ${subject}" 
               style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Reply to ${name}
            </a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0; font-size: 14px;">
            This email was sent from your portfolio contact form
          </p>
          <p style="color: #9ca3af; margin: 5px 0 0 0; font-size: 12px;">
            Received on ${new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

      </div>
    </body>
    </html>
  `
}
