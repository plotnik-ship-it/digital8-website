// src/pages/api/send-email.ts
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// IMPORTANT: The API key is read from environment variables for security.
const resend = new Resend(import.meta.env.RESEND_API_KEY);

// This is the API endpoint that the contact form will call.
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation to ensure all fields are present.
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Send the email using the Resend SDK.
    const { data, error } = await resend.emails.send({
      // NOTE: You must verify this domain in your Resend account.
      // Using "onboarding@resend.dev" is a temporary placeholder for development.
      from: 'Digital8 Contact Form <onboarding@resend.dev>', 
      to: ['daniel@digital8.ca'], // Your destination email address.
      subject: `New message from ${name} via Digital8.ca`,
      html: `<p>You have a new contact form submission:</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, '<br>')}</p>`,
      reply_to: email,
    });

    if (error) {
      console.error({ error });
      return new Response(
        JSON.stringify({ message: 'Error sending email.', error: error.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Message sent successfully!' }),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ message: 'An unexpected error occurred.' }),
      { status: 500 }
    );
  }
};
