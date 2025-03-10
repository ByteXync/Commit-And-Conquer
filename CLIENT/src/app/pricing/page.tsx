
"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Choose Your Plan
        </motion.h1>
        <p className="text-lg text-gray-200 mb-12">
          Get the best features for your needs with our flexible pricing plans.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-white text-gray-900 rounded-2xl shadow-lg p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
              <p className="text-gray-600 text-lg font-medium mb-6">{plan.price}</p>
              <ul className="text-gray-700 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 mb-2">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const plans = [
  {
    name: "Basic",
    price: "Free",
    features: ["Access to free courses", "Community support"],
  },
  {
    name: "Standard",
    price: "$9.99/month",
    features: ["Everything in Basic", "Advanced tutorials", "Priority support"],
  },
  {
    name: "Premium",
    price: "$19.99/month",
    features: [
      "Everything in Standard",
      "Exclusive resources",
      "One-on-one mentorship",
    ],
  },
];

export default PricingPage;
