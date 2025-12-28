'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn, formatDate, formatPrice } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  Mail,
  TrendingUp,
  DollarSign,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  RefreshCw,
} from 'lucide-react'

// Mock data for demonstration
const stats = [
  {
    label: 'Total Revenue',
    value: '$45,231',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    label: 'Enrollments',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
  },
  {
    label: 'Active Courses',
    value: '8',
    change: '+2',
    trend: 'up',
    icon: BookOpen,
  },
  {
    label: 'Appointments',
    value: '24',
    change: '-3',
    trend: 'down',
    icon: Calendar,
  },
]

const recentEnrollments = [
  { id: 1, student: 'Ahmed Mohamed', email: 'ahmed@gmail.com', course: 'Next.js Mastery', date: '2024-01-15', status: 'active', amount: 299 },
  { id: 2, student: 'Sara Johnson', email: 'sara@outlook.com', course: 'Python for AI', date: '2024-01-14', status: 'pending', amount: 349 },
  { id: 3, student: 'Omar Hassan', email: 'omar@yahoo.com', course: 'React Fundamentals', date: '2024-01-14', status: 'active', amount: 199 },
  { id: 4, student: 'Mona Ali', email: 'mona@gmail.com', course: 'Flutter Development', date: '2024-01-13', status: 'active', amount: 279 },
  { id: 5, student: 'Karim Youssef', email: 'karim@company.com', course: 'Cloud Architecture', date: '2024-01-12', status: 'cancelled', amount: 399 },
]

const recentMessages = [
  { id: 1, name: 'John Smith', email: 'john@example.com', subject: 'Project Inquiry', date: '2024-01-15', read: false },
  { id: 2, name: 'Emily Davis', email: 'emily@startup.io', subject: 'Partnership Proposal', date: '2024-01-15', read: false },
  { id: 3, name: 'Michael Brown', email: 'michael@tech.com', subject: 'Course Question', date: '2024-01-14', read: true },
  { id: 4, name: 'Lisa Wilson', email: 'lisa@agency.com', subject: 'Consultation Request', date: '2024-01-13', read: true },
]

const upcomingAppointments = [
  { id: 1, client: 'Ahmed Kamal', type: 'Consultation', date: '2024-01-16', time: '10:00 AM', status: 'confirmed' },
  { id: 2, client: 'Sarah Ahmed', type: 'Mentoring', date: '2024-01-16', time: '2:00 PM', status: 'pending' },
  { id: 3, client: 'Mohamed Ali', type: 'Technical Review', date: '2024-01-17', time: '11:00 AM', status: 'confirmed' },
  { id: 4, client: 'Nour Hassan', type: 'Career Advice', date: '2024-01-17', time: '3:30 PM', status: 'pending' },
]

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'enrollments', label: 'Enrollments', icon: Users },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'messages', label: 'Messages', icon: Mail },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    }
    return (
      <span className={cn('rounded-full px-2 py-1 text-xs font-medium capitalize', styles[status as keyof typeof styles])}>
        {status}
      </span>
    )
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-10 w-10 animate-spin text-primary-500" />
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 dark:bg-dark-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Welcome back, Amr! Here&apos;s what&apos;s happening.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-full bg-white p-2 text-gray-500 shadow-sm hover:text-gray-700 dark:bg-dark-700 dark:text-gray-400 dark:hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                3
              </span>
            </button>
            <button className="flex items-center gap-2 rounded-full bg-primary-500 px-4 py-2 font-medium text-white shadow-sm transition-all hover:bg-primary-600">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex overflow-x-auto border-b border-gray-200 dark:border-dark-600">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl bg-white p-6 shadow-sm dark:bg-dark-700"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <span
                      className={cn(
                        'flex items-center gap-1 text-sm font-medium',
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      )}
                    >
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity Grid */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Recent Enrollments */}
              <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-dark-700">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                    Recent Enrollments
                  </h2>
                  <button className="text-sm text-primary-600 hover:underline dark:text-primary-400">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {recentEnrollments.slice(0, 4).map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="flex items-center justify-between rounded-xl bg-gray-50 p-3 dark:bg-dark-600"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                          {enrollment.student[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {enrollment.student}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {enrollment.course}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={enrollment.status} />
                        <p className="mt-1 text-xs text-gray-500">{formatPrice(enrollment.amount)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-dark-700">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                    Upcoming Appointments
                  </h2>
                  <button className="text-sm text-primary-600 hover:underline dark:text-primary-400">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between rounded-xl bg-gray-50 p-3 dark:bg-dark-600"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-100 font-semibold text-accent-600 dark:bg-accent-900/30 dark:text-accent-400">
                          {appointment.client[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {appointment.client}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {appointment.type}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={appointment.status} />
                        <p className="mt-1 text-xs text-gray-500">
                          {appointment.date} • {appointment.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Messages */}
              <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-dark-700 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                    Recent Messages
                  </h2>
                  <button className="text-sm text-primary-600 hover:underline dark:text-primary-400">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 text-left text-sm text-gray-500 dark:border-dark-600 dark:text-gray-400">
                        <th className="pb-3 font-medium">From</th>
                        <th className="pb-3 font-medium">Subject</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {recentMessages.map((message) => (
                        <tr key={message.id} className="border-b border-gray-100 dark:border-dark-600">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600 dark:bg-dark-600 dark:text-gray-400">
                                {message.name[0]}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{message.name}</p>
                                <p className="text-xs text-gray-500">{message.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-gray-700 dark:text-gray-300">{message.subject}</td>
                          <td className="py-3 text-gray-500">{message.date}</td>
                          <td className="py-3">
                            {message.read ? (
                              <span className="flex items-center gap-1 text-gray-500">
                                <Eye className="h-4 w-4" />
                                Read
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 font-medium text-primary-600 dark:text-primary-400">
                                <Mail className="h-4 w-4" />
                                New
                              </span>
                            )}
                          </td>
                          <td className="py-3">
                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                              <MoreHorizontal className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enrollments Tab */}
        {activeTab === 'enrollments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-6 shadow-sm dark:bg-dark-700"
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                All Enrollments
              </h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search enrollments..."
                    className="rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm focus:border-primary-500 focus:outline-none dark:border-dark-600 dark:bg-dark-600"
                  />
                </div>
                <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:border-dark-600 dark:bg-dark-600 dark:text-gray-300">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-sm text-gray-500 dark:border-dark-600 dark:text-gray-400">
                    <th className="pb-3 font-medium">Student</th>
                    <th className="pb-3 font-medium">Course</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentEnrollments.map((enrollment) => (
                    <tr key={enrollment.id} className="border-b border-gray-100 dark:border-dark-600">
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{enrollment.student}</p>
                          <p className="text-xs text-gray-500">{enrollment.email}</p>
                        </div>
                      </td>
                      <td className="py-4 text-gray-700 dark:text-gray-300">{enrollment.course}</td>
                      <td className="py-4 text-gray-500">{enrollment.date}</td>
                      <td className="py-4 font-medium text-gray-900 dark:text-white">{formatPrice(enrollment.amount)}</td>
                      <td className="py-4"><StatusBadge status={enrollment.status} /></td>
                      <td className="py-4">
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-6 shadow-sm dark:bg-dark-700"
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                All Appointments
              </h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:border-dark-600 dark:bg-dark-600 dark:text-gray-300">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-xl border border-gray-200 p-4 dark:border-dark-600"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-semibold text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                        {appointment.client[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{appointment.client}</p>
                        <p className="text-sm text-gray-500">{appointment.type}</p>
                      </div>
                    </div>
                    <StatusBadge status={appointment.status} />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {appointment.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {appointment.time}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 rounded-lg bg-primary-100 px-3 py-2 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400">
                      <CheckCircle className="mr-1 inline h-4 w-4" />
                      Confirm
                    </button>
                    <button className="flex-1 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">
                      <XCircle className="mr-1 inline h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-6 shadow-sm dark:bg-dark-700"
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                All Messages
              </h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm focus:border-primary-500 focus:outline-none dark:border-dark-600 dark:bg-dark-600"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'rounded-xl border p-4 transition-colors',
                    message.read
                      ? 'border-gray-200 bg-white dark:border-dark-600 dark:bg-dark-700'
                      : 'border-primary-200 bg-primary-50 dark:border-primary-900 dark:bg-primary-900/20'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-600 dark:bg-dark-600 dark:text-gray-400">
                        {message.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 dark:text-white">{message.name}</p>
                          {!message.read && (
                            <span className="h-2 w-2 rounded-full bg-primary-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{message.email}</p>
                        <p className="mt-1 font-medium text-gray-700 dark:text-gray-300">{message.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{message.date}</p>
                      <button className="mt-2 text-sm text-primary-600 hover:underline dark:text-primary-400">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
