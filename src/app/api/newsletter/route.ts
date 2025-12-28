import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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

    // Check if already subscribed
    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email },
    })

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json(
          { error: 'Already subscribed to newsletter' },
          { status: 400 }
        )
      } else {
        // Reactivate subscription
        await prisma.newsletter.update({
          where: { email },
          data: { isActive: true },
        })

        return NextResponse.json({
          success: true,
          message: 'Subscription reactivated successfully',
        })
      }
    }

    // Create new subscription
    await prisma.newsletter.create({
      data: {
        email,
        name,
        isActive: true,
      },
    })

    // In production, you would also:
    // 1. Send welcome email
    // 2. Add to email marketing platform (Mailchimp, ConvertKit, etc.)
    // 3. Trigger welcome automation sequence

    return NextResponse.json(
      {
        success: true,
        message: 'Subscribed successfully! Check your email for confirmation.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

// DELETE /api/newsletter - Unsubscribe from newsletter
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const subscriber = await prisma.newsletter.findUnique({
      where: { email },
    })

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      )
    }

    await prisma.newsletter.update({
      where: { email },
      data: { isActive: false },
    })

    return NextResponse.json({
      success: true,
      message: 'Unsubscribed successfully',
    })
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
}
