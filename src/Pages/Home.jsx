import React, { useState, useEffect } from 'react';
import { FaCalculator, FaPalette, FaClipboardCheck, FaTint, FaCoins, FaChartLine, FaLeaf } from 'react-icons/fa';
import { IoWaterSharp, IoRainyOutline } from 'react-icons/io5';
import { BsDropletHalf, BsGraphUp } from 'react-icons/bs';
import { MdWaves, MdEco } from 'react-icons/md';
import { GiWaterDrop } from 'react-icons/gi';
import './Home.css';

const Home = () => {
  const [waterSaved, setWaterSaved] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);

  // Animated counter effect
  useEffect(() => {
    const animateCounter = (setter, target, duration = 2000) => {
      let start = 0;
      const increment = target / (duration / 50);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 50);
    };

    animateCounter(setWaterSaved, 12500);
    animateCounter(setMoneySaved, 8750);
  }, []);

  const actionButtons = [
    {
      title: 'Rooftop Calculator',
      description: 'Calculate your rooftop rainwater harvesting potential',
      icon: <FaCalculator />,
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      path: '/calculator'
    },
    {
      title: 'Design',
      description: 'Custom rainwater harvesting system design for your property',
      icon: <FaPalette />,
      gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      path: '/design'
    },
    {
      title: 'Feasibility',
      description: 'Analyze feasibility and ROI for your water harvesting project',
      icon: <FaClipboardCheck />,
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      path: '/feasibility'
    }
  ];

  return (
    <div className="home-container">
      {/* Animated Background */}
      <div className="home-background">
        <div className="water-layer layer-1"></div>
        <div className="water-layer layer-2"></div>
        <div className="water-layer layer-3"></div>
      </div>

      {/* Floating Elements */}
      <div className="floating-water-drops">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`floating-drop home-drop-${i + 1}`}>
            <BsDropletHalf />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="home-content">
        {/* Metrics Section - MOVED TO TOP */}
        <section className="metrics-section top-metrics">
          <div className="metrics-header">
            <h2>Your Impact Dashboard</h2>
            <p>Real-time tracking of your water conservation journey</p>
          </div>
          
          <div className="metrics-grid">
            <div className="metric-card water-card">
              <div className="metric-header">
                <div className="metric-icon">
                  <FaTint />
                </div>
                <div className="metric-trend">
                  <BsGraphUp />
                  <span>+15%</span>
                </div>
              </div>
              <div className="metric-content">
                <h3 className="metric-value">{waterSaved.toLocaleString()}</h3>
                <p className="metric-label">Liters Water Saved</p>
                <div className="metric-progress">
                  <div className="progress-bar">
                    <div className="progress-fill water-progress" style={{width: '75%'}}></div>
                  </div>
                  <span className="progress-text">75% of monthly goal</span>
                </div>
              </div>
              <div className="metric-sparkline">
                <MdWaves />
              </div>
              <div className="hover-glow water-glow"></div>
            </div>

            <div className="metric-card money-card">
              <div className="metric-header">
                <div className="metric-icon">
                  <FaCoins />
                </div>
                <div className="metric-trend">
                  <FaChartLine />
                  <span>+22%</span>
                </div>
              </div>
              <div className="metric-content">
                <h3 className="metric-value">₹{moneySaved.toLocaleString()}</h3>
                <p className="metric-label">Money Saved</p>
                <div className="metric-progress">
                  <div className="progress-bar">
                    <div className="progress-fill money-progress" style={{width: '68%'}}></div>
                  </div>
                  <span className="progress-text">68% ROI achieved</span>
                </div>
              </div>
              <div className="metric-sparkline">
                <FaLeaf />
              </div>
              <div className="hover-glow money-glow"></div>
            </div>
          </div>
        </section>

        {/* Hero Section - MOVED BELOW METRICS */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <MdEco className="badge-icon" />
              <span>Sustainable Water Management</span>
            </div>
            
            <h1 className="hero-title">
              Every Drop <span className="highlight">Matters</span>
            </h1>
            
            <p className="hero-subtitle">
              Transform your property into a water-smart ecosystem. Join thousands who are making a difference, one drop at a time.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <IoWaterSharp className="stat-icon" />
                <span className="stat-text">Harvesting Tomorrow's Water Today</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="water-globe">
              <div className="globe-core">
                <GiWaterDrop className="core-icon" />
              </div>
              <div className="orbit orbit-1">
                <div className="orbit-dot"></div>
              </div>
              <div className="orbit orbit-2">
                <div className="orbit-dot"></div>
              </div>
              <div className="orbit orbit-3">
                <div className="orbit-dot"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons Section */}
        <section className="actions-section">
          <div className="actions-header">
            <h2>Take Action Today</h2>
            <p>Choose your path to sustainable water management</p>
          </div>
          
          <div className="actions-grid">
            {actionButtons.map((button, index) => (
              <div key={button.title} className="action-card" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="card-glow" style={{background: button.gradient}}></div>
                <div className="card-content">
                  <div className="card-header">
                    <div 
                      className="card-icon"
                      style={{background: button.gradient}}
                    >
                      {button.icon}
                    </div>
                    <h3 className="card-title">{button.title}</h3>
                  </div>
                  <p className="card-description">{button.description}</p>
                  <button 
                    className="card-button"
                    style={{background: button.gradient}}
                    onClick={() => console.log(`Navigate to ${button.path}`)}
                  >
                    <span>Get Started</span>
                    <IoRainyOutline className="button-icon" />
                  </button>
                </div>
                <div className="card-decoration">
                  <BsDropletHalf className="decoration-drop" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inspiration Section */}
        <section className="inspiration-section">
          <div className="inspiration-content">
            <blockquote className="inspiration-quote">
              "The best time to plant a tree was 20 years ago. The second best time is now. The same applies to water conservation."
            </blockquote>
            <div className="inspiration-attribution">
              <div className="attribution-icon">
                <IoWaterSharp color='#044093ff'/>
              </div>
              <span>AquaHarvest Community</span>
            </div>
          </div>
        </section>
      </div>

      {/* Decorative Elements */}
      <div className="decorative-elements">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
        <div className="deco-circle circle-3"></div>
      </div>
    </div>
  );
};

export default Home;
