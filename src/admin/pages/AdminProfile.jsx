import React from "react";
import { useState } from "react";
import { useProfile } from "../../hooks/useAdminProfile";
import ChangePasswordModal from "../ui/ChangePasswordModal";

const AdminProfile = () => {
  const { data: Profile, isLoading, error } = useProfile();

  const [openModal, setOpenModal] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-lg font-semibold">
        Failed to load profile.
      </div>
    );
  }

  const user = Profile?.data?.user || Profile?.user || Profile;
  const role = user?.roles?.[0]?.name || "N/A";

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg">

          {/* Header */}
          <div className="h-36 md:h-48 bg-red-600"></div>

          {/* Profile Section */}
          <div className="px-5 md:px-10 pb-10">

            <div className="-mt-16 flex flex-col items-center md:flex-row md:items-end gap-5">

              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-red-600 text-5xl font-bold text-white shadow-lg">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>

              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
                  {user?.name || "User"}
                </h2>

                <p className="mt-1 text-red-600 font-semibold capitalize">
                  {role}
                </p>
              </div>

            </div>

            {/* Profile Details */}
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">

              {[
                { label: "Full Name", value: user?.name },
                { label: "Email Address", value: user?.email },
                { label: "Phone Number", value: user?.phone },
                { label: "User Role", value: role },
              ].map((item, index) => (
                <div key={index}>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {item.label}
                  </label>

                  <div className="rounded-lg border bg-gray-50 p-3 text-gray-700">
                    {item.value || "Not Available"}
                  </div>
                </div>
              ))}

            </div>

            {/* Button */}
            <div className="mt-10 flex justify-center md:justify-end">
              <button
                onClick={() => setOpenModal(true)}
                className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-500"
              >
                Change Password
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Modal */}
      <ChangePasswordModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default AdminProfile;