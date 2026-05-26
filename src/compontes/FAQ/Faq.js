import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Nav from '../nav/Nav'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addQuetionion } from '../../store/action/addData'

const Faq = ({ dispatch, res }) => {

    const [data, setData] = useState({
        question: "",
        answer: ""
    })

    const onHandelChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const addData = () => {
        if (!data.question || !data.answer) {
            toast.error("All fields are required", {
                position: toast.POSITION.TOP_CENTER
            })
            return;
        }
        dispatch(addQuetionion(data))
    }

    useEffect(() => {
        const response = res?.data?.data;

        if (response) {
            if (response.code === 201) {
                toast.success(response.message, {
                    position: toast.POSITION.TOP_CENTER
                })
                setTimeout(() => {
                    window.location = "/faq";
                }, 2000);
            }
        }
    }, [res])

    return (
        <Nav title="Frequently Asked Questions">

                <ToastContainer />

                <div className="flex justify-center items-center px-4 py-10">
                    <div className="w-full max-w-2xl">

                        {/* Card */}
                        <div className="bg-[#111827] rounded-2xl shadow-xl border border-[#1F2937] p-8">

                            {/* Header */}
                            <h1 className="text-center text-3xl font-bold text-white mb-8">
                                Add FAQ
                            </h1>

                            {/* Question */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                    Question
                                </label>
                                <input
                                    type="text"
                                    name="question"
                                    value={data.question}
                                    onChange={onHandelChange}
                                    placeholder="Enter your question"
                                    className="w-full px-4 py-3 rounded-xl bg-[#0F172A] text-white border border-[#1E293B] 
                                    focus:outline-none focus:ring-2 focus:ring-[#3DC0DF] transition"
                                />
                            </div>

                            {/* Answer */}
                            <div className="mb-8">
                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                    Answer
                                </label>
                                <textarea
                                    name="answer"
                                    value={data.answer}
                                    onChange={onHandelChange}
                                    placeholder="Enter answer"
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl bg-[#0F172A] text-white border border-[#1E293B] 
                                    focus:outline-none focus:ring-2 focus:ring-[#3DC0DF] transition resize-none"
                                />
                            </div>

                            {/* Button */}
                            <div className="text-center">
                                <button
                                    onClick={addData}
                                    className="px-8 py-3 rounded-xl font-semibold text-[#0B0F1A] 
                                    bg-gradient-to-r from-[#3DC0DF] to-[#5EEAD4]
                                    hover:from-[#5EEAD4] hover:to-[#3DC0DF]
                                    transition-all duration-300 shadow-lg"
                                >
                                    Save FAQ
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
        </Nav>
    )
}

const mapStateToProps = (state) => ({
    res: state.addQuetionion
})

export default connect(mapStateToProps)(Faq)