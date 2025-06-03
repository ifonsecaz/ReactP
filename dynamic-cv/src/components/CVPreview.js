import React, { useState, useEffect } from 'react';
import './CVPreview.css';

const CVPreview = (props) => {
    const [educationId,setEducationId] = useState(1);
    const [experienceId,setExperienceId] = useState(100);
    const [skillId,setSkillId] = useState(1000);
    
    const [personalInfo,setPersonalInfo]=useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [skills, setSkills] = useState([]);

    const changeInfo = () => {
        const newPerInfo={
            name: props.personalInfo.name,
            email: props.personalInfo.email,
            phone: props.personalInfo.phone,
            address: props.personalInfo.address
        }
        setPersonalInfo(newPerInfo);
    };
    
    useEffect(() => {
        if (props.personalInfo&&props.personalInfo!=="") { 
            console.log(education)
            console.log(education.length)
            changeInfo();
        }
    }, [props.personalInfo]);

    const addEducation = () => {
        const newEd={
            id:educationId,
            degree: props.education.degree,
            institution: props.education.institution,
            year: props.education.year
        }
        setEducationId(prevCount => prevCount + 1);
        setEducation(prevItems => [...prevItems, newEd]);
    };

    useEffect(() => {
        if (props.education&&props.education.degree) { 
            
            const alreadyExists = education.some(ed => 
                ed.degree === props.education.degree &&
                ed.institution === props.education.institution &&
                ed.year === props.education.year
            );
            if (!alreadyExists)
                addEducation();
            
        }
    }, [props.education]);

    const addExperience = () => {
        const newEx={
            id:experienceId,
            jobTitle: props.experience.jobTitle,
            company: props.experience.company,
            duration: props.experience.duration,
            responsabilities: props.experience.responsabilities
        }
        setExperienceId(prevCount => prevCount + 1);
        setExperience(prevItems => [...prevItems, newEx]);
    };

    useEffect(() => {

        if (props.experience&&props.experience.jobTitle) { 
            const alreadyExists = experience.some(ex => 
                ex.jobTitle === props.experience.jobTitle &&
                ex.company === props.experience.company &&
                ex.duration === props.experience.duration
            );
            if (!alreadyExists) 
                addExperience();
        }
            
    }, [props.experience]);

    const addSkills = () => {
        const skillsArray = Array.isArray(props.skills) ? props.skills : props.skills.split(',').map(s => s.trim());
        console.log(skillsArray);
        let idD= skillId;
        for(let i=0;i<skillsArray.length;i++){
            const alreadyExists = skills.some(sk => skills.skill === skillsArray[i]);
            if(!alreadyExists){
                const newSkill={
                    id:idD,
                    skill:skillsArray[i]
                }
                idD=idD+1;

                setSkills(prevItems=>[...prevItems,newSkill]);
            }
        }
        setSkillId(idD);
    };

    useEffect(() => {
        if (props.skills) { 
            addSkills();
        }
    }, [props.skills]);

    const onDeleteInformation = (id) =>{
        
    }
    const onDeleteEducation = (id) =>{
        
    }
    const onDeleteExperience = (id) =>{
        
    }
    const onDeleteSkill = (id) =>{
        
    }

    const onEdit = (id) =>{
        
    }

  return (
    <div className="cv-preview">
      <header className="cv-header">
        <h1>{personalInfo.name || 'Your Name'}</h1>
        <div className="contact-info">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.address && <p>{personalInfo.address}</p>}
        </div>
      </header>

      <section className="cv-section">
        <h2>Education</h2>
        {education.length>0 ? (
          <ul>
            {education.map(edItem=>(
            <li key={edItem.id}>
                <div className="education-item">
                    <h3>{edItem.degree}</h3>
                    <p>{edItem.institution} | {edItem.year}</p>
                    <div className="item-actions">
                    <button onClick={() => onEdit(edItem.id)}>Edit</button>
                    <button onClick={() => onDeleteEducation(edItem.id)}>Delete</button>
                    </div>
                </div>
            </li>
          ))}
          </ul>
        ) : (
          <p>No education information added</p>
        )}
      </section>

      <section className="cv-section">
        <h2>Experience</h2>
        {experience.length>0 ? (
            <ul>
            {experience.map(exItem=>(
            <li key={exItem.id}>
                <div className="experience-item">
                    <h3>{exItem.jobTitle}</h3>
                    <p>{exItem.company} | {exItem.duration}</p>
                    <p className="responsabilities">{exItem.responsabilities}</p>
                    <div className="item-actions">
                    <button onClick={() => onEdit(exItem.id)}>Edit</button>
                    <button onClick={() => onDeleteExperience(exItem.id)}>Delete</button>
                    </div>
                </div>
            </li>
          ))}
          </ul>
        ) : (
          <p>No experience information added</p>
        )}
      </section>

      <section className="cv-section">
        <h2>Skills</h2>
        {skills.length > 0 ? (
          <ul className="skills-list">
            {skills.map((skill) => (
              <li key={skill.id}>
                {skill.skill}
                <div className="item-actions">
                  <button onClick={() => onEdit(skill.id)}>Edit</button>
                  <button onClick={() => onDeleteSkill(skill.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No skills added</p>
        )}
      </section>
    </div>
  );
};

export default CVPreview;