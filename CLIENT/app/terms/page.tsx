import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileCode, ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

          <div className="prose prose-sm sm:prose max-w-none">
            <p className="text-muted-foreground mb-4">Last updated: March 10, 2025</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to Commit & Conquer. These Terms and Conditions govern your use of our website and services. By
              accessing or using our platform, you agree to be bound by these Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Definitions</h2>
            <p>"Service" refers to the Commit & Conquer platform.</p>
            <p>"User" refers to individuals who register and use our Service.</p>
            <p>"Content" refers to all information displayed on our Service, including text, images, and data.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p>
              To use certain features of our Service, you must register for an account. You are responsible for
              maintaining the confidentiality of your account information and for all activities that occur under your
              account.
            </p>
            <p>
              You agree to provide accurate and complete information when creating an account and to update your
              information to keep it accurate and current.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. User Content</h2>
            <p>
              You retain all rights to the content you submit to our Service, including resumes, profiles, and other
              materials. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use,
              reproduce, and display such content in connection with providing our Service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Acceptable Use</h2>
            <p>
              You agree not to use our Service for any unlawful purpose or in any way that could damage, disable, or
              impair our Service.
            </p>
            <p>
              You agree not to attempt to gain unauthorized access to any part of our Service, other accounts, or
              computer systems.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Termination</h2>
            <p>
              We may terminate or suspend your account and access to our Service immediately, without prior notice or
              liability, for any reason, including if you breach these Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
            <p>
              In no event shall Commit & Conquer be liable for any indirect, incidental, special, consequential, or
              punitive damages, including loss of profits, data, or goodwill, arising out of or in connection with your
              use of our Service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes by
              posting the updated Terms on our website. Your continued use of our Service after such changes constitutes
              your acceptance of the new Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States, without
              regard to its conflict of law provisions.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:support@commitandconquer.com" className="text-primary hover:underline">
                support@commitandconquer.com
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

