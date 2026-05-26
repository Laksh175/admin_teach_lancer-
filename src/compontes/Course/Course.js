import React, { useEffect, useState } from 'react'
import { insertCourse } from '../../store/action/addData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import Nav from '../nav/Nav'
import { teacherList } from '../../store/action/getData';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CourseAddvalidationSchema } from '../../validation';

/* ================= THEME ================= */
const inputDark =
  "w-full bg-[#0B1220] border border-[#1F2937] text-[#E5E7EB] rounded-xl px-4 py-2 focus:outline-none focus:border-[#3DC0DF] transition";

const labelDark =
  "text-sm text-gray-400 font-semibold mb-1";

const errorText =
  "text-red-400 text-xs mt-1 text-left";

const Course = ({ dispatch, res, resunicode }) => {

    const [unique_code, setUnique_code] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [skill, setSkill] = useState("");
    const [term, setTerm] = useState("");
    const [qualification, setQualification] = useState("");
    const [id_proof, setId_proof] = useState("");
    const [age, setAge] = useState("");
    const [fees, setFees] = useState("");
    const [communication, setCommunication] = useState("");
    const [hardware, setHardware] = useState("");
    const [candidate, setCandidate] = useState("");
    const [unicode, setUnicode] = useState([]);

    const formData = new FormData();
    formData.append("unique_code", unique_code);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("skill", skill);
    formData.append("term", term);
    formData.append("qualification", qualification);
    formData.append("id_proof", id_proof);
    formData.append("age", age);
    formData.append("fees", fees)
    formData.append("communication", communication);
    formData.append("hardware", hardware);
    formData.append("candidate", candidate);

    const formOptions = { resolver: yupResolver(CourseAddvalidationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = () => {
        dispatch(insertCourse(formData));
    }

    /* ================= API HANDLING ================= */
    useEffect(() => {
        const data = res?.data?.data
        if (data?.code === 201) {
            toast.success(data.message, { position: toast.POSITION.TOP_CENTER })
            setTimeout(() => { window.location = "/course" }, 1500);
        }
    }, [res])

    useEffect(() => { dispatch(teacherList()) }, [dispatch])

    useEffect(() => {
        const dataa = resunicode?.data?.data?.data
        if (dataa) setUnicode(dataa)
    }, [resunicode])

    return (
        <Nav title="Add Course">
            <div className='bg-[#0F172A] min-h-screen'>
                <ToastContainer />

                <div className='max-w-4xl mx-auto px-6 py-10 mt-24'>
                    <div className='bg-[#111827] border border-[#1F2937] rounded-2xl shadow-xl p-8'>

                        <h1 className='text-3xl font-bold text-center text-[#3DC0DF] mb-8'>
                            Course Details
                        </h1>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* ================= TEACHER + TITLE ================= */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='flex flex-col'>
                                    <label className={labelDark}>Teacher Name</label>
                                    <select
                                        {...register('unique_code')}
                                        value={unique_code}
                                        onChange={(e) => setUnique_code(e.target.value)}
                                        className={inputDark}
                                    >
                                        <option value="">Choose Teacher</option>
                                        {unicode.map((val) => (
                                            <option key={val.unique_code} value={val.unique_code}>
                                                {val.first_name} {val.last_name}
                                            </option>
                                        ))}
                                    </select>
                                    <p className={errorText}>{errors.unique_code?.message}</p>
                                </div>

                                <div className='flex flex-col'>
                                    <label className={labelDark}>Course Title</label>
                                    <input
                                        {...register('title')}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className={inputDark}
                                        placeholder="Enter course title"
                                    />
                                    <p className={errorText}>{errors.title?.message}</p>
                                </div>
                            </div>

                            {/* ================= DESCRIPTION ================= */}
                            <div className='flex flex-col'>
                                <label className={labelDark}>Description</label>
                                <textarea
                                    {...register('description')}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className={`${inputDark} min-h-[100px]`}
                                    placeholder="Course description"
                                />
                                <p className={errorText}>{errors.description?.message}</p>
                            </div>

                            {/* ================= SKILL ================= */}
                            <div className='flex flex-col'>
                                <label className={labelDark}>Skill</label>
                                <input
                                    {...register('skill')}
                                    value={skill}
                                    onChange={(e) => setSkill(e.target.value)}
                                    className={inputDark}
                                    placeholder="Enter skills (comma separated)"
                                />
                                <p className={errorText}>{errors.skill?.message}</p>
                            </div>

                            {/* ================= TERM ================= */}
                            <div>
                                <label className={labelDark}>Term</label>
                                <div className='flex gap-8 mt-2'>
                                    <label className="flex items-center gap-2 text-gray-300">
                                        <input
                                            type="radio"
                                            {...register('term')}
                                            value="1"
                                            onChange={(e) => setTerm(e.target.value)}
                                            className="accent-[#3DC0DF]"
                                        />
                                        Short Term
                                    </label>

                                    <label className="flex items-center gap-2 text-gray-300">
                                        <input
                                            type="radio"
                                            {...register('term')}
                                            value="2"
                                            onChange={(e) => setTerm(e.target.value)}
                                            className="accent-[#3DC0DF]"
                                        />
                                        Long Term
                                    </label>
                                </div>
                                <p className={errorText}>{errors.term?.message}</p>
                            </div>

                            {/* ================= QUALIFICATION + ID ================= */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='flex flex-col'>
                                    <label className={labelDark}>Qualification</label>
                                    <input
                                        {...register('qualification')}
                                        value={qualification}
                                        onChange={(e) => setQualification(e.target.value)}
                                        className={inputDark}
                                        placeholder="Qualification"
                                    />
                                    <p className={errorText}>{errors.qualification?.message}</p>
                                </div>

                                <div className='flex flex-col'>
                                    <label className={labelDark}>ID Proof</label>
                                    <input
                                        {...register('id_proof')}
                                        value={id_proof}
                                        onChange={(e) => setId_proof(e.target.value)}
                                        className={inputDark}
                                        placeholder="Aadhar / PAN"
                                    />
                                    <p className={errorText}>{errors.id_proof?.message}</p>
                                </div>
                            </div>

                            {/* ================= AGE + FEES ================= */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='flex flex-col'>
                                    <label className={labelDark}>Age</label>
                                    <input
                                        {...register('age')}
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className={inputDark}
                                        placeholder="Age"
                                    />
                                    <p className={errorText}>{errors.age?.message}</p>
                                </div>

                                <div className='flex flex-col'>
                                    <label className={labelDark}>Fees</label>
                                    <input
                                        {...register('fees')}
                                        value={fees}
                                        onChange={(e) => setFees(e.target.value)}
                                        className={inputDark}
                                        placeholder="Fees"
                                    />
                                    <p className={errorText}>{errors.fees?.message}</p>
                                </div>
                            </div>

                            {/* ================= COMMUNICATION + HARDWARE ================= */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='flex flex-col'>
                                    <label className={labelDark}>Communication</label>
                                    <input
                                        {...register('communication')}
                                        value={communication}
                                        onChange={(e) => setCommunication(e.target.value)}
                                        className={inputDark}
                                        placeholder="Communication skill"
                                    />
                                    <p className={errorText}>{errors.communication?.message}</p>
                                </div>

                                <div className='flex flex-col'>
                                    <label className={labelDark}>Hardware</label>
                                    <input
                                        {...register('hardware')}
                                        value={hardware}
                                        onChange={(e) => setHardware(e.target.value)}
                                        className={inputDark}
                                        placeholder="Available device"
                                    />
                                    <p className={errorText}>{errors.hardware?.message}</p>
                                </div>
                            </div>

                            {/* ================= CANDIDATE ================= */}
                            <div className='flex flex-col'>
                                <label className={labelDark}>Candidate</label>
                                <input
                                    {...register('candidate')}
                                    value={candidate}
                                    onChange={(e) => setCandidate(e.target.value)}
                                    className={inputDark}
                                    placeholder="Candidate type"
                                />
                                <p className={errorText}>{errors.candidate?.message}</p>
                            </div>

                            {/* ================= SUBMIT ================= */}
                            <div className='text-center pt-6'>
                                <button
                                    type='submit'
                                    className='bg-[#3DC0DF] hover:bg-[#22D3EE] text-black font-bold px-10 py-3 rounded-xl transition shadow-lg'
                                >
                                    Save Course
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Nav>
    )
}

const mapStateToProps = (state) => ({
    res: state.insertCourse,
    resunicode: state.teacherList,
})

export default connect(mapStateToProps)(Course)