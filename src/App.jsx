import React from 'react'
import Homepage from './Pages/Homepage/Homepage'
import Login from './Pages/Login/Login'
import { Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App