import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addCourseTime } from '../../store/action/addData'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Nav from '../nav/Nav'

const Addtime = ({ dispatch, res }) => {

  const params = useParams()

  const [error, setError] = useState("")
  const [errorend, setErrorend] = useState("")

  const [data, setData] = useState({
    start_date: "",
    end_date: "",
    type: "",
    day: "",
    start_time: "",
    end_time: "",
    slot: "",
    timezone: ""
  })

  const onHandleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))

    // Start Date Validation
    if (name === "start_date") {
      const today = new Date()
      const selected = new Date(value)

      if (selected >= today) {
        setError("")
      } else {
        setError("Start date must be today or future")
      }
    }

    // End Date Validation
    if (name === "end_date") {
      const start = new Date(data.start_date)
      const end = new Date(value)

      if (end >= start) {
        setErrorend("")
      } else {
        setErrorend("End date must be after start date")
      }
    }
  }

  const addTimeData = () => {
    dispatch(addCourseTime({ course_id: params.id, ...data }))
  }

  useEffect(() => {
    const dataa = res?.data?.data?.data
    if (dataa && res?.data?.data?.code === 201) {
      toast.success(res.data.data.message, {
        position: toast.POSITION.TOP_CENTER
      })

      setTimeout(() => {
        window.location = '/time-list'
      }, 2000)
    }
  }, [res])

  return (
    <Nav title="Add Course Time">
      {/* Page Wrapper */}
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white">

        <ToastContainer />

        {/* Container */}
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-12">

          {/* Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold">Add Course Time</h1>
              <p className="text-gray-400 text-sm mt-2">Create schedule for selected course</p>
            </div>

            {/* Form */}
            <div className="space-y-5">

              {/* Course ID */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-300">Course ID</label>
                <input
                  type="text"
                  value={params.id}
                  disabled
                  className="w-full px-4 py-2 rounded-xl bg-black/40 
                  border border-white/10 text-gray-400"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-300">Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    value={data.start_date}
                    onChange={onHandleChange}
                    className="w-full px-4 py-2 rounded-xl bg-black/40 
                    border border-white/10 text-white focus:outline-none 
                    focus:border-cyan-400 transition"
                  />
                  {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-300">End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    value={data.end_date}
                    onChange={onHandleChange}
                    className="w-full px-4 py-2 rounded-xl bg-black/40 
                    border border-white/10 text-white focus:outline-none 
                    focus:border-cyan-400 transition"
                  />
                  {errorend && <p className="text-red-400 text-xs mt-1">{errorend}</p>}
                </div>
              </div>

              {/* Days */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-300">Days</label>
                <input
                  type="text"
                  name="day"
                  placeholder="Monday, Tuesday, Wednesday"
                  value={data.day}
                  onChange={onHandleChange}
                  className="w-full px-4 py-2 rounded-xl bg-black/40 
                  border border-white/10 text-white placeholder-gray-500 
                  focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              {/* Times */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-300">Start Time</label>
                  <input
                    type="time"
                    name="start_time"
                    value={data.start_time}
                    onChange={onHandleChange}
                    className="w-full px-4 py-2 rounded-xl bg-black/40 
                    border border-white/10 text-white focus:outline-none 
                    focus:border-cyan-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-300">End Time</label>
                  <input
                    type="time"
                    name="end_time"
                    value={data.end_time}
                    onChange={onHandleChange}
                    className="w-full px-4 py-2 rounded-xl bg-black/40 
                    border border-white/10 text-white focus:outline-none 
                    focus:border-cyan-400 transition"
                  />
                </div>
              </div>

              {/* Slot */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-300">Slot</label>
                <input
                  type="text"
                  name="slot"
                  value={data.slot}
                  onChange={onHandleChange}
                  placeholder="e.g. Morning / Evening"
                  className="w-full px-4 py-2 rounded-xl bg-black/40 
                  border border-white/10 text-white placeholder-gray-500 
                  focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-300">Time Zone</label>
                <input
                  type="text"
                  name="timezone"
                  value={data.timezone}
                  onChange={onHandleChange}
                  placeholder="Asia/Kolkata"
                  className="w-full px-4 py-2 rounded-xl bg-black/40 
                  border border-white/10 text-white placeholder-gray-500 
                  focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              {/* Button */}
              <div className="pt-6 text-center">
                <button
                  onClick={addTimeData}
                  className="px-8 py-3 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-cyan-500 to-blue-600
                  hover:scale-105 transition-transform shadow-lg"
                >
                  Save Course Time
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </Nav>
  )
}

const mapStateToProps = (state) => ({
  res: state.addCourseTime
})

export default connect(mapStateToProps)(Addtime)