import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { baseUrl } from '../../baseUrl'

const ClientRegister = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  console.log(email, password)

  const register = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${baseUrl}auth/clientsignup`, {email, password})
      alert(response.data.message)
      navigate("/login")
    } catch (err) {
      alert(err.response.data.message)
      console.log(err.response.data.message)
      console.log(err)
    }
  }

  return (
<div className="flex items-center justify-center min-h-screen bg-customGray">
    <div className="mx-6 p-6 bg-pink-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">OS Villa</h1>
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Create a new account with Email, Phone Number, or Username
      </h2>

      <form onSubmit={register} action="" className="space-y-4">
        <div>
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-gray-600"
          >
            Email, Phone Number, or Username
          </label>
          <input
          onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="identifier"
            name="identifier"
            placeholder="Enter your email, phone, or username"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
          onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="Set your password"
            class="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* <div>
          <label for="password" class="block text-sm font-medium text-gray-600">
            Reconfirm Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Reconfirm password"
            class="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div> */}

        <button
          type="submit"
          className="w-full py-2 bg-customPink text-white font-semibold rounded-lg hover:border-customPink transition-colors"
        >
          Create account
        </button>

        <p>Already a member? <Link to="/login"><span className="text-customPink">Login</span></Link></p>
      </form>
    </div>
    </div>
  )
}

export default ClientRegister