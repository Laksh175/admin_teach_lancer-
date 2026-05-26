import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { teacherRegistration } from '../../store/action/addData'
import { code } from '../../phoneCode'
import Nav from '../nav/Nav'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { teacherAddvalidationSchema } from '../../validation'

const Teacher = ({ dispatch, res }) => {

    const [formStateData, setFormStateData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_code: '',
        mobile: '',
        profile: null,
        password: '',
        confirmPassword: '',
        position: '',
        experience: '',
        status: ''
    })

    const handleChange = (e) => {
        setFormStateData({ ...formStateData, [e.target.name]: e.target.value })
    }

    const imgHandler = (e) => {
        setFormStateData({ ...formStateData, profile: e.target.files[0] })
    }

    const formOptions = { resolver: yupResolver(teacherAddvalidationSchema) }
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState

    const onSubmit = () => {
        const formdata = new FormData()
        Object.keys(formStateData).forEach(key => {
            formdata.append(key, formStateData[key])
        })
        dispatch(teacherRegistration(formdata))
    }

    useEffect(() => {
        const data = res?.data?.data
        if (data) {
            if (data.code === 201) {
                toast.success(data.message, { position: 'top-center', theme: 'dark' })
                setTimeout(() => window.location = '/teacher', 2000)
            }
            if (data.code === 409) {
                toast.warning(data.message, { position: 'top-center', theme: 'dark' })
            }
        }
    }, [res])

    return (
        <div className='min-h-screen bg-[#0B0F1A] text-gray-200'>
            <Nav title="Add Teacher">
                <div className='max-w-5xl mx-auto px-4 py-8'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='bg-[#111827] rounded-2xl shadow-xl p-8 border border-[#1F2937]'>

                        <h2 className='text-3xl font-bold text-center text-[#3DC0DF] mb-8'>
                            Teacher Registration
                        </h2>

                        {/* Personal Info */}
                        <div className='grid md:grid-cols-2 gap-6'>
                            <DarkInput label="First Name" name="first_name" register={register} errors={errors} onChange={handleChange} />
                            <DarkInput label="Last Name" name="last_name" register={register} errors={errors} onChange={handleChange} />
                        </div>

                        <div className='mt-5'>
                            <DarkInput label="Email" name="email" register={register} errors={errors} onChange={handleChange} />
                        </div>

                        {/* Password */}
                        <div className='grid md:grid-cols-2 gap-6 mt-5'>
                            <DarkInput label="Password" name="password" type="password" register={register} errors={errors} onChange={handleChange} />
                            <DarkInput label="Confirm Password" name="confirmPassword" type="password" register={register} errors={errors} onChange={handleChange} />
                        </div>

                        {/* Mobile */}
                        <div className='mt-5'>
                            <label className='block font-semibold text-gray-300 mb-1'>Mobile Number</label>
                            <div className='flex gap-3'>
                                <select
                                    name="phone_code"
                                    onChange={handleChange}
                                    className='w-[25%] rounded-xl border border-[#1F2937] px-3 py-2 bg-[#0B1220] text-gray-200 focus:ring-2 focus:ring-[#3DC0DF] outline-none'
                                >
                                    <option>Code</option>
                                    {code.map(val => (
                                        <option key={val.code} value={val.code}>{val.iso}+{val.code}</option>
                                    ))}
                                </select>

                                <input
                                    type="text"
                                    {...register('mobile')}
                                    name="mobile"
                                    onChange={handleChange}
                                    placeholder="Enter mobile number"
                                    className='w-full rounded-xl border border-[#1F2937] px-4 py-2 bg-[#0B1220] text-gray-200 focus:ring-2 focus:ring-[#3DC0DF] outline-none'
                                />
                            </div>
                            <p className='text-red-400 text-sm mt-1'>{errors.mobile?.message}</p>
                        </div>

                        {/* Profile */}
                        <div className='mt-5'>
                            <label className='block font-semibold text-gray-300 mb-1'>Profile Image</label>
                            <input
                                type="file"
                                name="profile"
                                onChange={imgHandler}
                                className='w-full rounded-xl border border-[#1F2937] px-3 py-2 bg-[#0B1220] text-gray-200'
                            />
                        </div>

                        {/* Job Info */}
                        <div className='grid md:grid-cols-2 gap-6 mt-5'>
                            <DarkInput label="Position" name="position" register={register} errors={errors} onChange={handleChange} />
                            <DarkInput label="Experience" name="experience" register={register} errors={errors} onChange={handleChange} />
                        </div>

                        {/* Status */}
                        <div className='mt-6'>
                            <label className='block font-semibold text-gray-300 mb-2'>Status</label>
                            <div className='flex gap-8'>
                                <label className='flex items-center gap-2 cursor-pointer'>
                                    <input type="radio" value="1" {...register('status')} name="status" onChange={handleChange} />
                                    <span>Active</span>
                                </label>
                                <label className='flex items-center gap-2 cursor-pointer'>
                                    <input type="radio" value="2" {...register('status')} name="status" onChange={handleChange} />
                                    <span>Inactive</span>
                                </label>
                            </div>
                            <p className='text-red-400 text-sm mt-1'>{errors.status?.message}</p>
                        </div>

                        {/* Submit */}
                        <div className='text-center mt-10'>
                            <button
                                type="submit"
                                className='bg-[#3DC0DF] text-[#0B0F1A] px-10 py-3 rounded-full font-semibold hover:bg-[#22A7C7] transition-all duration-300 shadow-lg'
                            >
                                Create Teacher
                            </button>
                        </div>

                        <ToastContainer theme="dark" />
                    </div>
                </form>
            </div>
        </Nav>
        </div>
    )
}

/* 🔹 Dark Input Component */
const DarkInput = ({ label, name, type = "text", register, errors, onChange }) => (
    <div>
        <label className='block font-semibold text-gray-300 mb-1'>{label}</label>
        <input
            type={type}
            name={name}
            {...register(name)}
            onChange={onChange}
            placeholder={`Enter ${label}`}
            className='w-full rounded-xl border border-[#1F2937] px-4 py-2 bg-[#0B1220] text-gray-200 focus:ring-2 focus:ring-[#3DC0DF] outline-none'
        />
        <p className='text-red-400 text-sm mt-1'>{errors[name]?.message}</p>
    </div>
)

const mapStateToProps = (state) => ({
    res: state.teacherRegistration
})

export default connect(mapStateToProps)(Teacher)