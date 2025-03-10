import React from 'react';
import { Search } from 'lucide-react';

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDuration: number | '';
  setSelectedDuration: (duration: number | '') => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedDuration,
  setSelectedDuration,
  selectedCity,
  setSelectedCity,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search city..."
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration (months)</label>
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value ? Number(e.target.value) : '')}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Durations</option>
            <option value="3">3 months</option>
            <option value="4">4 months</option>
            <option value="6">6 months</option>
          </select>
        </div>
      </div>
    </div>
  );
};
