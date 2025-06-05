import { useEffect, useState } from 'react';
import './style.css';

const Step3 = ({ data, prevStep }) => {
  const [success,setSuccess] = useState(null);
  const handleSubmit = () => {
    setSuccess("Form submitted succesfully");
  };


  return (
    <div className="confirmation-step">
      <h2>Review Your Information</h2>
      
      <div className="summary">
        <h3>Personal Information</h3>
        <p>Name: {data.personalInfo.name}</p>
        <p>Email: {data.personalInfo.email}</p>
        <p>Phone: {data.personalInfo.phone}</p>

        <h3>Address</h3>
        <p>Street: {data.address.street}</p>
        <p>City: {data.address.city}</p>
        <p>Zip code: {data.address.zip}</p>
      </div>
      <div className="form-actions">
        <button type="button" onClick={prevStep}>Prev</button>
      </div>
      <div className="form-actions">
      <button className={!success? "btn":"btn btn-disabel"} onClick={handleSubmit}>Submit</button>
      </div>
      {success && <span className="success">{success}</span>}
    </div>
  );
};
export default Step3;