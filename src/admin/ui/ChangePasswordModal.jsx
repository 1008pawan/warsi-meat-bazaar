import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useChangePassword } from "../../hooks/useChangePassword";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const { mutate, isPending } = useChangePassword();

  const initialState = {
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const handleClose = () => {
    setFormData(initialState);
    setShowPassword({
      current: false,
      new: false,
      confirm: false,
    });
    onClose();
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default page reload on form submit

    if (
      !formData.current_password ||
      !formData.new_password ||
      !formData.new_password_confirmation
    ) {
      return alert("Please fill all fields.");
    }

    if (formData.new_password !== formData.new_password_confirmation) {
      return alert("Password confirmation does not match.");
    }

    mutate(formData, {
      onSuccess: (res) => {
        alert(res.message || "Password updated successfully.");
        handleClose();
      },
      onError: (err) => {
        console.log(err.response?.data);

        if (err.response?.data?.errors) {
          const firstError = Object.values(err.response.data.errors)[0][0];
          alert(firstError);
          return;
        }

        alert(err.response?.data?.message || "Something went wrong.");
      },
    });
  };

  // Input configuration to keep JSX clean and prevent re-render focus issues
  const inputFields = [
    {
      label: "Current Password",
      name: "current_password",
      visibleKey: "current",
      placeholder: "Enter current password",
    },
    {
      label: "New Password",
      name: "new_password",
      visibleKey: "new",
      placeholder: "Enter new password",
    },
    {
      label: "Confirm Password",
      name: "new_password_confirmation",
      visibleKey: "confirm",
      placeholder: "Confirm new password",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-md max-h-[95vh] flex-col overflow-y-auto rounded-2xl bg-white shadow-2xl animate-[fadeIn_.25s_ease]"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
            Change Password
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-3xl leading-none text-gray-400 transition-colors hover:text-red-600"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="space-y-5 p-6">
            {inputFields.map(({ label, name, visibleKey, placeholder }) => (
              <div key={name}>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  {label}
                </label>
                <div className="relative">
                  <input
                    type={showPassword[visibleKey] ? "text" : "password"}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 text-sm outline-none transition-all focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword(visibleKey)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-black"
                    tabIndex="-1" // Prevents tab from focusing the eye icon, improving keyboard navigation
                  >
                    {showPassword[visibleKey] ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t bg-gray-50 px-6 py-4 rounded-b-2xl sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="w-full rounded-xl border border-gray-300 bg-white px-5 py-2.5 font-medium transition-colors hover:bg-gray-100 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center rounded-xl bg-yellow-400 px-6 py-2.5 font-semibold text-black transition-colors hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isPending ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}