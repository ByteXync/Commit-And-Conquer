"use client"
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDuration: number | '';
  setSelectedDuration: (duration: number | '') => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  stipendRange: [number | '', number | ''];
  setStipendRange: (range: [number | '', number | '']) => void;
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
  const [selectedStipendPreset, setSelectedStipendPreset] = useState('');

  const handleStipendPresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedStipendPreset(value);

    if (value === 'custom') {
      setCustomStipendRange(true);
      setStipendRange(['', '']); // Reset custom values
      return;
    }

    setCustomStipendRange(false);

    if (!value) {
      setStipendRange(['', '']);
      return;
    }

    const [min, max] = value.split('-').map(val => Number(val));
    setStipendRange([min || '', max || '']);
  };

  const handleMinStipendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim() ? Number(e.target.value) : '';
    setStipendRange([value, stipendRange[1]]);
  };

  const handleMaxStipendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim() ? Number(e.target.value) : '';
    setStipendRange([stipendRange[0], value]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search internships..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
        />

        <input
          type="text"
          placeholder="Search city..."
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
        />

        <select value={selectedStipendPreset} onChange={handleStipendPresetChange} className="w-full p-2 border border-gray-300 rounded-md">
          <option value="">All Stipends</option>
          <option value="5000-10000">₹5,000 - ₹10,000</option>
          <option value="10000-15000">₹10,000 - ₹15,000</option>
          <option value="custom">Custom Range</option>
        </select>

        {customStipendRange && (
          <div className="flex space-x-2">
            <input type="number" placeholder="Min" value={stipendRange[0]} onChange={handleMinStipendChange} />
            <input type="number" placeholder="Max" value={stipendRange[1]} onChange={handleMaxStipendChange} />
          </div>
        )}
      </div>
    </div>
  );
};

