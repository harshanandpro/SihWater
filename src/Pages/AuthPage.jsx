import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoWaterSharp } from 'react-icons/io5';
import { BsDropletHalf } from 'react-icons/bs';
import './AuthPage.css';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login:', { email: formData.email, password: formData.password });
    } else {
      console.log('Signup:', formData);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', mobile: '', password: '' });
  };

  const provider = new GoogleAuthProvider();
const saveUser = async (user) => {
  await setDoc(doc(db, "users", user.uid), {
    name: user.displayName || "Anonymous",
    email: user.email,
    photo: user.photoURL || "",
    createdAt: new Date()
  }, { merge: true });
};

const googleLogin = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    console.error(err);
  }
  await signInWithPopup(auth, provider);
saveUser(auth.currentUser);
};

  return (
    <div className="auth-container">
      {/* Animated Water Background */}
      <div className="water-background">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      

      {/* Main Auth Card */}
      <div className="auth-card">
        <div className="card-header">
          <div className="logo-section">
            <div className="auth-logo">
              <IoWaterSharp className="logo-icon" />
              <div className="ripple-1"></div>
              <div className="ripple-2"></div>
              <div className="ripple-3"></div>
            </div>
            <h1 className="app-name">AquaHarvest</h1>
            <p className="app-tagline">Sustainable Rain Water Harvesting</p>
          </div>
        </div>

        <div className="form-container">
          <div className="form-toggle">
            <button 
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
            <div className={`toggle-slider ${isLogin ? 'left' : 'right'}`}></div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-title">
              <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
              <p>{isLogin ? 'Sign in to your account' : 'Join our water conservation community'}</p>
            </div>

            {!isLogin && (
              <div className="input-group">
                <div className="input-container">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    required
                  />
                  <div className="input-border"></div>
                </div>
              </div>
            )}

            <div className="input-group">
              <div className="input-container">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  required
                />
                <div className="input-border"></div>
              </div>
            </div>

            {!isLogin && (
              <div className="input-group">
                <div className="input-container">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Mobile Number"
                    required
                  />
                  <div className="input-border"></div>
                </div>
              </div>
            )}

            <div className="input-group">
              <div className="input-container">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <div className="input-border"></div>
              </div>
            </div>

            {isLogin && (
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <a href="#forgot" className="forgot-password">Forgot Password?</a>
              </div>
            )}

            <button type="submit" className="submit-btn">
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              <div className="btn-ripple"></div>
            </button> 
            <button onClick={googleLogin} className="submit-btn google">
              <span>Continue with Google</span>
              <div className="btn-ripple"></div>
            </button>
            <div className="form-footer">
              <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button type="button" onClick={toggleForm} className="switch-form">
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Animated Particles */}
      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

export default AuthPage;
