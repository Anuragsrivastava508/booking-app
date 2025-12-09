"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { registerDoctor } from "@/utils/api";

export default function DoctorSignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "male",
    profilePic: null,
    experience: "",
    about: "",
    specialization: "",
    qualifications: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "India",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("fullname", data.fullname);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone", data.phone);
      formData.append("age", data.age);
      formData.append("gender", data.gender);
      formData.append("experience", data.experience);
      formData.append("about", data.about);

      // specialization & qualifications → array
      data.specialization.split(",").forEach((item) =>
        formData.append("specialization", item.trim())
      );
      data.qualifications.split(",").forEach((item) =>
        formData.append("qualifications", item.trim())
      );

      // address
      Object.keys(data.address).forEach((k) =>
        formData.append(`address.${k}`, data.address[k])
      );

      if (data.profilePic) {
        formData.append("profilePic", data.profilePic);
      }

      await registerDoctor(formData);
      toast.success("Signup successful 🎉 Please verify your email");
      router.push(`/doctor/verify-email?email=${data.email}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 max-w-xl w-full shadow-xl rounded-2xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Doctor Signup</h2>

        <input className="input" placeholder="Full Name"
          onChange={(e) => setData({ ...data, fullname: e.target.value })} required />

        <input type="email" className="input" placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })} required />

        <input type="password" className="input" placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })} required />

        <input className="input" placeholder="Phone"
          onChange={(e) => setData({ ...data, phone: e.target.value })} required />

        <input type="number" className="input" placeholder="Age"
          onChange={(e) => setData({ ...data, age: e.target.value })} required />

        <select className="input"
          onChange={(e) => setData({ ...data, gender: e.target.value })}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* NEW REQUIRED FIELDS */}
        <input className="input" placeholder="Experience (Years)"
          onChange={(e) => setData({ ...data, experience: e.target.value })} required />

        <textarea className="input" placeholder="About / Bio"
          onChange={(e) => setData({ ...data, about: e.target.value })} required />

        <input className="input" placeholder="Specialization (e.g Cardiology, Neurology)"
          onChange={(e) => setData({ ...data, specialization: e.target.value })} required />

        <input className="input" placeholder="Qualifications (e.g MBBS, MD)"
          onChange={(e) => setData({ ...data, qualifications: e.target.value })} required />

        {/* Address */}
        <input className="input" placeholder="Street"
          onChange={(e) => setData({ ...data, address: { ...data.address, street: e.target.value } })} required />
        <input className="input" placeholder="City"
          onChange={(e) => setData({ ...data, address: { ...data.address, city: e.target.value } })} required />
        <input className="input" placeholder="State"
          onChange={(e) => setData({ ...data, address: { ...data.address, state: e.target.value } })} required />
        <input className="input" placeholder="ZIP"
          onChange={(e) => setData({ ...data, address: { ...data.address, zip: e.target.value } })} required />

        {/* Profile Picture */}
        <label className="font-semibold">Profile Picture</label>
        <input
          type="file"
          onChange={(e) => setData({ ...data, profilePic: e.target.files[0] })}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Creating account..." : "Signup"}
        </button>
      </form>
    </div>
  );
}
