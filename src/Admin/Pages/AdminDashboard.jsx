import React from 'react'
import AdminSidebar from '../Components/AdminSidebar'

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      </div>
    </div>
  )
}

export default AdminDashboard