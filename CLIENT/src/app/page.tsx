'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Commit & Conquer</h1>
          <p className="hero-subtitle">Master your development workflow with ease</p>
          <div className="cta-buttons">
            <Link href="/signup">
              <button className="cta-primary">Get Started</button>
            </Link>
            <Link href="/dashboard">
              <button className="cta-secondary">View Dashboard</button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div style={{ position: 'relative', width: '100%', height: '300px' }}>
            {/* You can replace this with your actual hero image */}
            <div className="placeholder-image">
              <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <rect x="50" y="50" width="300" height="200" fill="#e6f7ff" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="200" cy="150" r="80" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
                <path d="M120 180 L280 120" stroke="#3b82f6" strokeWidth="3" />
                <text x="160" y="155" fill="#1f2937" fontSize="16" fontWeight="bold">Commit & Conquer</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose Commit & Conquer?</h2>
        <div className="feature-grid">
          {[
            {
              title: 'Simplified Workflow',
              description: 'Streamline your development process with intuitive tools',
              icon: '⚡'
            },
            {
              title: 'Real-time Collaboration',
              description: 'Work seamlessly with your team members across projects',
              icon: '👥'
            },
            {
              title: 'Performance Tracking',
              description: 'Monitor your productivity with detailed analytics',
              icon: '📊'
            },
            {
              title: 'Customizable Experience',
              description: 'Tailor the platform to suit your specific needs',
              icon: '🔧'
            }
          ].map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonial-carousel">
          {[
            {
              quote: "Commit & Conquer has transformed how our team collaborates on projects. It's an essential tool in our development workflow.",
              author: "Sarah Chen",
              role: "Senior Developer at TechFlow"
            },
            {
              quote: "The intuitive interface and powerful features make this platform stand out from the competition.",
              author: "Marcus Johnson",
              role: "CTO at DevInnovate"
            }
          ].map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-author">{testimonial.author}</div>
              <div className="testimonial-role">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to transform your development experience?</h2>
          <p className="cta-description">Join thousands of developers who've already improved their workflow.</p>
          <Link href="/signup">
            <button className="cta-button">Start Your Free Trial</button>
          </Link>
        </div>
      </section>
    </div>
  );
}