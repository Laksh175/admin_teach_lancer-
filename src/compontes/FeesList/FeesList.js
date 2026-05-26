import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { viewTrancationData } from '../../store/action/getData'

const FeesList = ({ dispatch, res }) => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState([])

    useEffect(() => {
        dispatch(viewTrancationData(2))
    }, [dispatch])

    useEffect(() => {
        const apiData = res?.data?.data?.data
        if (apiData) {
            setData(apiData)
            setFilter(apiData)
        }
    }, [res])

    useEffect(() => {
        if (!search) {
            setFilter(data)
        } else {
            const result = data.filter(item =>
                item?.user_name?.toLowerCase().includes(search.toLowerCase())
            )
            setFilter(result)
        }
    }, [search, data])

    return (
        <>
            <div className="min-h-screen bg-[#0f172a] text-white py-10 px-4">

                {/* Page Container */}
                <div className="max-w-7xl mx-auto mt-16">

                    {/* Card */}
                    <div className="bg-[#020617] rounded-2xl shadow-2xl border border-slate-800 p-6">

                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                            <h1 className="text-2xl font-semibold tracking-wide text-cyan-400">
                                Fees / Transactions List
                            </h1>

                            {/* Search */}
                            <div className="relative w-full md:w-[350px]">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by user name..."
                                    className="w-full bg-[#0f172a] text-white border border-slate-700 rounded-xl pl-11 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    🔍
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">

                                {/* Table Head */}
                                <thead className="bg-[#020617] sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-cyan-400 font-semibold border-b border-slate-700">
                                            User Name
                                        </th>
                                        <th className="px-6 py-4 text-left text-cyan-400 font-semibold border-b border-slate-700">
                                            Course Name
                                        </th>
                                        <th className="px-6 py-4 text-left text-cyan-400 font-semibold border-b border-slate-700">
                                            Phone No
                                        </th>
                                        <th className="px-6 py-4 text-left text-cyan-400 font-semibold border-b border-slate-700">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody>
                                    {filter && filter.length > 0 ? (
                                        filter.map((val, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-[#0f172a] transition border-b border-slate-800"
                                            >
                                                <td className="px-6 py-4 text-slate-200">
                                                    {val.user_name || "-"}
                                                </td>
                                                <td className="px-6 py-4 text-slate-200">
                                                    {val.course_id || "-"}
                                                </td>
                                                <td className="px-6 py-4 text-slate-300">
                                                    {val.mobile_no || "-"}
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-green-400">
                                                    ₹ {val.amount || "0"}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-10 text-slate-400">
                                                No data found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    res: state.viewTrancationData
})

export default connect(mapStateToProps)(FeesList)