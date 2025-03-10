import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-4">
        We're here to help! If you have any questions, feedback, or need assistance, please don't hesitate to reach out to us.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Email</h2>
        <p className="text-gray-700">
          You can email us at <a href="mailto:support@yourcompany.com" className="text-blue-500">support@yourcompany.com</a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Phone</h2>
        <p className="text-gray-700">
          Call us at <a href="tel:+1234567890" className="text-blue-500">+1 (234) 567-890</a> during our business hours.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Address</h2>
        <p className="text-gray-700">
          Visit us at:
          <br />
          123 Main Street
          <br />
          City, State, ZIP Code
          <br />
          Country
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Business Hours</h2>
        <p className="text-gray-700">
          Monday - Friday: 9:00 AM - 5:00 PM
          <br />
          Saturday - Sunday: Closed
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Social Media</h2>
        <p className="text-gray-700">
          Connect with us on:
          <br />
          <a href="https://facebook.com/yourcompany" className="text-blue-500">Facebook</a>
          <br />
          <a href="https://twitter.com/yourcompany" className="text-blue-500">Twitter</a>
          <br />
          <a href="https://instagram.com/yourcompany" className="text-blue-500">Instagram</a>
        </p>
      </section>

      <p className="text-gray-700">
        We look forward to hearing from you!
      </p>
    </div>
  );
};

export default ContactPage;
