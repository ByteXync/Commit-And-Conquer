import React from 'react';
import './Resume.css'; // Optional: For styling

// Define types for the resume data
interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  summary: string;
  experience: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  skills: string[];
}

const resumeData: ResumeData = {
  name: "John Doe",
  title: "Software Engineer",
  email: "john.doe@example.com",
  phone: "(123) 456-7890",
  summary: "Experienced software engineer with a passion for building scalable applications.",
  experience: [
    {
      title: "Senior Developer",
      company: "Tech Corp",
      duration: "Jan 2020 - Present",
      description: "Led a team of developers to build robust web applications using React and TypeScript.",
    },
    {
      title: "Junior Developer",
      company: "Startup Inc",
      duration: "Jun 2017 - Dec 2019",
      description: "Developed and maintained backend services using Node.js and Express.",
    },
  ],
  education: [
    {
      degree: "B.S. in Computer Science",
      institution: "University of Example",
      year: "2017",
    },
  ],
  skills: ["React", "TypeScript", "Node.js", "CSS", "Git"],
};

const Resume: React.FC = () => {
  return (
    <div className="resume-container">
      {/* Header Section */}
      <header>
        <h1>{resumeData.name}</h1>
        <h2>{resumeData.title}</h2>
        <p>Email: {resumeData.email} | Phone: {resumeData.phone}</p>
      </header>

      {/* Summary Section */}
      <section>
        <h3>Summary</h3>
        <p>{resumeData.summary}</p>
      </section>

      {/* Experience Section */}
      <section>
        <h3>Experience</h3>
        {resumeData.experience.map((job, index) => (
          <div key={index} className="experience-item">
            <h4>{job.title} - {job.company}</h4>
            <p>{job.duration}</p>
            <p>{job.description}</p>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section>
        <h3>Education</h3>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="education-item">
            <h4>{edu.degree}</h4>
            <p>{edu.institution} - {edu.year}</p>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section>
        <h3>Skills</h3>
        <ul>
          {resumeData.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Resume;