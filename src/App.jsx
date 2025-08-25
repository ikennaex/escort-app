import React from 'react'
import Homepage from './Pages/Homepage/Homepage'
import Navbar from './Components/Navbar/Navbar'
import Login from './Pages/Login/Login'
import { Routes, Route } from 'react-router-dom'
import Register from './Pages/Register/Register'
import RegisterCard from './Pages/Register/RegisterCard'
import ClientRegister from './Pages/Register/ClientRegister'
import EscortDetailsPage from './Pages/EscortDetailsPage/EscortDetailsPage'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-client" element={<ClientRegister />} />
        <Route path="/register-card" element={<RegisterCard />} />


        <Route path="/:id" element={<EscortDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App