import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileCode, ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <FileCode className="h-6 w-6" />
            <span>Commit & Conquer</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 container py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <div className="prose prose-sm sm:prose max-w-none">
            <p className="text-muted-foreground mb-4">Last updated: March 10, 2025</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              At Commit & Conquer, we respect your privacy and are committed to protecting your personal data. This
              Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p>We collect several types of information from and about users of our platform, including:</p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Personal identifiers such as name, email address, and phone number</li>
              <li>Professional information such as resume data, work history, and skills</li>
              <li>Usage data including how you interact with our platform</li>
              <li>Device information such as IP address, browser type, and operating system</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Provide and maintain our services</li>
              <li>Match you with potential job opportunities</li>
              <li>Improve and personalize your experience</li>
              <li>Communicate with you about our services</li>
              <li>Ensure the security of our platform</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Employers and recruiters when you apply for jobs</li>
              <li>Service providers who help us operate our platform</li>
              <li>Legal authorities when required by law</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our platform and to hold certain
              information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
              sent.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
            <p>
              Our platform is not intended for children under 16 years of age. We do not knowingly collect personal
              information from children under 16.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@commitandconquer.com" className="text-primary hover:underline">
                privacy@commitandconquer.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex items-center gap-2">
            <FileCode className="h-6 w-6" />
            <span className="text-lg font-bold">Commit & Conquer</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Commit & Conquer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

