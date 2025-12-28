import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { courses } from '@/lib/constants'

// GET /api/courses - Get all courses
export async function GET() {
  try {
    // In production, fetch from database
    // For now, return static courses with enrollment counts
    const dbCourses = await prisma.course.findMany({
      include: {
        _count: {
          select: { enrollments: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Merge with static data if DB is empty
    const responseData = dbCourses.length > 0 
      ? dbCourses 
      : courses.map(course => ({
          ...course,
          enrollmentCount: course.students,
        }))

    return NextResponse.json({ 
      success: true, 
      data: responseData 
    })
  } catch (error) {
    console.error('Get courses error:', error)
    // Return static data as fallback
    return NextResponse.json({ 
      success: true, 
      data: courses 
    })
  }
}
