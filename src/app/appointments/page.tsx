'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { appointmentTypes, timeSlots } from '@/lib/constants'
import { RevealOnScroll } from '@/components/ui/animated-text'
import { FloatingBlobs } from '@/components/ui/particle-background'
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Check,
  Video,
  DollarSign,
} from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { format, addDays, startOfWeek, isSameDay, isAfter } from 'date-fns'

interface BookingFormData {
  name: string
  email: string
  phone: string
  topic: string
  description: string
}

export default function AppointmentsPage() {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<typeof appointmentTypes[0] | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>()

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i))
  const today = new Date()

  const nextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7))
  }

  const prevWeek = () => {
    const newStart = addDays(currentWeekStart, -7)
    if (isAfter(addDays(newStart, 6), today) || isSameDay(addDays(newStart, 6), today)) {
      setCurrentWeekStart(newStart)
    }
  }

  const handleDateSelect = (date: Date) => {
    if (isAfter(date, today) || isSameDay(date, today)) {
      setSelectedDate(date)
      setSelectedTime(null)
    }
  }

  const onSubmit = async (data: BookingFormData) => {
    if (!selectedType || !selectedDate || !selectedTime) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      toast.success('Appointment booked successfully! You will receive a confirmation email shortly.')
      
      // Reset form
      reset()
      setStep(1)
      setSelectedType(null)
      setSelectedDate(null)
      setSelectedTime(null)
    } catch {
      toast.error('Failed to book appointment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedType !== null
      case 2:
        return selectedDate !== null && selectedTime !== null
      case 3:
        return true
      default:
        return false
    }
  }

  return (
    <div className="relative min-h-screen pt-20">
      <FloatingBlobs />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              <Calendar className="h-4 w-4" />
              Book an Appointment
            </span>
            <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              Schedule a
              <span className="gradient-text"> Session</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Let&apos;s discuss your project, answer your questions, or help you grow as a developer
            </p>
          </div>
        </RevealOnScroll>

        {/* Progress Steps */}
        <RevealOnScroll>
          <div className="mb-12">
            <div className="flex items-center justify-center">
              {[1, 2, 3].map((s, i) => (
                <div key={s} className="flex items-center">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-colors',
                      step >= s
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 text-gray-500 dark:bg-dark-600 dark:text-gray-400'
                    )}
                  >
                    {step > s ? <Check className="h-5 w-5" /> : s}
                  </div>
                  {i < 2 && (
                    <div
                      className={cn(
                        'h-1 w-16 transition-colors sm:w-24',
                        step > s ? 'bg-primary-500' : 'bg-gray-200 dark:bg-dark-600'
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-12 sm:gap-20">
              <span className={cn('text-sm', step >= 1 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500')}>
                Select Type
              </span>
              <span className={cn('text-sm', step >= 2 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500')}>
                Pick Time
              </span>
              <span className={cn('text-sm', step >= 3 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500')}>
                Details
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Main Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-dark-600 dark:bg-dark-700"
        >
          {/* Step 1: Select Appointment Type */}
          {step === 1 && (
            <div>
              <h2 className="mb-6 font-display text-2xl font-bold text-gray-900 dark:text-white">
                Select Appointment Type
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {appointmentTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedType(type)}
                    className={cn(
                      'flex flex-col items-start rounded-2xl border-2 p-6 text-left transition-all',
                      selectedType?.id === type.id
                        ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20'
                        : 'border-gray-200 hover:border-gray-300 dark:border-dark-600 dark:hover:border-dark-500'
                    )}
                  >
                    <div className="mb-3 flex w-full items-center justify-between">
                      <span className="font-display text-lg font-bold text-gray-900 dark:text-white">
                        {type.name}
                      </span>
                      {selectedType?.id === type.id && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-white">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                      {type.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Clock className="h-4 w-4" />
                        {type.duration} min
                      </span>
                      <span className={cn(
                        'flex items-center gap-1 font-semibold',
                        type.price === 0
                          ? 'text-accent-600 dark:text-accent-400'
                          : 'text-primary-600 dark:text-primary-400'
                      )}>
                        <DollarSign className="h-4 w-4" />
                        {type.price === 0 ? 'Free' : formatPrice(type.price)}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div>
              <h2 className="mb-6 font-display text-2xl font-bold text-gray-900 dark:text-white">
                Pick a Date & Time
              </h2>

              {/* Calendar */}
              <div className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                  <button
                    onClick={prevWeek}
                    className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-600"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {format(currentWeekStart, 'MMMM yyyy')}
                  </span>
                  <button
                    onClick={nextWeek}
                    className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-600"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="py-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                  {weekDays.map((date) => {
                    const isPast = !isAfter(date, today) && !isSameDay(date, today)
                    const isSelected = selectedDate && isSameDay(date, selectedDate)
                    const isToday = isSameDay(date, today)

                    return (
                      <button
                        key={date.toISOString()}
                        onClick={() => handleDateSelect(date)}
                        disabled={isPast}
                        className={cn(
                          'rounded-xl py-3 text-center transition-all',
                          isPast
                            ? 'cursor-not-allowed text-gray-300 dark:text-gray-600'
                            : isSelected
                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                            : isToday
                            ? 'bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400'
                            : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-dark-600'
                        )}
                      >
                        <div className="text-lg font-semibold">{format(date, 'd')}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                    Available Times for {format(selectedDate, 'EEEE, MMMM d')}
                  </h3>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          'rounded-xl py-3 text-center text-sm font-medium transition-all',
                          selectedTime === time
                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-dark-600 dark:text-gray-300 dark:hover:bg-dark-500'
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Contact Details */}
          {step === 3 && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="mb-6 font-display text-2xl font-bold text-gray-900 dark:text-white">
                Your Details
              </h2>

              {/* Summary */}
              <div className="mb-8 rounded-2xl bg-gray-50 p-6 dark:bg-dark-600">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Video className="h-4 w-4" />
                    <span>{selectedType?.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{selectedTime} ({selectedType?.duration} minutes)</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-primary-600 dark:text-primary-400">
                    <DollarSign className="h-4 w-4" />
                    <span>{selectedType?.price === 0 ? 'Free' : formatPrice(selectedType?.price || 0)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        className={cn(
                          'input-field pl-12',
                          errors.name && 'border-red-500'
                        )}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                        })}
                        type="email"
                        className={cn(
                          'input-field pl-12',
                          errors.email && 'border-red-500'
                        )}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('phone', { required: 'Phone number is required' })}
                      type="tel"
                      className={cn(
                        'input-field pl-12',
                        errors.phone && 'border-red-500'
                      )}
                      placeholder="+1 (234) 567-8900"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Topic *
                  </label>
                  <input
                    {...register('topic', { required: 'Topic is required' })}
                    type="text"
                    className={cn(
                      'input-field',
                      errors.topic && 'border-red-500'
                    )}
                    placeholder="What would you like to discuss?"
                  />
                  {errors.topic && (
                    <p className="mt-1 text-sm text-red-500">{errors.topic.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Additional Details (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <textarea
                      {...register('description')}
                      rows={4}
                      className="input-field resize-none pl-12"
                      placeholder="Any specific questions or context you'd like to share..."
                    />
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-3 font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-3 font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Booking...
                  </>
                ) : (
                  <>
                    Confirm Booking
                    <Check className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
