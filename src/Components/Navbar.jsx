import React, { useState, useEffect } from 'react';
import { FaUser, FaBell, FaCog, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { IoWaterSharp, IoRainyOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { MdDashboard, MdHelpCenter } from 'react-icons/md';
import { BsDropletHalf } from 'react-icons/bs';
import "./Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [usdata , setUsdata] = useState();

const logout = async () => {
  await signOut(auth);
};
const getUserData = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
useEffect(() => {
  getUserData().then(data => {
    setUsdata(data);
  });
}, []);
  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar_left">
          <div className="logo">
            <div className="animated-water-drop">
              <BsDropletHalf className="drop-icon" />
              <div className="water-particles">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <span className="logo-text">
              <span className="aqua">Aqua</span>
              <span className="harvest">Harvest</span>
            </span>
          </div>
        </div>
        
        <div className="navbar_mid">
          <div className="navbar_button">
            <MdDashboard className="nav-icon" />
            <span>Ground Level Report</span>
            <div className="ripple-effect"></div>
          </div>
          <div className="navbar_button">
            <IoRainyOutline className="nav-icon" />
            <span>Local Rainfall Report</span>
            <div className="ripple-effect"></div>
          </div>
          <div className="navbar_button">
            <IoDocumentTextOutline className="nav-icon" />
            <span>Govt Schemes</span>
            <div className="ripple-effect"></div>
          </div>
          <div className="navbar_button">
            <MdHelpCenter className="nav-icon" />
            <span>FAQs</span>
            <div className="ripple-effect"></div>
          </div>
        </div>
        
        <div className="navbar_right">
          <div className="notification-bell">
            <FaBell className="bell-icon" />
            <span className="notification-dot"></span>
          </div>
          
          <div className="profile-section">
            <div 
              className="profile-trigger" 
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="profile-avatar">
                <FaUser className="profile-icon" />
              </div>
              <span className="profile-name">{console.log(usdata)}</span>
              <FaChevronDown className={`chevron ${profileOpen ? 'open' : ''}`} />
            </div>
            
            {profileOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-item">
                  <FaUser className="dropdown-icon" />
                  <span>My Profile</span>
                </div>
                <div className="dropdown-item">
                  <FaCog className="dropdown-icon" />
                  <span>Settings</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item logout" onClick={logout}>
                  <FaSignOutAlt className="dropdown-icon" />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Floating water bubbles */}
      <div className="floating-bubbles">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
      </div>
    </nav>
  );
};

export default Navbar;
