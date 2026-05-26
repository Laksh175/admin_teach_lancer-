import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import { FiEye } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaDotCircle } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'
import { AllCourseList, CourseDetails } from '../../store/action/getData'
import { createCourseGroup } from '../../store/action/addData'
import { deleteCourse } from '../../store/action/deleteData';
import Nav from '../nav/Nav'

/* ================= DARK MODAL STYLE ================= */
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 720,
    bgcolor: '#0F172A',
    color: '#E5E7EB',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    border: '1px solid #1F2937'
};

const inputDark =
  "w-full bg-[#0B1220] border border-[#1F2937] text-[#E5E7EB] rounded-xl px-4 py-2 focus:outline-none focus:border-[#3DC0DF]";

const labelDark = "text-sm text-gray-400 font-semibold mb-1";

/* =================================================== */

const CourseList = ({ dispatch, res, resdetail, resdetail2, resupdate, resdelete, group }) => {

    const [data, setData] = useState([]);
    const [viewData, setViewData] = useState();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState([]);

    const skill = viewData && viewData.skill

    /* ================= DATA LOAD ================= */
    useEffect(() => { dispatch(AllCourseList()); }, [dispatch])

    useEffect(() => {
        const dataa = res?.data?.data?.data
        if (dataa) {
            setData(dataa)
            setFilter(dataa)
        }
    }, [res])

    /* ================= SEARCH ================= */
    useEffect(() => {
        const result = data.filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase())
        )
        setFilter(result);
    }, [search, data])

    /* ================= VIEW MODAL ================= */
    const [open, setOpen] = useState(false);
    const viewcourse = (id) => {
        setOpen(true)
        dispatch(CourseDetails(id))
    }

    useEffect(() => {
        const data2 = resdetail?.data?.data?.data
        if (data2) setViewData(data2)
    }, [resdetail])

    /* ================= UPDATE ================= */
    const updateCoursee = (id) => {
        dispatch(CourseDetails(id))
    }

    useEffect(() => {
        const dataupdate = resupdate?.data?.data
        if (dataupdate?.code === 200) {
            toast.success("Course updated successfully")
            dispatch(AllCourseList());
        }
    }, [resupdate, dispatch])

    /* ================= DELETE ================= */
    const DeleteCourseData = (id) => dispatch(deleteCourse(id))

    useEffect(() => {
        const deleteData = resdelete?.data?.data
        if (deleteData?.code === 200) {
            toast.success(deleteData.message)
            dispatch(AllCourseList());
        }
    }, [resdelete, dispatch])

    /* ================= GROUP ================= */
    const [groupopen, setGroupopen] = useState(false);
    const [group_img, setGroup_img] = useState("");
    const [group_name, setGroup_name] = useState("");
    const [group_desc, setGroup_desc] = useState("");
    const [courseId, setCourseId] = useState("");
    const [teacherId, setTeacherId] = useState("")

    const formdata = new FormData();
    formdata.append("group_img", group_img);
    formdata.append("group_name", group_name);
    formdata.append("group_desc", group_desc);
    formdata.append("course_id", courseId);

    const CreateGroup = (e) => {
        e.preventDefault()
        dispatch(createCourseGroup(teacherId, formdata))
    }

    useEffect(() => {
        const data = group?.data?.data
        if (data?.code === 201) {
            toast.success(data.message)
            setTimeout(() => window.location = '/course', 1500);
        }
    }, [group])

    /* ================= UI ================= */
    return (
        <Nav title="Course Management">
                <ToastContainer />

                <div className="max-w-7xl mx-auto px-6 mt-10">

                    {/* ===== HEADER ===== */}
                    <div className="flex justify-between items-center mb-6">
                        <input
                            className="bg-[#0B1220] border border-[#1F2937] text-white rounded-xl px-4 py-2 w-[320px]"
                            placeholder="Search courses..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <Link to="add-course">
                            <button className="bg-[#3DC0DF] hover:bg-[#22D3EE] text-black font-bold px-5 py-2 rounded-xl transition">
                                + Add Course
                            </button>
                        </Link>
                    </div>

                    {/* ===== TABLE ===== */}
                    <div className="bg-[#111827] rounded-2xl border border-[#1F2937] overflow-hidden">
                        <table className="w-full text-sm text-gray-300">
                            <thead className="bg-[#0B1220] text-[#3DC0DF]">
                                <tr>
                                    <th className="p-4 text-left">Title</th>
                                    <th className="p-4 text-left">Teacher</th>
                                    <th className="p-4 text-center">Term</th>
                                    <th className="p-4 text-left">Qualification</th>
                                    <th className="p-4 text-left">ID Proof</th>
                                    <th className="p-4 text-center">Actions</th>
                                    <th className="p-4 text-center">Time</th>
                                    <th className="p-4 text-center">Group</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filter.length ? filter.map((val) => (
                                    <tr key={val._id} className="border-b border-[#1F2937] hover:bg-[#0B1220] transition">
                                        <td className="p-4">{val.title}</td>
                                        <td className="p-4">{val.teacher_name}</td>
                                        <td className="p-4 text-center">
                                            {val.term === 1
                                                ? <span className="px-3 py-1 bg-purple-600 rounded-full text-xs">Short</span>
                                                : <span className="px-3 py-1 bg-blue-600 rounded-full text-xs">Long</span>}
                                        </td>
                                        <td className="p-4">{val.criteria[0].qualification}</td>
                                        <td className="p-4">{val.criteria[0].id_proof}</td>

                                        <td className="p-4 text-center">
                                            <div className="flex justify-center gap-3">
                                                <Link to={`/course-user/${val._id}`}><HiUserGroup className="text-xl text-[#3DC0DF]" /></Link>
                                                <FaEdit className="text-xl text-yellow-400 cursor-pointer"
                                                    onClick={() => { updateCoursee(val._id); localStorage.setItem("CourseId", val._id) }}
                                                />
                                                <MdDeleteOutline className="text-xl text-red-500 cursor-pointer"
                                                    onClick={() => DeleteCourseData(val._id)} />
                                                <FiEye className="text-xl text-green-400 cursor-pointer"
                                                    onClick={() => viewcourse(val._id)} />
                                            </div>
                                        </td>

                                        <td className="p-4 text-center">
                                            <Link to={`/add-time/${val._id}`}>
                                                <button className="bg-[#3DC0DF] text-black px-3 py-1 rounded-lg text-xs font-bold">Timing</button>
                                            </Link>
                                        </td>

                                        <td className="p-4 text-center">
                                            <button
                                                className="bg-pink-600 text-white px-3 py-1 rounded-lg text-xs font-bold"
                                                onClick={() => { setGroupopen(true); setCourseId(val._id); setTeacherId(val.teacher_id) }}>
                                                Create
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="8" className="text-center p-10 text-gray-500">No Data Found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ================= VIEW MODAL ================= */}
                {viewData &&
                    <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition BackdropComponent={Backdrop}>
                        <Fade in={open}>
                            <Box sx={style}>
                                <h1 className="text-2xl font-bold text-center mb-4 text-[#3DC0DF]">{viewData.title}</h1>

                                <div className="space-y-2 text-sm">
                                    <p><b>Fees:</b> {viewData.fees}</p>
                                    <p><b>Candidate:</b> {viewData.candidate}</p>
                                    <p><b>Description:</b> {viewData.description}</p>

                                    <div>
                                        <p className="font-bold">Skills:</p>
                                        <div className="flex flex-wrap gap-3 mt-2">
                                            {skill?.map((s, i) => (
                                                <span key={i} className="bg-[#1F2937] px-3 py-1 rounded-full text-xs flex items-center gap-1">
                                                    <FaDotCircle className="text-[#3DC0DF]" /> {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </Fade>
                    </Modal>
                }

                {/* ================= GROUP MODAL ================= */}
                <Modal open={groupopen} onClose={() => setGroupopen(false)} closeAfterTransition BackdropComponent={Backdrop}>
                    <Fade in={groupopen}>
                        <Box sx={style}>
                            <h2 className="text-xl font-bold text-center mb-6 text-[#3DC0DF]">Create Course Group</h2>

                            <form onSubmit={CreateGroup} className="space-y-4">
                                <div>
                                    <label className={labelDark}>Group Icon</label>
                                    <input type="file" className={inputDark}
                                        onChange={(e) => setGroup_img(e.target.files[0])} />
                                </div>

                                <div>
                                    <label className={labelDark}>Group Title</label>
                                    <input type="text" className={inputDark}
                                        onChange={(e) => setGroup_name(e.target.value)} />
                                </div>

                                <div>
                                    <label className={labelDark}>Group Description</label>
                                    <input type="text" className={inputDark}
                                        onChange={(e) => setGroup_desc(e.target.value)} />
                                </div>

                                <div className="text-center pt-4">
                                    <button type="submit"
                                        className="bg-[#3DC0DF] hover:bg-[#22D3EE] text-black font-bold px-8 py-2 rounded-xl transition">
                                        Create Group
                                    </button>
                                </div>
                            </form>
                        </Box>
                    </Fade>
                </Modal>

        </Nav>
    )
}

const mapStateToProps = (state) => ({
    res: state.AllCourseList,
    resdetail: state.CourseDetails,
    resdetail2: state.CourseDetails,
    resupdate: state.updateCourse,
    resdelete: state.deleteCourse,
    group: state.createCourseGroup
})

export default connect(mapStateToProps)(CourseList)