import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-gray-700 mb-6">
        By using our platform, you agree to these terms and conditions. Please read them carefully.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p className="text-gray-700">
          Welcome to our platform. These Terms of Service ("Terms") are an agreement between you ("User" or "you" or "your") and our company ("we" or "us" or "our"). This agreement sets forth the general terms and conditions of your use of our platform and any of its products or services (collectively, "Platform" or "Services").
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. User Accounts</h2>
        <p className="text-gray-700">
          If you create an account on the Platform, you are responsible for maintaining the security of your account and password. You are responsible for any activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account or password, or any other breach of security.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Intellectual Property Rights</h2>
        <p className="text-gray-700">
          Unless otherwise indicated, the Platform is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Platform (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. User Content</h2>
        <p className="text-gray-700">
          You grant us a royalty-free, irrevocable, perpetual, non-exclusive license to use, reproduce, modify, publish, edit, translate, distribute, perform, and display your User Content alone or as part of other works in any form, media, or technology whether now known or hereafter developed. As between you and us, you remain the owner of the User Content submitted on, through, or in connection with the Platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Termination</h2>
        <p className="text-gray-700">
          We may terminate or suspend your account and bar access to the Platform immediately, without prior notice or liability, under our sole discretion, for any reason and without limitation, including but not limited to a breach of the Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Governing Law</h2>
        <p className="text-gray-700">
          These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.
        </p>
      </section>

      <p className="text-gray-700">
        Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Platform, and supersede and replace any prior agreements we might have between us regarding the Platform.
      </p>
    </div>
  );
};

export default TermsPage;
