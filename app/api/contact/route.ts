import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const CONTACT_EMAIL = 'my@email.com'

interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as ContactFormData
    const { name, email, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid form data.' },
        { status: 400 }
      )
    }

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { error: 'Name, email, and message cannot be empty.' },
        { status: 400 }
      )
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: `Pool Rental Contact <${CONTACT_EMAIL}>`,
      to: [CONTACT_EMAIL],
      replyTo: trimmedEmail,
      subject: `New Contact Form Message from ${trimmedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0369a1; border-bottom: 2px solid #0369a1; padding-bottom: 10px;">
            🏊 New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; background: #f0f9ff; font-weight: bold; width: 120px; border-radius: 4px 0 0 4px;">Name</td>
              <td style="padding: 10px; background: #f8fafc; border-radius: 0 4px 4px 0;">${trimmedName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f0f9ff; font-weight: bold; margin-top: 4px; border-radius: 4px 0 0 4px;">Email</td>
              <td style="padding: 10px; background: #f8fafc; margin-top: 4px; border-radius: 0 4px 4px 0;">
                <a href="mailto:${trimmedEmail}" style="color: #0369a1;">${trimmedEmail}</a>
              </td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <p style="font-weight: bold; color: #374151; margin-bottom: 8px;">Message:</p>
            <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #0369a1; white-space: pre-wrap; color: #374151; line-height: 1.6;">
              ${trimmedMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
            </div>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
            This message was sent via the Pool Rental Marketplace contact form.
            Reply directly to this email to respond to ${trimmedName}.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}