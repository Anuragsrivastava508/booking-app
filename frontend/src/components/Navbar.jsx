"use client";

import { useState, useRef, useContext } from "react";
import Link from "next/link";
import { Menu, X, UserCircle, LogOut } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";

const Navbar = ({ Propuser }) => {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const currentUser = Propuser || user;

  const profilePath =
    currentUser?.role === "admin"
      ? "/admin/profile"
      : currentUser?.role === "doctor"
      ? "/doctor/profile"
      : "/patient/profile";

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
         Health Care Assistant
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/#features" className="hover:text-blue-600">Features</Link>
          <Link href="/#about" className="hover:text-blue-600">About</Link>
          <Link href="/#contact" className="hover:text-blue-600">Contact</Link>

          {!currentUser && (
            <Link
              href="/auth/login"
              className="px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition"
            >
              Get Started
            </Link>
          )}
        </nav>

        {/* Right side profile dropdown */}
        {currentUser && (
          <div className="relative hidden md:block">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <UserCircle className="text-white" size={18} />
              </div>
              <span className="font-medium text-gray-700">{currentUser.fullname}</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 bg-white w-56 rounded-xl border shadow-lg py-2">
                <p className="px-4 py-2 text-sm text-gray-600 border-b">{currentUser.email}</p>

                <Link
                  href={profilePath}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700"
                >
                  <UserCircle size={18} /> Profile Settings
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t shadow-sm p-4 space-y-4 font-medium text-gray-700">
          <Link href="/" onClick={() => setMobileMenu(false)} className="block">Home</Link>
          <Link href="/#features" onClick={() => setMobileMenu(false)} className="block">Features</Link>
          <Link href="/#about" onClick={() => setMobileMenu(false)} className="block">About</Link>
          <Link href="/#contact" onClick={() => setMobileMenu(false)} className="block">Contact</Link>

          {!currentUser && (
            <Link
              href="/auth/login"
              className="block px-5 py-2 text-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              onClick={() => setMobileMenu(false)}
            >
              Get Started
            </Link>
          )}

          {currentUser && (
            <>
              <Link
                href={profilePath}
                className="block px-4 py-2 rounded-lg bg-blue-50 text-blue-700"
                onClick={() => setMobileMenu(false)}
              >
                Profile Settings
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-red-600 rounded-lg hover:bg-red-50"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;



// "use client";

// import { useState, useRef, useContext } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { User, ChevronDown, UserCircle, LogOut } from "lucide-react";
// import { AuthContext } from "@/context/AuthContext";
// import API from "@/utils/api";

// const Navbar = ({ Propuser }) => {
//   const [open, setOpen] = useState(false);
//   const router = useRouter();
//   const { user, authLoading, logout } = useContext(AuthContext);
//   const dropdownRef = useRef(null);

//   const handleLogout = () => {
//     logout(); // clears tokens + redirects
//   };

//   // Use Propuser if provided, otherwise use context user
//   const currentUser = Propuser || user;

//   // Role-based profile path
//   const profilePath = currentUser?.role === "admin"
//       ? "/admin/profile"
//       : currentUser?.role === "doctor"
//       ? "/doctor/profile"
//       : "/patient/profile";

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               health Care Assistant
//             </h1>
//           </div>
//           {currentUser && (
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setOpen(!open)}
//                 className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-300"
//               >
//                 <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                   <User className="text-white" size={16} />
//                 </div>
//                 <span className="text-gray-700 font-medium">
//                   {currentUser?.fullname}
//                 </span>
//                 <ChevronDown
//                   className={`text-gray-500 transform transition-transform duration-300 ${
//                     open ? "rotate-180" : "rotate-0"
//                   }`}
//                   size={16}
//                 />
//               </button>

//               {open && (
//                 <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50">
//                   <div className="px-4 py-3 border-b border-gray-100">
//                     <p className="text-sm font-medium text-gray-900">
//                       {currentUser?.fullname}
//                     </p>
//                     <p className="text-xs text-gray-500">{currentUser?.email}</p>
//                     {currentUser?.role === "admin" && (
//                       <span className="inline-block mt-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
//                         Administrator
//                       </span>
//                     )}
//                     {currentUser?.role === "doctor" && (
//                       <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
//                         Doctor
//                       </span>
//                     )}
//                     {currentUser?.role === "patient" && (
//                       <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
//                         Patient
//                       </span>
//                     )}
//                   </div>

//                   <Link
//                     href={profilePath}
//                     onClick={() => setOpen(false)}
//                     className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//                   >
//                     <UserCircle size={18} />
//                     Profile Settings
//                   </Link>

//                   <div className="border-t border-gray-100 mt-2 pt-2">
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
//                     >
//                       <LogOut size={18} />
//                       Sign Out
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
