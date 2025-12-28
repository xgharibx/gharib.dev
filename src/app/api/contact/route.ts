import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create message in database
    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: 'unread',
        isRead: false,
      },
    })

    // In production, you would also:
    // 1. Send email notification to admin
    // 2. Send confirmation email to user
    // 3. Integrate with CRM or ticketing system

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully',
        data: { id: newMessage.id }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

// GET /api/contact - Get all messages (admin only)
export async function GET(request: NextRequest) {
  try {
    // In production, add authentication check here
    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get('unread') === 'true'

    const messages = await prisma.message.findMany({
      where: unreadOnly ? { isRead: false } : {},
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: messages })
  } catch (error) {
    console.error('Get messages error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}
