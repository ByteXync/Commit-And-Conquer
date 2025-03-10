"use client"
import React, { useState, useEffect } from 'react';
import { User, Camera, Link, MapPin, Calendar, Edit2, Save } from 'lucide-react';

// TypeScript interfaces
interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

interface UserProfileData {
  name: string;
  username: string;
  email: string;
  bio: string;
  location: string;
  joinDate: string;
  profilePicture: string | null;
  socialLinks: SocialLinks;
}

const UserProfile: React.FC = () => {
  // Initial state with dummy data
  const [profile, setProfile] = useState<UserProfileData>({
    name: 'Alex Johnson',
    username: 'alexj42',
    email: 'alex.johnson@example.com',
    bio: 'Full-stack developer passionate about creating user-friendly applications.',
    location: 'San Francisco, CA',
    joinDate: 'March 2023',
    profilePicture: null,
    socialLinks: {
      github: 'github.com/alexj42',
      linkedin: 'linkedin.com/in/alexj42',
      twitter: 'twitter.com/alexj42'
    }
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedProfile, setEditedProfile] = useState<UserProfileData>(profile);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch user profile data from API
  useEffect(() => {
    // Simulating API call
    // In a real application: fetchUserProfile(userId).then(data => setProfile(data));
  }, []);

  const handleEditToggle = (): void => {
    if (isEditing) {
      setProfile(editedProfile);
      // In a real app: saveUserProfile(editedProfile).then(() => setIsEditing(false));
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value
    });
  };

  const handleSocialLinkChange = (platform: keyof SocialLinks, value: string): void => {
    setEditedProfile({
      ...editedProfile,
      socialLinks: {
        ...editedProfile.socialLinks,
        [platform]: value
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // In a real app, you would upload the image to a server
      // and update the profile with the returned URL
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <button
          onClick={handleEditToggle}
          className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {isEditing ? <><Save size={16} /> Save</> : <><Edit2 size={16} /> Edit</>}
        </button>
      </div>

      {/* Profile Header with Picture */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-blue-100">
            {imagePreview || profile.profilePicture ? (
              <img
                src={imagePreview || profile.profilePicture || ''}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={40} className="text-gray-400" />
            )}
          </div>
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full cursor-pointer hover:bg-blue-600">
              <Camera size={16} className="text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>

        <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
        <p className="text-gray-500">@{profile.username}</p>

        <div className="mt-2 flex items-center gap-1 text-gray-500 text-sm">
          <MapPin size={14} />
          <span>{profile.location}</span>
          <span className="mx-2">•</span>
          <Calendar size={14} />
          <span>Joined {profile.joinDate}</span>
        </div>
      </div>

      {/* Profile Information Sections */}
      <div className="space-y-6">
        {/* Bio */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-md font-medium text-gray-700 mb-2">Bio</h3>
          {isEditing ? (
            <textarea
              name="bio"
              value={editedProfile.bio}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={3}
            />
          ) : (
            <p className="text-gray-600">{profile.bio}</p>
          )}
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-md font-medium text-gray-700 mb-2">Contact Information</h3>

          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-500">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-600">{profile.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-500">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={editedProfile.location}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-600">{profile.location}</p>
              )}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-md font-medium text-gray-700 mb-2">Social Links</h3>

          <div className="space-y-3">
            {(Object.keys(profile.socialLinks) as Array<keyof SocialLinks>).map((platform) => (
              <div key={platform} className="flex items-center">
                <Link size={14} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-500 w-16">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.socialLinks[platform]}
                    onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                    className="ml-2 p-2 flex-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <a
                    href={`https://${profile.socialLinks[platform]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-500 hover:underline text-sm"
                  >
                    {profile.socialLinks[platform]}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;