import React from 'react'
import { MdDashboard } from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'

const TopHeader = () => {

  const logout = () => {
    localStorage.removeItem('token');
    window.location = "/";
  }

  return (
    <>
      <div className="w-full h-[70px] flex justify-between items-center px-6 
        bg-white/10 backdrop-blur-xl border-b border-white/20">

        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl shadow-lg">
            <MdDashboard />
          </div>
          <div>
            <p className="text-white text-lg font-semibold">Dashboard</p>
            <p className="text-gray-400 text-xs">Admin Panel</p>
          </div>
        </div>

        {/* Right */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl 
          bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold
          hover:scale-105 transition-transform shadow-lg"
        >
          <FiLogOut />
          Logout
        </button>

      </div>
    </>
  )
}

export default TopHeader