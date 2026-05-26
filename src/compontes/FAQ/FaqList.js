import React, { useEffect, useState } from 'react'
import Nav from '../nav/Nav'
import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import { connect } from 'react-redux'
import { allfaqList, viewAnswer } from '../../store/action/getData'
import { updateQuestion } from '../../store/action/addData'
import { deleteFaq } from '../../store/action/deleteData'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'

const glassStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 520,
  background: 'rgba(15,23,42,0.9)',
  border: '1px solid rgba(255,255,255,0.1)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 0 40px rgba(0,0,0,0.6)',
  borderRadius: 16,
  padding: 24,
  color: '#fff'
}

const FaqList = ({ dispatch, res, resanswer, resupdate, resdelete }) => {

  const [faqlist, setFaqlist] = useState([])
  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState("")
  const [answer, setAnswer] = useState({})
  const [updatedata, setUpdateData] = useState({ question: "", answer: "" })

  const [openView, setOpenView] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)

  /* ================= FETCH FAQ ================= */
  useEffect(() => {
    dispatch(allfaqList())
  }, [dispatch])

  useEffect(() => {
    const data = res?.data?.data?.data
    if (data) {
      setFaqlist(data)
      setFilter(data)
    }
  }, [res])

  /* ================= SEARCH ================= */
  useEffect(() => {
    const result = faqlist.filter(item =>
      item.question.toLowerCase().includes(search.toLowerCase())
    )
    setFilter(result)
  }, [search, faqlist])

  /* ================= VIEW ANSWER ================= */
  const viewans = (id) => {
    dispatch(viewAnswer(id))
    setOpenView(true)
  }

  useEffect(() => {
    const data = resanswer?.data?.data?.data
    if (data) setAnswer(data)
  }, [resanswer])

  /* ================= UPDATE ================= */
  const viewfaq = (id) => {
    dispatch(viewAnswer(id))
    localStorage.setItem("que_id", id)
    setOpenUpdate(true)
  }

  useEffect(() => {
    const data = resanswer?.data?.data?.data
    if (data) setUpdateData(data)
  }, [resanswer])

  const updateFaq = () => {
    const id = localStorage.getItem("que_id")
    dispatch(updateQuestion(id, updatedata))
  }

  useEffect(() => {
    const data = resupdate?.data?.data
    if (data?.code === 200) {
      toast.success(data.message)
      setOpenUpdate(false)
      dispatch(allfaqList())
    }
  }, [resupdate, dispatch])

  /* ================= DELETE ================= */
  const DeleteFAQ = (id) => {
    dispatch(deleteFaq(id))
  }

  useEffect(() => {
    const data = resdelete?.data?.data
    if (data?.code === 200) {
      toast.success(data.message)
      dispatch(allfaqList())
    }
  }, [resdelete, dispatch])

  return (
    <Nav title="Frequently Asked Questions">

        <ToastContainer />

        {/* Container */}
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-12">

          {/* Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

              {/* Search */}
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full px-4 py-2 rounded-xl bg-black/40 
                  border border-white/10 text-white placeholder-gray-400
                  focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              {/* Add Button */}
              <Link to="add-question">
                <button className="px-5 py-2 rounded-xl font-semibold text-white
                bg-gradient-to-r from-cyan-500 to-blue-600
                hover:scale-105 transition-transform shadow-lg">
                  + Add New
                </button>
              </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white/10 text-left">
                    <th className="p-3 text-sm font-semibold text-cyan-400">Question</th>
                    <th className="p-3 text-sm font-semibold text-cyan-400 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filter.length > 0 ? filter.map((val) => (
                    <tr key={val._id} className="border-b border-white/10 hover:bg-white/5 transition">
                      <td className="p-3 text-sm text-gray-200">
                        {val.question}
                      </td>

                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-3">

                          <button
                            onClick={() => viewfaq(val._id)}
                            className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition"
                          >
                            <FaEdit />
                          </button>

                          <button
                            onClick={() => DeleteFAQ(val._id)}
                            className="p-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
                          >
                            <MdDeleteOutline />
                          </button>

                          <button
                            onClick={() => viewans(val._id)}
                            className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-sm font-semibold"
                          >
                            View
                          </button>

                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="2" className="p-6 text-center text-gray-400">
                        No FAQ Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* View Answer Modal */}
        <Modal open={openView} onClose={() => setOpenView(false)} closeAfterTransition BackdropComponent={Backdrop}>
          <Fade in={openView}>
            <Box sx={glassStyle}>
              <h2 className="text-xl font-semibold text-cyan-400 text-center mb-4">Answer</h2>
              <p className="text-gray-200 text-sm leading-relaxed">{answer?.answer}</p>
            </Box>
          </Fade>
        </Modal>

        {/* Update Modal */}
        <Modal open={openUpdate} onClose={() => setOpenUpdate(false)} closeAfterTransition BackdropComponent={Backdrop}>
          <Fade in={openUpdate}>
            <Box sx={glassStyle}>
              <h2 className="text-xl font-semibold text-cyan-400 text-center mb-6">Update FAQ</h2>

              <div className="space-y-4">
                <input
                  type="text"
                  name="question"
                  value={updatedata.question}
                  onChange={(e) => setUpdateData({ ...updatedata, question: e.target.value })}
                  placeholder="Question"
                  className="w-full px-4 py-2 rounded-xl bg-black/40 
                  border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />

                <textarea
                  name="answer"
                  value={updatedata.answer}
                  onChange={(e) => setUpdateData({ ...updatedata, answer: e.target.value })}
                  placeholder="Answer"
                  rows={4}
                  className="w-full px-4 py-2 rounded-xl bg-black/40 
                  border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                />

                <div className="text-center pt-4">
                  <button
                    onClick={updateFaq}
                    className="px-6 py-2 rounded-xl font-semibold text-white
                    bg-gradient-to-r from-cyan-500 to-blue-600
                    hover:scale-105 transition-transform shadow-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

            </Box>
          </Fade>
        </Modal>

    </Nav>
  )
}

const mapStateToProps = (state) => ({
  res: state.allfaqList,
  resanswer: state.viewAnswer,
  resupdate: state.updateQuestion,
  resdelete: state.deleteFaq
})

export default connect(mapStateToProps)(FaqList)