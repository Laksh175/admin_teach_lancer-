import React, { useEffect, useState } from 'react'
import Nav from '../nav/Nav'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import { FiEye } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import { UserListByCourse } from '../../store/action/getData'
import { connect } from 'react-redux'



const EnrollUser = ({ dispatch, res }) => {

    const [userdata, setUserData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState([]);

    const { id } = useParams();
    const _id = id;

    useEffect(() => {
        dispatch(UserListByCourse(_id))
    }, [])

    useEffect(() => {
        const data = res.data && res.data.data && res.data.data.data

        if (data) {
            setUserData(data);
            setFilter(data);
        }
        console.log("data:::", data);
    }, [res])

    useEffect(() => {
        const result = userdata && userdata.filter(item => {
            return item.email.toLowerCase().match(search.toLowerCase());
        })
        setFilter(result);
    }, [search])

    return (
        <Nav title="Course User">
            <div className="px-4 py-6 mx-auto max-w-7xl">
                <div className="bg-slate-950/95 border border-slate-800 shadow-2xl shadow-slate-950/40 rounded-3xl overflow-hidden">
                    <div className="flex flex-col gap-4 p-6 border-b border-slate-700 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-white">Enrolled Users</h2>
                            <p className="mt-1 text-sm text-slate-400">View and manage users enrolled in this course.</p>
                        </div>
                        <div className="w-full max-w-sm">
                            <label htmlFor="search" className="sr-only">Search users</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    className="block w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                    type="text"
                                    id="search"
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value) }}
                                    placeholder="Search by email..."
                                />
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-700">
                            <thead className="bg-sky-500/95">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Course Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Mobile No
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        LinkedIn Profile
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        City
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Status
                                    </th>
                                    {/* <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Action
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody className="bg-slate-950 divide-y divide-slate-800">
                                {filter.length > 0 ? filter.map((val, index) => (
                                    <tr key={index} className="hover:bg-slate-900/80">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                                            {val.course_title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                                            {val.user.first_name} {val.user.last_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                                            {val.user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                                            {val.user.phone_code} {val.user.mobile}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                                            {val.user.linkedin_profile || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                                            {val.user.city || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {val.status == 1 ? (
                                                <span className="inline-flex px-2 py-1 text-[10px] font-semibold rounded-full bg-emerald-500/15 text-emerald-300">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex px-2 py-1 text-[10px] font-semibold rounded-full bg-rose-500/15 text-rose-300">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex justify-center space-x-2">
                                                <button className="p-2 bg-slate-800 rounded-xl text-sky-300 hover:bg-slate-700">
                                                    <FaEdit className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 bg-slate-800 rounded-xl text-rose-300 hover:bg-slate-700">
                                                    <MdDeleteOutline className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 bg-slate-800 rounded-xl text-slate-200 hover:bg-slate-700">
                                                    <FiEye className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td> */}
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-16 text-center">
                                            <div className="mx-auto max-w-md text-slate-400">
                                                <svg className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.98-5.5-2.5" />
                                                </svg>
                                                <h3 className="mt-4 text-lg font-medium text-slate-200">No users found</h3>
                                                <p className="mt-2 text-sm text-slate-400">Get started by enrolling users in this course.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Nav>
    )
}

const mapStateToProps = (state) => ({
    res: state.UserListByCourse
})

export default connect(mapStateToProps)(EnrollUser) 