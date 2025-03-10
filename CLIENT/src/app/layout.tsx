import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Commit & Conquer - Master Your Development Workflow',
  description: 'A modern platform for developers to streamline their coding process and boost productivity.',
  keywords: 'development, coding, git, productivity, workflow, collaboration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="site-header">
          <div className="header-container">
            <div className="logo">
              <img src="/favicon.ico" alt="Commit & Conquer Logo" className="logo-img" />
              <span className="logo-text">Commit & Conquer</span>
            </div>
            <nav className="main-nav">
              <ul className="nav-list">
                <li className="nav-item"><Link href="/">Home</Link></li>
                <li className="nav-item"><Link href="/">Features</Link></li>
                <li className="nav-item"><Link href="/">Blog</Link></li>
                <li className="nav-item"><Link href="/">Dashboard</Link></li>
              </ul>
            </nav>
            <div className="auth-buttons">
              <Link href="/" className="login-btn">Login</Link>
              <Link href="/" className="signup-btn">Sign Up</Link>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="footer-container">
            <div className="footer-info">
              <h3>Commit & Conquer</h3>
              <p>Elevate your development workflow</p>
            </div>
            <div className="footer-links">
              <div className="footer-section">
                <h4>Product</h4>
                <ul>
                  <li><Link href="/">Features</Link></li>
                  <li><Link href="/">Pricing</Link></li>
                  <li><Link href="/">Roadmap</Link></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Resources</h4>
                <ul>
                  <li><Link href="/">Blog</Link></li>
                  <li><Link href="/">Documentation</Link></li>
                  <li><Link href="/">Guides</Link></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Company</h4>
                <ul>
                  <li><Link href="/">About Us</Link></li>
                  <li><Link href="/">Contact</Link></li>
                  <li><Link href="/">Careers</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Commit & Conquer. All rights reserved.</p>
            <div className="footer-social">
              <Link href="#" aria-label="GitHub"><span className="social-icon">GitHub</span></Link>
              <Link href="#" aria-label="Twitter"><span className="social-icon">Twitter</span></Link>
              <Link href="#" aria-label="LinkedIn"><span className="social-icon">LinkedIn</span></Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}