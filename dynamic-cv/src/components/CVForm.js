import React, { useState } from 'react';
import './CVForm.css';
import CVPreview from './CVPreview.js';

const CVForm = () => {
    const initialInfoState={
        name: '',
        email: '',
        phone: '',
        address: ''
    }

    const initialEdState={
        degree: '',
        institution: '',
        year: ''
    }

    const initialExState={
        jobTitle: '',
        company: '',
        duration: '',
        responsabilities: ''
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{2}-\d{4}-\d{4}$/;
    //Errors
  const [errorInfo, setErrorInfo] = useState(null);
    const [errorEd, setErrorEd] = useState(null);
  const [errorEx, setErrorEx] = useState(null);
  const [errorSk, setErrorSk] = useState(null);


    //Send to preview
  const [personalInfoSubmit, setPersonalInfoSubmit] = useState({
    initialInfoState
  });

  const [educationSubmit, setEducationSubmit] = useState({
    initialEdState
  });

  const [experienceSubmit, setExperienceSubmit] = useState({
    initialExState
  });
    
  const [skillsSubmit, setSkillsSubmit] = useState('');

  //Forms update
  const [personalInfo, setPersonalInfo] = useState({
    initialInfoState
  });

  const [education, setEducation] = useState({
    initialEdState
  });

  const [experience, setExperience] = useState({
    initialExState
  });

  const [skills, setSkills] = useState('');

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducation(prev => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setExperience(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmitPerInfo = (e) => {
        e.preventDefault() 
        if(personalInfo.address!==""&&personalInfo.email!==""&&personalInfo.name!==""&&personalInfo.phone!==""){
            if (!emailRegex.test(personalInfo.email)) {
                setErrorInfo("Please enter a valid email address");
                return false;
            }

            if (!phoneRegex.test(personalInfo.phone)) {
                setErrorInfo("Please enter a valid phone number in the format: ##-####-####");
                return false;
            }
            setPersonalInfoSubmit(personalInfo);
            setPersonalInfo(initialInfoState); 
            setErrorInfo(null);
        }
        else{
            setErrorInfo("Please fill all the fields");
            setTimeout(() => setErrorInfo(null), 3000);  
        }
    };

   const handleSubmitEx = (e) => {
        e.preventDefault() 
        if(experience.jobTitle!==""&&experience.company!==""&&experience.responsabilities!==""&&experience.duration!==""){
            setExperienceSubmit(experience);
            setExperience(initialExState); 
            setErrorEx(null);
        }
        else{
            setErrorEx("Please fill all the fields");
            setTimeout(() => setErrorEx(null), 3000);  
        }
    };

    const handleSubmitEd = (e) => {
        e.preventDefault() 
        if(education.degree!==""&&education.year!==""&&education.institution!==""){
            setEducationSubmit(education);
            setEducation(initialEdState); 
            setErrorEd(null);
        }
        else{
            setErrorEd("Please fill all the fields");
            setTimeout(() => setErrorEd(null), 3000);  
        }
    };

    const handleSubmitSk = (e) => {
        e.preventDefault() 
        if(skills!==""){
            setSkillsSubmit(skills);
            setSkills(''); 
            setErrorSk(null);
        }
        else{
            setErrorSk("Please add at least one skill");
            setTimeout(() => setErrorSk(null), 3000);  
        }
    };

  return (
    <>
    <div className="cv-form-container">
      <h2>CV Information</h2>
      <form onSubmit={handleSubmitPerInfo}>
        <fieldset>
          <legend>Personal Information</legend>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="name"
              value={personalInfo.name}
              onChange={handlePersonalInfoChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={personalInfo.address}
              onChange={handlePersonalInfoChange}
            />
          </div>
        </fieldset>
        <button type="submit" className="submit-btn">Add information</button>
        <br></br>
        {errorInfo && (<div className="error-message">{errorInfo}</div>)}

    </form>
    <br></br>
    <form onSubmit={handleSubmitEd}>
        <fieldset>
          <legend>Education</legend>
          <div className="form-group">
            <label>Degree:</label>
            <input
              type="text"
              name="degree"
              value={education.degree}
              onChange={handleEducationChange}
            />
          </div>
          <div className="form-group">
            <label>Institution:</label>
            <input
              type="text"
              name="institution"
              value={education.institution}
              onChange={handleEducationChange}
            />
          </div>
          <div className="form-group">
            <label>Year of Completion:</label>
            <input
              type="text"
              name="year"
              value={education.year}
              onChange={handleEducationChange}
            />
          </div>
        </fieldset>
        <button type="submit" className="submit-btn">Add education</button>
        <br></br>
        {errorEd && (<div className="error-message">{errorEd}</div>)}
    </form>
    <br></br>

    <form onSubmit={handleSubmitEx}>
        <fieldset>
          <legend>Experience</legend>
          <div className="form-group">
            <label>Job Title:</label>
            <input
              type="text"
              name="jobTitle"
              value={experience.jobTitle}
              onChange={handleExperienceChange}
            />
          </div>
          <div className="form-group">
            <label>Company:</label>
            <input
              type="text"
              name="company"
              value={experience.company}
              onChange={handleExperienceChange}
            />
          </div>
          <div className="form-group">
            <label>Duration:</label>
            <input
              type="text"
              name="duration"
              value={experience.duration}
              onChange={handleExperienceChange}
            />
          </div>
          <div className="form-group">
            <label>responsabilities:</label>
            <textarea
              name="responsabilities"
              value={experience.responsabilities}
              onChange={handleExperienceChange}
            />
          </div>
        </fieldset>
        <button type="submit" className="submit-btn">Add experience</button>
        <br></br>
        {errorEx && (<div className="error-message">{errorEx}</div>)}
    </form>
    <br></br>
    
    <form onSubmit={handleSubmitSk}>
        <fieldset>
          <legend>Skills</legend>
          <div className="form-group">
            <label>Skills (comma separated):</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., JavaScript, React, Project Management"
            />
          </div>
        </fieldset>

        <button type="submit" className="submit-btn">Add skills</button>
        <br></br>
        {errorSk && (<div className="error-message">{errorSk}</div>)}
      </form>
    </div>
      <CVPreview personalInfo={personalInfoSubmit} education={educationSubmit} experience={experienceSubmit} skills={skillsSubmit}/>
    </>
  );
};

export default CVForm;