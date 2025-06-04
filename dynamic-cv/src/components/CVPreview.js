import React, { useState, useEffect } from 'react';
import './CVPreview.css';

const CVPreview = (props) => {
    const [educationId,setEducationId] = useState(1);
    const [experienceId,setExperienceId] = useState(100);
    const [skillId,setSkillId] = useState(1000);
    
    const [savedM, setSavedM] = useState(null);

    const [personalInfo,setPersonalInfo]=useState(()=>{
        const storedItems=localStorage.getItem('personalInfo');
        if(storedItems){
            const parsedData = JSON.parse(storedItems);
            console.log(parsedData);
            return {name: parsedData.name,
                email: parsedData.email,
                phone: parsedData.phone,
                address: parsedData.address};
        }
        else{
            return{
                name: '',
                email: '',
                phone: '',
                address: ''
            };
        }

    });

    const [education, setEducation] = useState(()=>{
        const storedItems=localStorage.getItem('education');
        const storedId=localStorage.getItem('educationId');
        if(storedItems&&storedId){
            const parsedData = JSON.parse(storedItems);
            
            setEducationId(Number(storedId));
            return parsedData;
        }
        else{
            return [];
        }
    });

    const [experience, setExperience] = useState(()=>{
        const storedItems=localStorage.getItem('experience');
        const storedId=localStorage.getItem('experienceId');
        if(storedItems&&storedId){
            const parsedData = JSON.parse(storedItems);
            
            setExperienceId(Number(storedId));
            return parsedData;
        }
        else{
            return [];
        }
    });

    const [skills, setSkills] = useState(()=>{
        const storedItems=localStorage.getItem('skills');
        const storedId=localStorage.getItem('skillId');
        if(storedItems&&storedId){
            const parsedData = JSON.parse(storedItems);
            
            setSkillId(Number(storedId));
            return parsedData;
        }
        else{
            return [];
        }
    });

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
        if (props.personalInfo&&props.personalInfo.name) { 
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

    const onDelete = (tag,id) =>{
        if(tag==="education"){
            setEducation(prevItems => prevItems.filter(item => item.id !== id));
        }
        else if(tag==="experience"){
            setExperience(prevItems => prevItems.filter(item => item.id !== id));
        }
        else if(tag==="skills"){
            setSkills(prevItems => prevItems.filter(item => item.id !== id));
        }
    }

    const onEdit = (tag,id) =>{
        if(tag==="education"){
            setEducation(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, degree: prompt("Degree:", item.degree), institution: prompt("Institution:",item.institution), year : prompt("Year:",item.year) } : item
                )
            );
        }
        else if(tag==="experience"){
            setExperience(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, jobTitle: prompt("Job title:", item.jobTitle), company: prompt("Company:",item.company), duration : prompt("Duration:",item.duration), responsabilities : prompt("Responsabilities:",item.responsabilities) } : item
                )
            );
        }
        else if(tag==="skills"){
            setSkills(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, skill: prompt("Skill:", item.skill) } : item
                )
            );
        }
    }

    const save = () => {
        localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
        localStorage.setItem('educationId',JSON.stringify(educationId));
        localStorage.setItem('education',JSON.stringify(education));
        localStorage.setItem('experienceId',JSON.stringify(experienceId));
        localStorage.setItem('experience',JSON.stringify(experience));
        localStorage.setItem('skillId',JSON.stringify(skillId));
        localStorage.setItem('skills',JSON.stringify(skills));
        console.log("Saved");
        setSavedM("Information saved");
        setTimeout(() => setSavedM(null), 3000);  
    }

    const reset = () => {
        setPersonalInfo({
            name: '',
            email: '',
            phone: '',
            address: ''
        });
        setEducation([]);
        setExperience([]);
        setSkills([]);
        setEducationId(1);
        setExperienceId(100);
        setSkillId(1000);
        localStorage.clear();
        console.log("Reset");
        setSavedM("Information reseted");
        setTimeout(() => setSavedM(null), 3000);
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
                    <button onClick={() => onEdit("education",edItem.id)}>Edit</button>
                    <button onClick={() => onDelete("education",edItem.id)}>Delete</button>
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
                    <button onClick={() => onEdit("experience",exItem.id)}>Edit</button>
                    <button onClick={() => onDelete("experience",exItem.id)}>Delete</button>
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
                  <button onClick={() => onEdit("skills",skill.id)}>Edit</button>
                  <button onClick={() => onDelete("skills",skill.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No skills added</p>
        )}
      </section>
    <div className="item-actions">
        <button onClick={() => save()}>Save</button>
        <button onClick={() => reset()}>Reset</button>
        
    </div>  
    <br></br>
    {savedM && (<div className="success-message">{savedM}</div>)}
    </div>
  );
};

export default CVPreview;