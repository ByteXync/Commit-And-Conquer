import React from 'react';
import { Building2, MapPin, Clock, DollarSign } from 'lucide-react';
import { Internship } from '../../app/types/types';

interface InternshipCardProps {
  internship: Internship;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{internship.title}</h3>
          <div className="flex items-center mt-2 text-gray-600">
            <Building2 className="w-4 h-4 mr-2" />
            <span>{internship.company}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{internship.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>{internship.duration} months</span>
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign className="w-4 h-4 mr-2" />
          <span>&#8377;{internship.stipend}/month</span>
        </div>
      </div>

      <p className="mt-4 text-gray-600">{internship.description}</p>
    </div>
  );
};
