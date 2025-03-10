"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDuration: number | "";
  setSelectedDuration: (duration: number | "") => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  stipendRange: [number | "", number | ""];
  setStipendRange: (range: [number | "", number | ""]) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedDuration,
  setSelectedDuration,
  selectedCity,
  setSelectedCity,
  stipendRange,
  setStipendRange,
}) => {
  const [customStipendRange, setCustomStipendRange] = useState(false);
  const [selectedStipendPreset, setSelectedStipendPreset] = useState("");

  const handleStipendPresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedStipendPreset(value);

    if (value === "custom") {
      setCustomStipendRange(true);
      setStipendRange(["", ""]); // Reset custom values
      return;
    }

    setCustomStipendRange(false);

    if (!value) {
      setStipendRange(["", ""]);
      return;
    }

    const [min, max] = value.split("-").map(val => Number(val));
    setStipendRange([min || "", max || ""]);
  };

  const handleMinStipendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim() ? Number(e.target.value) : "";
    setStipendRange([value, stipendRange[1]]);
  };

  const handleMaxStipendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim() ? Number(e.target.value) : "";
    setStipendRange([stipendRange[0], value]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            placeholder="Search city..."
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Duration Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration (months)</label>
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value ? Number(e.target.value) : "")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Durations</option>
            <option value="3">3 months</option>
            <option value="4">4 months</option>
            <option value="6">6 months</option>
          </select>
        </div>

        {/* Stipend Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stipend Range (₹)</label>
          <select
            value={selectedStipendPreset}
            onChange={handleStipendPresetChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          >
            <option value="">All Stipends</option>
            <option value="5000-10000">₹5,000 - ₹10,000</option>
            <option value="10000-15000">₹10,000 - ₹15,000</option>
            <option value="15000-20000">₹15,000 - ₹20,000</option>
            <option value="20000-25000">₹20,000 - ₹25,000</option>
            <option value="25000-30000">₹25,000 - ₹30,000</option>
            <option value="custom">Custom Range</option>
          </select>

          {/* Custom Stipend Range */}
          {customStipendRange && (
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="number"
                placeholder="Min"
                value={stipendRange[0] === "" ? "" : stipendRange[0]}
                onChange={handleMinStipendChange}
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                placeholder="Max"
                value={stipendRange[1] === "" ? "" : stipendRange[1]}
                onChange={handleMaxStipendChange}
                className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

