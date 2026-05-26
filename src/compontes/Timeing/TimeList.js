import React, { useEffect, useState } from 'react'
import Nav from '../nav/Nav'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import { courseTimeList, lectureTimeById } from '../../store/action/getData'
import { connect } from 'react-redux'
import { updateCourseTime } from '../../store/action/addData'
import { deleteLectureTime } from '../../store/action/deleteData'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: '#0B0F1A',
    borderRadius: '16px',
    boxShadow: 24,
    border: '1px solid #1E293B'
};

const TimeList = ({ res, dispatch, resupdate, resview, resdelete }) => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState("");

    

    const [updatedata, setUpdateData] = useState({
        start_date: "",
        end_date: "",
        type: "",
        day: "",
        start_time: "",
        end_time: "",
        slot: "",
        timezone: "",
        course_id: ""
    });

    const [updateopen, setUpateOpen] = useState(false);
    const handleOpenupdate = () => setUpateOpen(true);
    const handleCloseupdate = () => setUpateOpen(false);

    /* Fetch list */
    useEffect(() => {
        dispatch(courseTimeList())
    }, [dispatch])

    useEffect(() => {
        const list = res?.data?.data?.data;
        if (list) {
            setData(list)
            setFilter(list)
        }
    }, [res])

    /* View by ID */
    const viewLecturetime = (id) => {
        dispatch(lectureTimeById(id))
        localStorage.setItem("lecture_id", id)
        handleOpenupdate()
    }

    useEffect(() => {
        const viewData = resview?.data?.data?.data;
        if (viewData?.length) {
            setUpdateData(viewData[0]);
        }
    }, [resview])

    /* Update form change */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateData({ ...updatedata, [name]: value });
    }

    const updateTime = () => {
        const id = localStorage.getItem("lecture_id")
        dispatch(updateCourseTime(id, updatedata));
    }

    useEffect(() => {
        const response = resupdate?.data?.data;
        if (response?.code === 200) {
            toast.success(response.message, { position: toast.POSITION.TOP_CENTER })
            dispatch(courseTimeList())
            handleCloseupdate()
        }
    }, [resupdate, dispatch])

    /* Delete */
    const deleteLecture = (id) => {
        dispatch(deleteLectureTime(id));
    }

    useEffect(() => {
        const response = resdelete?.data?.data;
        if (response?.code === 200) {
            toast.success(response.message, { position: toast.POSITION.TOP_CENTER })
            dispatch(courseTimeList())
        }
    }, [resdelete, dispatch])

    /* Search */
    useEffect(() => {
        const result = data.filter(item =>
            item.course_name?.toLowerCase().includes(search.toLowerCase())
        );
        setFilter(result)
    }, [search, data])

    return (
        <Nav title="Time List">
            <div className="text-white">
                <ToastContainer />

                <div className="max-w-7xl mx-auto px-6 py-10 mt-5">

                    {/* Search */}
                    <div className="mb-6 flex justify-between items-center">
                        <div className="w-full max-w-md">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by course name..."
                                className="w-full px-4 py-3 rounded-xl bg-[#0F172A] text-white border border-[#1E293B]
                                focus:outline-none focus:ring-2 focus:ring-[#3DC0DF]"
                            />
                        </div>
                    </div>

                    {/* Table Card */}
                    <div className="bg-[#111827] rounded-2xl shadow-xl border border-[#1E293B] overflow-hidden">

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-[#0F172A] text-gray-300 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Course Name</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Time</th>
                                        <th className="px-6 py-4">Slot</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filter.length ? filter.map((val) => (
                                        <tr key={val._id} className="border-b border-[#1E293B] hover:bg-[#0F172A] transition">
                                            <td className="px-6 py-4">{val.course_name}</td>
                                            <td className="px-6 py-4">{val.start_date} → {val.end_date}</td>
                                            <td className="px-6 py-4">{val.start_time} → {val.end_time}</td>
                                            <td className="px-6 py-4">{val.slot}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center gap-3">
                                                    <button
                                                        onClick={() => viewLecturetime(val._id)}
                                                        className="p-2 rounded-lg bg-[#3DC0DF] text-[#0B0F1A] hover:scale-105 transition"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteLecture(val._id)}
                                                        className="p-2 rounded-lg bg-red-500 text-white hover:scale-105 transition"
                                                    >
                                                        <MdDeleteOutline />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-10 text-gray-400">
                                                No Data Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Update Modal */}
                <Modal
                    open={updateopen}
                    onClose={handleCloseupdate}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 300 }}
                >
                    <Fade in={updateopen}>
                        <Box sx={modalStyle}>
                            <div className="p-8 text-white">
                                <h2 className="text-2xl font-bold text-center mb-6">Update Course Time</h2>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        ["start_date", "Start Date", "date"],
                                        ["end_date", "End Date", "date"],
                                        ["start_time", "Start Time", "time"],
                                        ["end_time", "End Time", "time"],
                                    ].map(([name, label, type]) => (
                                        <div key={name}>
                                            <label className="block text-sm text-gray-300 mb-1">{label}</label>
                                            <input
                                                type={type}
                                                name={name}
                                                value={updatedata[name]}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 rounded-lg bg-[#0F172A] text-white border border-[#1E293B]"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm text-gray-300 mb-1">Days</label>
                                    <input
                                        type="text"
                                        name="day"
                                        value={updatedata.day}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded-lg bg-[#0F172A] text-white border border-[#1E293B]"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-1">Slot</label>
                                        <input
                                            type="text"
                                            name="slot"
                                            value={updatedata.slot}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 rounded-lg bg-[#0F172A] text-white border border-[#1E293B]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-1">Timezone</label>
                                        <input
                                            type="text"
                                            name="timezone"
                                            value={updatedata.timezone}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 rounded-lg bg-[#0F172A] text-white border border-[#1E293B]"
                                        />
                                    </div>
                                </div>

                                <div className="text-center mt-6">
                                    <button
                                        onClick={updateTime}
                                        className="px-8 py-3 rounded-xl font-semibold text-[#0B0F1A]
                                        bg-gradient-to-r from-[#3DC0DF] to-[#5EEAD4]
                                        hover:from-[#5EEAD4] hover:to-[#3DC0DF]
                                        transition shadow-lg"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </Nav>
    )
}

const mapStateToProps = (state) => ({
    res: state.courseTimeList,
    resupdate: state.updateCourseTime,
    resview: state.lectureTimeById,
    resdelete: state.deleteLectureTime
})

export default connect(mapStateToProps)(TimeList)