// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { registerDoctor } from "@/utils/api";
// import { SPECIALIZATION, QUALIFICATIONS, GENDER } from "@/data/constant";

// export default function DoctorSignupPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [profilePreview, setProfilePreview] = useState(null);

//   const [data, setData] = useState({
//     fullname: "",
//     email: "",
//     password: "",
//     phone: "",
//     age: "",
//     gender: "",
//     profilePic: null,
//     experience: "",
//     about: "",
//     specialization: "",
//     qualifications: "",
//     address: {
//       street: "",
//       city: "",
//       state: "",
//       zip: "",
//       country: "India",
//     },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();

//       formData.append("fullname", data.fullname);
//       formData.append("email", data.email);
//       formData.append("password", data.password);
//       formData.append("phone", data.phone);
//       formData.append("age", data.age);
//       formData.append("gender", data.gender);
//       formData.append("experience", data.experience);
//       formData.append("about", data.about);
//       formData.append("specialization", data.specialization);
//       formData.append("qualifications", data.qualifications);

//       Object.keys(data.address).forEach((k) =>
//         formData.append(`address.${k}`, data.address[k])
//       );

//       if (data.profilePic) {
//         formData.append("profilePic", data.profilePic);
//       }

//       await registerDoctor(formData);

//       localStorage.setItem("pendingDoctorVerificationEmail", data.email);

//       toast.success("Signup successful 🎉 Verify your email");

//       router.push(`/doctor/verify-email?email=${data.email}`);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Signup failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
//       <div className="max-w-4xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800">
//             Doctor Registration
//           </h1>
//           <p className="text-gray-600">
//             Join as a healthcare professional
//           </p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <form onSubmit={handleSubmit} className="space-y-8">

//             {/* PERSONAL */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <input className="input" placeholder="Full Name"
//                 onChange={(e)=>setData({...data, fullname:e.target.value})} required />

//               <input type="email" className="input" placeholder="Email"
//                 onChange={(e)=>setData({...data, email:e.target.value})} required />

//               <input type="password" className="input" placeholder="Password"
//                 onChange={(e)=>setData({...data, password:e.target.value})} required />

//               <input className="input" placeholder="Phone"
//                 onChange={(e)=>setData({...data, phone:e.target.value})} required />

//               <input type="number" className="input" placeholder="Age"
//                 onChange={(e)=>setData({...data, age:e.target.value})} required />

//               <select className="input"
//                 onChange={(e)=>setData({...data, gender:e.target.value})}>
//                 <option value="">Select Gender</option>
//                 {GENDER.map((g)=>(
//                   <option key={g} value={g}>{g}</option>
//                 ))}
//               </select>
//             </div>

//             {/* PROFESSIONAL */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <input className="input" placeholder="Experience (years)"
//                 onChange={(e)=>setData({...data, experience:e.target.value})} required />

//               <select className="input"
//                 onChange={(e)=>setData({...data, specialization:e.target.value})}>
//                 <option value="">Specialization</option>
//                 {SPECIALIZATION.map((item)=>(
//                   <option key={item} value={item}>{item}</option>
//                 ))}
//               </select>

//               <select className="input"
//                 onChange={(e)=>setData({...data, qualifications:e.target.value})}>
//                 <option value="">Qualification</option>
//                 {QUALIFICATIONS.map((item)=>(
//                   <option key={item} value={item}>{item}</option>
//                 ))}
//               </select>
//             </div>

//             <textarea className="input w-full"
//               placeholder="About yourself"
//               onChange={(e)=>setData({...data, about:e.target.value})}
//               required
//             />

//             {/* ADDRESS */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <input className="input" placeholder="Street"
//                 onChange={(e)=>setData({...data,address:{...data.address,street:e.target.value}})} />

//               <input className="input" placeholder="City"
//                 onChange={(e)=>setData({...data,address:{...data.address,city:e.target.value}})} />

//               <input className="input" placeholder="State"
//                 onChange={(e)=>setData({...data,address:{...data.address,state:e.target.value}})} />

//               <input className="input" placeholder="ZIP"
//                 onChange={(e)=>setData({...data,address:{...data.address,zip:e.target.value}})} />
//             </div>

//             {/* PROFILE PIC */}
//             <div>
//               <label className="font-medium">Profile Picture</label>

//               <div className="flex items-center gap-4 mt-2">
//                 <div className="w-16 h-16 rounded-full border overflow-hidden bg-gray-100">
//                   {profilePreview ? (
//                     <img src={profilePreview} className="w-full h-full object-cover"/>
//                   ) : (
//                     <div className="flex items-center justify-center h-full">👨‍⚕️</div>
//                   )}
//                 </div>

//                 <input
//                   type="file"
//                   onChange={(e)=>{
//                     const file = e.target.files[0];
//                     if(file){
//                       setData({...data, profilePic:file});
//                       setProfilePreview(URL.createObjectURL(file));
//                     }
//                   }}
//                 />
//               </div>
//             </div>

//             {/* BUTTON */}
//             <button
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//             >
//               {loading ? "Creating..." : "Create Account"}
//             </button>

//           </form>
//         </div>

//         {/* LOGIN */}
//         <div className="text-center mt-6">
//           <a href="/doctor/login" className="text-blue-600 font-semibold">
//             Already have an account? Login
//           </a>
//         </div>

//       </div>
//     </div>
//   );
// }