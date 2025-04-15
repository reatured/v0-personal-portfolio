import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Define the expected request body structure
type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = (await request.json()) as ContactFormData

    // Validate the required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json({ error: "Name, email, subject, and message are required" }, { status: 400 })
    }

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Set up email data
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL, // Your email address where you want to receive messages
      replyTo: body.email,
      subject: `Portfolio Contact: ${body.subject}`,
      text: `
Name: ${body.name}
Email: ${body.email}

Message:
${body.message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${body.name}</p>
  <p><strong>Email:</strong> ${body.email}</p>
  <p><strong>Subject:</strong> ${body.subject}</p>
  <h3 style="color: #555;">Message:</h3>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
    ${body.message.replace(/\n/g, "<br>")}
  </div>
</div>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    // Return success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
