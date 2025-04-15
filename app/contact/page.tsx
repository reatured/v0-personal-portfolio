import { ContactForm } from "@/components/contact-form"
import { Instagram, Linkedin, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Contact Me</h1>
      <p className="text-xl mb-8">I'm always open to new opportunities and collaborations. Feel free to reach out!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:lingyi.zhou@nyu.edu" className="hover:underline">
                lingyi.zhou@nyu.edu
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+19292847788" className="hover:underline">
                +1 (929) 284-7788
              </a>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Social Media</h3>
            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/lingyi_zhou/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/lingyizhou/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <p>New York, NY</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
