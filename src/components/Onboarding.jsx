import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Onboarding.css'; 
import ProgressBar from './ProgressBar'; 

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    size: '',
    theme: '',
    layout: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email) {
        setError('Please fill in both name and email.');
        return false;
      }
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!emailPattern.test(formData.email)) {
        setError('Please enter a valid email address.');
        return false;
      }
    }

    if (step === 2) {
      if (!formData.company || !formData.industry || !formData.size) {
        setError('Please complete all business info fields.');
        return false;
      }
    }

    if (step === 3) {
      if (!formData.theme || !formData.layout) {
        setError('Please select your preferences.');
        return false;
      }
    }

    setError('');
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      localStorage.setItem('userData', JSON.stringify(formData));
      navigate('/dashboard');
    }
  };

  return (
    <div className="onboarding-wrapper">
      <div className="onboarding-container">
        <ProgressBar step={step} totalSteps={3} />
        <form onSubmit={handleSubmit} className="form-card" noValidate>
          {step === 1 && (
            <>
              <h2>Step 1: Personal Info</h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email (e.g. example@gmail.com)"
                value={formData.email}
                onChange={handleChange}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Enter a valid email address like example@gmail.com"
              />
              {error && <p className="error">{error}</p>}
              <button
                type="button"
                onClick={nextStep}
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Step 2: Business Info</h2>
              <input
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                required
              />
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="retail">Retail</option>
                <option value="other">Other</option>
              </select>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
              >
                <option value="">Select Company Size</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-100">51-100</option>
                <option value="101-500">101-500</option>
                <option value="500+">500+</option>
              </select>
              {error && <p className="error">{error}</p>}
              <div>
                <button type="button" onClick={prevStep}>Back</button>
                <button type="button" onClick={nextStep}>Next</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2>Step 3: Preferences</h2>
              <select name="theme" value={formData.theme} onChange={handleChange} required>
                <option value="">Select Theme</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
              <select name="layout" value={formData.layout} onChange={handleChange} required>
                <option value="">Dashboard Layout</option>
                <option value="default">Default</option>
              </select>
              {error && <p className="error">{error}</p>}
              <div>
                <button type="button" onClick={prevStep}>Back</button>
                <button type="submit">Submit</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Onboarding;
