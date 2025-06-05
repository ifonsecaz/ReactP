import { useMemo } from 'react';
const useFormValidation = (data) => {
  return useMemo(() => {
    const errors = {};
    
    // Step 1 
    if (data.hasOwnProperty('name') && !data.name) {
      errors.list = { ...errors.list, name: 'Name is required' };
    }
    if (data.hasOwnProperty('email') && (!data.email || !/^\S+@\S+\.\S+$/.test(data.email))) {
        errors.list = { ...errors.list, email: 'Valid email is required' };
    }
    if (data.hasOwnProperty('phone') && (!data.phone || !/^\D*\d{10}\D*$/.test(data.phone))){
        errors.list = { ...errors.list, phone: 'Please use only numbers, phone number needs to contain 10 digits' };
    }
    // Step 2 
    if (data.hasOwnProperty('street') && !data.street) {
      errors.list = { ...errors.list, street: 'Street is required' };
    }
    if (data.hasOwnProperty('city') && !data.city) {
      errors.list = { ...errors.list, city: 'City is required' };
    }
    if (data.hasOwnProperty('zip') && (!data.zip || !/^\d+$/.test(data.zip))) {
      errors.list = { ...errors.list, zip: 'Zip code needs to contain only digits' };
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, [data]);
};

export default useFormValidation;
