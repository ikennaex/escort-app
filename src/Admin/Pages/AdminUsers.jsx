import React from 'react'
import AdminSidebar from '../Components/AdminSidebar'

const AdminUsers = () => {
  return (
    <div className="flex text-white">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-6">
        <h1 className="text-2xl font-bold">Total Users on the site</h1>
      </div>
    </div>
  )
}

export default AdminUsers