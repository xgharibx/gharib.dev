import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/appointments - Get available time slots for a date
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dateStr = searchParams.get('date')

    if (dateStr) {
      const date = new Date(dateStr)
      
      // Get booked appointments for the date
      const bookedAppointments = await prisma.appointment.findMany({
        where: {
          date: {
            gte: new Date(date.setHours(0, 0, 0, 0)),
            lt: new Date(date.setHours(23, 59, 59, 999)),
          },
          status: { in: ['PENDING', 'CONFIRMED'] },
        },
        select: { time: true },
      })

      const bookedTimes = bookedAppointments.map((apt: { time: string }) => apt.time)

      return NextResponse.json({
        success: true,
        data: { bookedTimes },
      })
    }

    // Get all appointments (admin only)
    const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: { name: true, email: true, phone: true },
        },
      },
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
    })

    return NextResponse.json({ success: true, data: appointments })
  } catch (error) {
    console.error('Get appointments error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}

// POST /api/appointments - Book an appointment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, type, date, time, topic, description } = body

    // Validate required fields
    if (!name || !email || !type || !date || !time || !topic) {
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

    // Parse date
    const appointmentDate = new Date(date)
    
    // Check if time slot is available
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        date: appointmentDate,
        time: time,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    })

    if (existingAppointment) {
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 400 }
      )
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

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        type,
        date: appointmentDate,
        time,
        topic,
        description,
        status: 'pending',
      },
    })

    // In production, you would also:
    // 1. Send confirmation email
    // 2. Add to Google Calendar
    // 3. Send reminder emails
    // 4. Process payment if applicable
    // 5. Send Zoom/Meet link

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment booked successfully',
        data: {
          appointmentId: appointment.id,
          date: appointment.date,
          time: appointment.time,
          type: appointment.type,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Appointment booking error:', error)
    return NextResponse.json(
      { error: 'Failed to book appointment' },
      { status: 500 }
    )
  }
}

// PATCH /api/appointments - Update appointment status (admin only)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { appointmentId, status } = body

    if (!appointmentId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
    })

    return NextResponse.json({
      success: true,
      message: 'Appointment updated',
      data: appointment,
    })
  } catch (error) {
    console.error('Update appointment error:', error)
    return NextResponse.json(
      { error: 'Failed to update appointment' },
      { status: 500 }
    )
  }
}
