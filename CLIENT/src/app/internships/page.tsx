"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import axios from 'axios'
import { Internship } from '../types/types'
import { InternshipCard } from '@/components/internships/IntershipCard';
import { Filters } from '@/components/internships/Filters';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<number | ''>('');
  const [selectedCity, setSelectedCity] = useState('');
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<Internship[]>('http://localhost:8000/api/fetchinternships');
        setInternships(response.data);
      } catch (err) {
        setError('Failed to fetch internships. Please try again later.');
        console.error('Error fetching internships:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  const filteredInternships = useMemo(() => {
    return internships.filter(internship => {
      const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDuration = !selectedDuration || internship.duration === selectedDuration;
      const matchesCity = !selectedCity ||
        internship.location.toLowerCase().includes(selectedCity.toLowerCase());

      return matchesSearch && matchesDuration && matchesCity;
    });
  }, [internships, searchQuery, selectedDuration, selectedCity]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Internship Board</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Filters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDuration={selectedDuration}
              setSelectedDuration={setSelectedDuration}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredInternships.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No internships found matching your criteria.</p>
                  </div>
                ) : (
                  filteredInternships.map(internship => (
                    <InternshipCard key={internship.id} internship={internship} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
