import React from 'react'
import AdminSidebar from '../Components/AdminSidebar'

const AdminUserDetails = () => {
  return (
    <div className="flex text-white mx-auto">
      <AdminSidebar />
      <div className="flex-1 p-3 md:p-6 md:ml-64 mx-auto">
        <h1 className="text-2xl font-bold md:mt-0 mt-12 mb-6">User details</h1>
      </div>
    </div>
  )
}

export default AdminUserDetails