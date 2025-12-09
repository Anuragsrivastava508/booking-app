"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { registerAdmin } from "@/utils/api"; // <--- confirm path if different

export default function AdminSignupPage() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerAdmin({ fullname, email, password });
      toast.success("Admin registered successfully!");
      router.push("/admin/login");
    } catch (err) {
      toast.error(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          Admin Signup
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Email Address</label>
            <input
              type="email"
              className="w-full border rounded-lg p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white p-3 rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Admin Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-red-600 font-semibold cursor-pointer"
            onClick={() => router.push("/admin/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
