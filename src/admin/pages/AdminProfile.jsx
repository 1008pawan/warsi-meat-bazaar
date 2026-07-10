import React, { useState } from "react";

const AdminProfile = () => {
  const [admin] = useState({
    name: "Sandeep Vishwakarma",
    email: "thesandeep8181@gmail.com",
    phone: "+91 9876543210",
    role: "Administrator",
  });

  return (
    <div className="max-h-screen w-full bg-slate-50 ">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        
        {/* Red Header */}
        <div className="bg-red-600 h-40 w-full"></div>

        {/* Content Section */}
        <div className="px-8 pb-10">
          
          {/* Profile Circle and Name Section */}
          <div className="flex items-center gap-6 -mt-16 mb-8">
            <div className="w-32 h-32 rounded-full bg-red-600 border-4 border-white text-white text-5xl font-bold flex items-center justify-center shadow-md">
              {admin.name.charAt(0)}
            </div>
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-800">{admin.name}</h2>
              <p className="text-blue-600 font-medium">{admin.role}</p>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-4">
            {[
              { label: "FULL NAME", value: admin.name },
              { label: "EMAIL ADDRESS", value: admin.email },
              { label: "PHONE NUMBER", value: admin.phone },
              { label: "USER ROLE", value: admin.role },
            ].map((item, idx) => (
              <div key={idx}>
                <label className="text-[10px] font-bold text-gray-400 tracking-wider">
                  {item.label}
                </label>
                <input
                  value={item.value}
                  readOnly
                  className="mt-1 w-full border-b border-gray-200 outline-none p-1 text-gray-700 bg-transparent"
                />
              </div>
            ))}
          </div>

          {/* Edit Button */}
          {/* <div className="mt-10 flex justify-end">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-md font-semibold transition-all">
              Edit Profile
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;