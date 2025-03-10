import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
        <p className="text-gray-700">
          We may collect personal information such as your name, email address, and other contact details when you use our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
        <p className="text-gray-700">
          We use the information we collect to provide and improve our services, to communicate with you, and to personalize your experience.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">How We Protect Your Information</h2>
        <p className="text-gray-700">
          We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Cookies and Tracking Technologies</h2>
        <p className="text-gray-700">
          We may use cookies and other tracking technologies to enhance your browsing experience and to analyze how our services are used.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
        <p className="text-gray-700">
          We may use third-party services to provide certain features or functionalities. These services may have their own privacy policies.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
        <p className="text-gray-700">
          You have the right to access, correct, or delete your personal information. You can also opt-out of receiving communications from us.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Changes to This Policy</h2>
        <p className="text-gray-700">
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </p>
      </section>

      <p className="text-gray-700">
        If you have any questions about this privacy policy, please contact us at [contact email].
      </p>
    </div>
  );
};

export default PrivacyPage;
