import { useReducer, useCallback, act } from 'react';
import Step1 from './Step1.js';
import Step2 from './Step2.js';
import Step3 from './Step3.js';
import ProgressBar from './ProgressBar.js';
import './style.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload}};
    case 'UPDATE_ADDRESS':
      return { ...state, address: { ...state.address, ...action.payload } };
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 };
    case 'PREV_STEP':
      return { ...state, step: state.step - 1 };
    default:
      return state;
  }
};


const initialState = {
  step: 1,
  personalInfo: { name: '', email: '', phone: '' },
  address: { street: '', city: '', zip: '' },
};

const MultiStepForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  const nextStep = useCallback(() => 
    dispatch({ type: 'NEXT_STEP' }), 
  []);
  const prevStep = useCallback(() => 
    dispatch({ type: 'PREV_STEP' }), 
  []);
  const updatePerData = useCallback((field) => 
    dispatch({ type:'UPDATE_PERSONAL_INFO', payload:field}), 
  []);
  const updateAdData = useCallback((field) => 
    dispatch({ type:'UPDATE_ADDRESS', payload:field}), 
  []);
  
  return (
    <div className="form-container">
      <ProgressBar currentStep={state.step} totalSteps={3} />
      {state.step === 1 && (
        <Step1 
          data={state.personalInfo} 
          updateData={updatePerData}
          nextStep={nextStep}
        />
      )}
      {state.step === 2 && (
        <Step2 
          data={state.address} 
          updateData={updateAdData}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      )}
      {state.step === 3 && (
        <Step3 
          data={state} 
          prevStep={prevStep}
        />
      )}
    </div>
  );
};

export default MultiStepForm;