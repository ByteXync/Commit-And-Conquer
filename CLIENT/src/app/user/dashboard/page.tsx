// components/dashboard/Dashboard.js

"use client"; // Mark this component as a client component

import React, { useState } from 'react';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    validateFiles(droppedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const validateFiles = (droppedFiles) => {
    const validFiles = [];
    const invalidFiles = [];

    droppedFiles.forEach((file) => {
      const fileType = file.type;
      if (fileType === 'application/pdf' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      setError(`Invalid file types: ${invalidFiles.join(', ')}`);
    } else {
      setError('');
    }

    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const handleRemoveFile = (file) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setFiles([]); // Clear files after successful upload
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">File Upload Dashboard</h1>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-blue-500 p-10 w-full max-w-md text-center rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:border-blue-700"
      >
        <p className="text-gray-600 mb-2">Drag and drop your files here</p>
        <p className="text-gray-400">or click to select files</p>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-6 w-full max-w-md">
        <h2 className="text-lg font-bold text-gray-800">Uploaded Files:</h2>
        <ul className="list-disc pl-5 mt-2">
          {files.length === 0 ? (
            <li className="text-gray-500">No files uploaded yet.</li>
          ) : (
            files.map((file, index) => (
              <li key={index} className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2 mb-2 shadow-sm">
                <span className="text-gray-800">{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(file)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {files.length > 0 && (
        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload Files
        </button>
      )}
    </div>
  );
};

export default Dashboard;