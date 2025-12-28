import { Metadata } from 'next'
import { ContactSection } from '@/components/sections/contact-section'

export const metadata: Metadata = {
  title: 'Contact Me',
  description: 'Get in touch with Amr Gharib for project inquiries, collaborations, or any questions. Available for consulting, development projects, and training.',
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactSection />
    </div>
  )
}
