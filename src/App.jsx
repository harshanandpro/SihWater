import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './Pages/Home'
import AuthPage from './Pages/AuthPage'
import QuestionsPage from './Pages/QuestionsPage'
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <Routes>
      {/* PROTECTED */}
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Home />} />
      </Route>

      {/* PUBLIC */}
      <Route path="/questions" element={<QuestionsPage />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />
    </Routes>
  );
}

export default App;
