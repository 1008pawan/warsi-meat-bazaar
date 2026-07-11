import React, { useEffect } from "react";
import { useProfile } from "../../hooks/useAdminProfile";

const AdminProfile = () => {
  const { data: Profile, isLoading, error } = useProfile();

  // DEBUGGING: Yeh console check karein, yahan se pata chalega data kahan hai
//   useEffect(() => {
//     console.log("API Full Response:", Profile);
//   }, [Profile]);

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

  // Yahan data extract ho raha hai. 
  // Agar aapka API response structure alag hai, toh yahan change karein.
  const user = Profile?.data?.user || Profile?.user || Profile;
  const role = user?.roles?.[0]?.name || "N/A";

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="w-full bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 h-40"></div>

        {/* Body */}
        <div className="px-8 pb-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6 -mt-16 mb-10">
            <div className="w-32 h-32 rounded-full bg-red-600 border-4 border-white text-white text-5xl font-bold flex items-center justify-center shadow-md">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="mt-5 md:mt-16">
              <h2 className="text-3xl font-bold text-gray-800">{user?.name || "User Name"}</h2>
              <p className="text-red-600 font-medium capitalize">{role}</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "Full Name", value: user?.name },
              { label: "Email Address", value: user?.email },
              { label: "Phone Number", value: user?.phone },
              { label: "User Role", value: role },
            ].map((item, index) => (
              <div key={index}>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  {item.label}
                </label>
                <div className="w-full mt-2 border rounded-lg p-3 bg-gray-50 text-gray-700">
                  {item.value || "Not Available"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;