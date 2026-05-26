import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiTeacher } from 'react-icons/gi';
import { FaDiscourse, FaUserFriends, FaIndustry } from 'react-icons/fa';
import { GoHome } from 'react-icons/go';
import { FcFaq } from 'react-icons/fc';
import { BiTimer } from 'react-icons/bi';
import { MdMenu, MdClose } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';

const Nav = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    window.location = "/";
  };

  const menu = [
    { name: "Home", path: "/home", icon: <GoHome /> },
    { name: "Teacher", path: "/teacher", icon: <GiTeacher /> },
    { name: "Course", path: "/course", icon: <FaDiscourse /> },
    { name: "FAQ", path: "/faq", icon: <FcFaq /> },
    { name: "Lecture Time", path: "/time-list", icon: <BiTimer /> },
    { name: "User", path: "/user", icon: <FaUserFriends /> },
    { name: "Company", path: "/company", icon: <FaIndustry /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#020617]">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed md:static z-50 h-screen flex flex-col 
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-16'}
        bg-[#020617]/95 backdrop-blur-xl border-r border-[#1E293B]`}
      >

        {/* Logo */}
        <div className="h-14 flex items-center justify-center border-b border-[#1E293B]">
          <span
            className={`text-white font-semibold tracking-tight transition-all duration-300
            ${isOpen ? 'text-lg opacity-100' : 'text-xs opacity-0'}`}
          >
            ADMIN PANEL
          </span>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {menu.map((item, i) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={i}
                to={item.path}
                onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                ${active
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-gray-300 hover:bg-[#1E293B] hover:text-white'
                  }`}
              >
                {/* Icon */}
                <span className="text-lg min-w-[24px] flex justify-center">
                  {item.icon}
                </span>

                {/* Text */}
                <span
                  className={`text-sm font-medium transition-all duration-300
                  ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3 pointer-events-none'}
                  hidden md:block`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div className="p-2 border-t border-[#1E293B]">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
            bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-semibold
            hover:scale-[1.03] transition-all shadow-md"
          >
            <FiLogOut className="text-base" />
            {isOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <header className="h-14 flex-shrink-0 flex items-center justify-between px-5
        bg-[#020617]/90 backdrop-blur-xl border-b border-[#1E293B]">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-[#1E293B] hover:bg-cyan-500/10 text-white transition-all"
            >
              {isOpen ? <MdClose size={20} /> : <MdMenu size={20} />}
            </button>

            <h1 className="text-white text-lg font-semibold capitalize tracking-tight">
              {title || "Dashboard"}
            </h1>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
            bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-semibold
            hover:scale-105 transition-all"
          >
            <FiLogOut className="text-sm" /> Logout
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 bg-gradient-to-br from-[#020617] via-[#0B1220] to-[#020617]">
          {children}
        </main>

      </div>
    </div>
  );
};

export default Nav;