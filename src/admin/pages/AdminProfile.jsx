import React from "react";
import { useProfile } from "../../hooks/useAdminProfile";

const AdminProfile = () => {
  const { data: Profile, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg font-semibold">
        Failed to load profile.
      </div>
    );
  }

  const user = Profile?.data?.user;
  // Role ko sahi se access karein
  const role = user?.roles?.[0]?.name || "N/A";

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="w-full bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 h-40"></div>

        {/* Body */}
        <div className="px-8 pb-10">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 -mt-16 mb-10">
            <div className="w-32 h-32 rounded-full bg-red-600 border-4 border-white text-white text-5xl font-bold flex items-center justify-center shadow-md">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="mt-5 md:mt-16">
              <h2 className="text-3xl font-bold text-gray-800">{user?.name || "-"}</h2>
              <p className="text-red-600 font-medium capitalize">{role}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Full Name */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
              <div className="w-full mt-2 border rounded-lg p-3 bg-gray-50 text-gray-700">
                {user?.name || "No name available"}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
              <div className="w-full mt-2 border rounded-lg p-3 bg-gray-50 text-gray-700">
                {user?.email || "No email available"}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number</label>
              <div className="w-full mt-2 border rounded-lg p-3 bg-gray-50 text-gray-700">
                {user?.phone || "N/A"}
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">User Role</label>
              <div className="w-full mt-2 border rounded-lg p-3 bg-gray-50 text-gray-700 capitalize">
                {role}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;