import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { viewTrancationData } from '../../store/action/getData'
import Nav from '../nav/Nav'
import { FiSearch } from 'react-icons/fi'

const PaidSalary = ({ dispatch, res }) => {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch(viewTrancationData(1))
    }, [dispatch])

    useEffect(() => {
        const salaryData = res?.data?.data?.data
        if (salaryData) {
            setData(salaryData)
            setFilter(salaryData)
        }
    }, [res])

    useEffect(() => {
        const result = data.filter(item =>
            item.user_name?.toLowerCase().includes(search.toLowerCase())
        )
        setFilter(result)
    }, [search, data])

    return (
        <Nav title="Transactions">

                <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Card */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl shadow-2xl">

                    {/* Header */}
                    <div className="px-6 py-5 border-b border-[#1F2937] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold text-[#3DC0DF]">Transaction Records</h2>
                            <p className="text-sm text-gray-400">View all paid salary transactions</p>
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <FiSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by username..."
                                className="w-full bg-[#0B0F1A] border border-[#1F2937] rounded-md pl-10 pr-4 py-2 text-gray-200 
                                focus:outline-none focus:ring-2 focus:ring-[#3DC0DF]"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-[#0B1220] border-b border-[#1F2937]">
                                <tr className="text-gray-300 uppercase text-xs tracking-wider">
                                    <th className="px-6 py-4 text-left">User Name</th>
                                    <th className="px-6 py-4 text-left">Description</th>
                                    <th className="px-6 py-4 text-left">Phone No</th>
                                    <th className="px-6 py-4 text-right">Amount</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-[#1F2937]">
                                {filter.length > 0 ? filter.map((val, i) => (
                                    <tr key={i} className="hover:bg-[#0B1220] transition">
                                        <td className="px-6 py-4 text-gray-400 font-medium">{val.user_name}</td>
                                        <td className="px-6 py-4 text-gray-400">{val.description}</td>
                                        <td className="px-6 py-4 text-gray-400">{val.mobile_no}</td>
                                        <td className="px-6 py-4 text-right font-semibold text-[#3DC0DF]">
                                            ₹ {val.amount}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-10 text-center text-gray-400">
                                            No transaction data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-[#1F2937] text-sm text-gray-400">
                        Total Records: <span className="text-gray-200">{filter.length}</span>
                    </div>

                </div>
            </div>
        </Nav>
    )
}

const mapStateToProps = (state) => ({
    res: state.viewTrancationData
})

export default connect(mapStateToProps)(PaidSalary)