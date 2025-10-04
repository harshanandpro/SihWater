import React, { useState } from 'react';
import { FaGlobe, FaHome, FaUsers, FaMapMarkerAlt, FaRulerCombined, FaTint, FaWater } from 'react-icons/fa';
import { IoWaterSharp, IoRainyOutline } from 'react-icons/io5';
import { BsDropletHalf, BsPeople } from 'react-icons/bs';
import { MdLandscape, MdOutlineWater } from 'react-icons/md';
import './QuestionsPage.css';

const QuestionsPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    language: '',
    hasRainwaterSystem: '',
    familySize: '',
    pincode: '',
    rooftopArea: '',
    hasOpenLand: '',
    openLandArea: '',
    waterSource: ''
  });

  const totalSteps = 7;

  const questions = [
    {
      id: 'language',
      title: 'Select Your Language',
      subtitle: 'Choose your preferred language for this questionnaire',
      icon: <FaGlobe />,
      type: 'options',
      options: [
        { value: 'english', label: 'English', flag: '🇺🇸' },
        { value: 'hindi', label: '[translate:हिंदी]', flag: '🇮🇳' }
      ]
    },
    {
      id: 'hasRainwaterSystem',
      title: 'Existing Rainwater Harvesting',
      subtitle: 'Do you already have a rainwater harvesting system installed?',
      icon: <IoWaterSharp />,
      type: 'boolean',
      options: [
        { value: 'yes', label: 'Yes, I have one' },
        { value: 'no', label: 'No, I don\'t have one' }
      ]
    },
    {
      id: 'familySize',
      title: 'Family Size',
      subtitle: 'How many people live in your household?',
      icon: <BsPeople />,
      type: 'input',
      inputType: 'number',
      placeholder: 'Enter number of family members'
    },
    {
      id: 'pincode',
      title: 'Location Details',
      subtitle: 'What is your area pincode?',
      icon: <FaMapMarkerAlt />,
      type: 'input',
      inputType: 'text',
      placeholder: 'Enter your pincode'
    },
    {
      id: 'rooftopArea',
      title: 'Rooftop Area',
      subtitle: 'What is your rooftop area in square meters?',
      icon: <FaRulerCombined />,
      type: 'input',
      inputType: 'number',
      placeholder: 'Enter rooftop area (sq. meters)'
    },
    {
      id: 'hasOpenLand',
      title: 'Open Land Availability',
      subtitle: 'Is there open land available around your property?',
      icon: <MdLandscape />,
      type: 'boolean',
      options: [
        { value: 'yes', label: 'Yes, open land is available' },
        { value: 'no', label: 'No, no open land available' }
      ]
    },
    {
      id: 'waterSource',
      title: 'Current Water Source',
      subtitle: 'What is your primary source of water?',
      icon: <FaTint />,
      type: 'options',
      options: [
        { value: 'tapwater', label: 'Tap Water', icon: <FaWater /> },
        { value: 'well', label: 'Well Water', icon: <MdOutlineWater /> }
      ]
    }
  ];

  // Dynamic question for open land area
  const openLandAreaQuestion = {
    id: 'openLandArea',
    title: 'Open Land Area',
    subtitle: 'How much open land area do you have in square meters?',
    icon: <MdLandscape />,
    type: 'input',
    inputType: 'number',
    placeholder: 'Enter open land area (sq. meters)'
  };

  const getCurrentQuestion = () => {
    if (currentStep === 5 && answers.hasOpenLand === 'yes') {
      return openLandAreaQuestion;
    } else if (currentStep === 5 && answers.hasOpenLand === 'no') {
      return questions[6]; // Skip to water source question
    } else if (currentStep === 6 && answers.hasOpenLand === 'yes') {
      return questions[6]; // Water source question after open land area
    }
    return questions[currentStep];
  };

  const getActualStep = () => {
    if (currentStep === 6 && answers.hasOpenLand === 'yes') {
      return 7; // Show as step 7 when we're at water source after open land area
    }
    return currentStep;
  };

  const getTotalSteps = () => {
    return answers.hasOpenLand === 'yes' ? 8 : 7;
  };

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    setTimeout(() => {
      if (currentStep < getTotalSteps() - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // All questions completed
        console.log('Survey completed:', { ...answers, [questionId]: value });
        alert('Survey completed! Thank you for your responses.');
      }
    }, 500);
  };

  const handleInputSubmit = (questionId, value) => {
    if (!value.trim()) return;
    handleAnswer(questionId, value);
  };

  const progressPercentage = ((getActualStep() + 1) / getTotalSteps()) * 100;

  const currentQuestion = getCurrentQuestion();

  return (
    <div className="questions-container">
      {/* Animated Background */}
      <div className="questions-background">
        <div className="water-wave-bg wave-1"></div>
        <div className="water-wave-bg wave-2"></div>
        <div className="water-wave-bg wave-3"></div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`floating-drop drop-${i + 1}`}>
            <BsDropletHalf />
          </div>
        ))}
      </div>

      {/* Main Question Box */}
      <div className="question-wrapper">
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-header">
            <span className="progress-text">
              Step {getActualStep() + 1} of {getTotalSteps()}
            </span>
            <span className="progress-percentage">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-track">
              <div 
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="progress-glow"></div>
              </div>
            </div>
            <div className="progress-steps">
              {[...Array(getTotalSteps())].map((_, i) => (
                <div
                  key={i}
                  className={`step-indicator ${i <= getActualStep() ? 'completed' : ''} ${i === getActualStep() ? 'active' : ''}`}
                  style={{ left: `${(i / (getTotalSteps() - 1)) * 100}%` }}
                >
                  <div className="step-dot">
                    {i < getActualStep() ? '✓' : i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="question-card">
          <div className="question-header">
            <div className="question-icon">
              {currentQuestion.icon}
              <div className="icon-ripple"></div>
            </div>
            <div className="question-content">
              <h2 className="question-title">{currentQuestion.title}</h2>
              <p className="question-subtitle">{currentQuestion.subtitle}</p>
            </div>
          </div>

          <div className="question-body">
            {currentQuestion.type === 'options' && (
              <div className="options-container">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={option.value}
                    className="option-button"
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="option-content">
                      {option.flag && <span className="option-flag">{option.flag}</span>}
                      {option.icon && <div className="option-icon">{option.icon}</div>}
                      <span className="option-label">{option.label}</span>
                    </div>
                    <div className="option-ripple"></div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'boolean' && (
              <div className="boolean-container">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={option.value}
                    className={`boolean-button ${option.value === 'yes' ? 'yes-button' : 'no-button'}`}
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="boolean-icon">
                      {option.value === 'yes' ? '✓' : '✗'}
                    </div>
                    <span className="boolean-label">{option.label}</span>
                    <div className="boolean-ripple"></div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'input' && (
              <div className="input-container">
                <div className="input-wrapper">
                  <input
                    type={currentQuestion.inputType}
                    placeholder={currentQuestion.placeholder}
                    className="question-input"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleInputSubmit(currentQuestion.id, e.target.value);
                      }
                    }}
                  />
                  <div className="input-border"></div>
                </div>
                <button
                  className="continue-button"
                  onClick={(e) => {
                    const input = e.target.parentElement.querySelector('input');
                    handleInputSubmit(currentQuestion.id, input.value);
                  }}
                >
                  <span>Continue</span>
                  <IoRainyOutline className="continue-icon" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="decorative-circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </div>
  );
};

export default QuestionsPage;
