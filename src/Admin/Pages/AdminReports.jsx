import React from "react";
import AdminSidebar from "../Components/AdminSidebar";

const AdminReports = () => {
  return (
    <div className="flex text-white  mx-auto">
      <AdminSidebar />
      <div className="flex-1 p-3 md:p-6 md:ml-64 mx-auto">
        <h1 className="text-2xl font-bold md:mt-0 mt-12">
            All reports made by users on the site
        </h1>
      </div>
    </div>
  );
};

export default AdminReports;
