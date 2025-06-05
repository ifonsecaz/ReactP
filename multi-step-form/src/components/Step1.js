import { useState, useRef, useEffect } from 'react';
import useFormValidation from './useFormValidation.js';
import './style.css';

const Step1 = ({ data, updateData, nextStep }) => {
  const [errorsI, setErrorsI] = useState({});
  const firstInputRef = useRef(null);
  const { isValid, errors } = useFormValidation(data);

  
  useEffect(() => {
    firstInputRef.current?.focus(); //focus al primer elemento
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const validate = () => {
    //const newErrors = {};
    //const { isValid, errors } = useFormValidation(data);
    /*
    if (!data.name) 
        newErrors.name = 'Name is required';
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!data.phone || !/^\D*\d{10}\D*$/.test(data.phone)){
        newErrors.phone = 'Phone number needs to contain 10 digits';
    }  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    */
      setErrorsI(errors.list);
      if (isValid) {
        return true;
      }
      return false;
    };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div className="form-step">
      <h2>Personal Information</h2>
      
      <div className="form-group">
        <label>Full Name</label>
        <input
          ref={firstInputRef}
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        {errorsI.name && <span className="error">{errorsI.name}</span>}
        <br></br>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        {errorsI.email && <span className="error">{errorsI.email}</span>}
        <br></br>
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={handleChange}
        />
        {errorsI.phone && <span className="error">{errorsI.phone}</span>}
      </div>
      
      <div className="form-actions">
        <button type="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step1;