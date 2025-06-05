import { useState, useRef, useEffect } from 'react';
import useFormValidation from './useFormValidation.js';
import './style.css';

const Step2 = ({ data, updateData, prevStep, nextStep }) => {
  const [errorsA, setErrorsA] = useState({});
  const firstInputRef = useRef(null);
  
  const { isValid, errors } = useFormValidation(data);
  
  useEffect(() => {
    firstInputRef.current?.focus(); 
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const validate = () => {
    /*
    const newErrors = {};
    if (!data.street) 
        newErrors.street = 'Street is required';
    if (!data.city) {
      newErrors.city = 'City is required';
    }
    if (!data.zip || !/^\d+$/.test(data.zip)){
        newErrors.zip = 'Zip code needs to contain only digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    */
    setErrorsA(errors.list);
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
      <h2>Address Information</h2>
      
      <div className="form-group">
        <label>Street</label>
        <input
          ref={firstInputRef}
          type="text"
          name="street"
          value={data.street}
          onChange={handleChange}
        />
        {errorsA.street && <span className="error">{errorsA.street}</span>}
        <br></br>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={data.city}
          onChange={handleChange}
        />
        {errorsA.city && <span className="error">{errorsA.city}</span>}
        <br></br>
        <label>ZIP code</label>
        <input
          type="text"
          name="zip"
          value={data.zip}
          onChange={handleChange}
        />
        {errorsA.zip && <span className="error">{errorsA.zip}</span>}
      </div>
      <div className="form-actions">
        <button type="button" onClick={prevStep}>Prev</button>
      </div>
      <div className="form-actions">
        <button type="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step2;