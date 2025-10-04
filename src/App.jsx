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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<Home/>}/>
        </Route>

        <Route path='/login' element={<AuthPage/>}/>
        <Route path='/questions' element={<QuestionsPage/>}/>
      </Routes>
    </>
  )
}

export default App
