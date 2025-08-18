import React from 'react'
import Homepage from './Pages/Homepage/Homepage'
import Login from './Pages/Login/Login'
import { Routes, Route } from 'react-router-dom'
import Register from './Pages/Register/Register'
import RegisterCard from './Pages/Register/RegisterCard'
import ClientRegister from './Pages/Register/ClientRegister'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-client" element={<ClientRegister />} />
        <Route path="/register-card" element={<RegisterCard />} />
      </Routes>
    </div>
  )
}

export default App