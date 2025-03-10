import React from "react";
import { FaBriefcase, FaUsers, FaRocket } from "react-icons/fa";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 text-center mb-12">
          🚀 Explore Our Internship Portal Features
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-gradient-to-br from-blue-200 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-xl p-8 transform hover:-translate-y-3 transition duration-300">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full mx-auto mb-4">
              <FaBriefcase size={30} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-3">
              Internship Listings
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              Discover a wide array of internships tailored to your interests and skills.
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li>Personalized recommendations</li>
              <li>Advanced search filters</li>
              <li>Real-time updates on new listings</li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-gradient-to-br from-green-200 to-green-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-xl p-8 transform hover:-translate-y-3 transition duration-300">
            <div className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full mx-auto mb-4">
              <FaUsers size={30} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-3">
              Connect with Mentors
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              Forge meaningful connections with industry experts.
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li>One-on-one mentorship sessions</li>
              <li>Networking opportunities</li>
              <li>Career advice and guidance</li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-gradient-to-br from-purple-200 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-xl p-8 transform hover:-translate-y-3 transition duration-300">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-500 text-white rounded-full mx-auto mb-4">
              <FaRocket size={30} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-3">
              Skill Development
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              Elevate your expertise with our comprehensive resources.
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li>Interactive courses and workshops</li>
              <li>Hands-on projects and assignments</li>
              <li>Certification programs</li>
            </ul>
          </div>

          {/* Feature 4 */}
          <div className="bg-gradient-to-br from-yellow-200 to-yellow-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-xl p-8 transform hover:-translate-y-3 transition duration-300">
            <div className="flex items-center justify-center w-16 h-16 bg-yellow-500 text-white rounded-full mx-auto mb-4">
              <FaBriefcase size={30} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-3">
              Resume Builder
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              Craft a professional resume that stands out to employers.
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li>Customizable templates</li>
              <li>Expert tips and advice</li>
              <li>Downloadable in multiple formats</li>
            </ul>
          </div>

          {/* Feature 5 */}
          <div className="bg-gradient-to-br from-red-200 to-red-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-xl p-8 transform hover:-translate-y-3 transition duration-300">
            <div className="flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-full mx-auto mb-4">
              <FaUsers size={30} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-3">
              Interview Preparation
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              Ace your interviews with our comprehensive preparation tools.
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li>Mock interviews with experts</li>
              <li>Common interview questions and answers</li>
              <li>Personalized feedback and guidance</li>
            </ul>
          </div>

          {/* Feature 6 */}
          <div className="bg-gradient-to-br from-teal-200 to-teal-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-xl p-8 transform hover:-translate-y-3 transition duration-300">
            <div className="flex items-center justify-center w-16 h-16 bg-teal-500 text-white rounded-full mx-auto mb-4">
              <FaRocket size={30} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-3">
              Career Counseling
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              Get personalized career advice from experienced counselors.
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-gray-600 dark:text-gray-400">
              <li>One-on-one counseling sessions</li>
              <li>Career path exploration</li>
              <li>Job search strategies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
