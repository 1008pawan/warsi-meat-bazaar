import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Shield } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAdminLogin } from "../../hooks/useAdminLogin";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const navigate = useNavigate();
  const loginMutation = useAdminLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginMutation.mutate(formData, {
      onSuccess: (response) => {
        toast.success(response?.message || "Login Successful");

        const token = response?.token;
        const user = response?.user;

        if (token) {
          localStorage.setItem("adminToken", token);
        }

        if (user) {
          localStorage.setItem("adminUser", JSON.stringify(user));
        }

        navigate("/admin");
      },

      onError: (error) => {
        toast.error(error?.response?.data?.message || "Login Failed");
      },
    });
  };

  return (
    <div className="min-h-screen bg-red-600 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
            <Shield className="text-red-600" size={38} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-800">Admin Login</h1>

          <p className="text-gray-500 mt-2 text-center">
            Sign in to access the Warsi Meat Bazaar Admin Panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-zinc-300 px-4">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-4 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-zinc-300 px-4">
              <Lock size={18} className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-4 outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-500 cursor-pointer" />
                ) : (
                  <Eye size={18} className="text-gray-500 cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-xl bg-red-600 py-4 font-semibold text-white transition hover:bg-red-700 cursor-pointer"
          >
            {loginMutation.isPending ? "Signing In..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Warsi Meat Bazaar Admin
        </p>
      </div>
    </div>
  );
}
