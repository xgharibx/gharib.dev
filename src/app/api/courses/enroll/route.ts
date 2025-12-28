import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST /api/courses/enroll - Enroll in a course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, courseId, paymentMethod } = body

    // Validate required fields
    if (!name || !email || !courseId) {
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

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    })

    if (!course) {
      // Course might be static, proceed anyway
      console.log('Course not in DB, proceeding with static course:', courseId)
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          phone,
        },
      })
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId: courseId,
      },
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      )
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: courseId,
        status: paymentMethod === 'later' ? 'pending' : 'active',
        paymentStatus: paymentMethod === 'later' ? 'pending' : 'paid',
      },
    })

    // In production, you would also:
    // 1. Process payment if not "pay later"
    // 2. Send confirmation email
    // 3. Grant access to course materials
    // 4. Add to LMS system

    return NextResponse.json(
      {
        success: true,
        message: 'Enrollment successful',
        data: {
          enrollmentId: enrollment.id,
          status: enrollment.status,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Enrollment error:', error)
    return NextResponse.json(
      { error: 'Failed to process enrollment' },
      { status: 500 }
    )
  }
}
