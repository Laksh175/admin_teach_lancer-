import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Nav from '../nav/Nav'
import { UserAppliedForIntershipList } from '../../store/action/getData'
import { useParams } from 'react-router-dom'

const InternshipUser = ({ dispatch, res }) => {

  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState([])

  const { id } = useParams()

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    dispatch(UserAppliedForIntershipList(id))
  }, [dispatch, id])

  useEffect(() => {
    const list = res?.data?.data?.data
    if (list) {
      setData(list)
      setFilter(list)
    }
  }, [res])

  /* ================= SEARCH ================= */
  useEffect(() => {
    const result = data.filter(item =>
      item.company_name?.toLowerCase().includes(search.toLowerCase())
    )
    setFilter(result)
  }, [search, data])

  return (
    <Nav title="User Internship List">

        <div className="max-w-7xl mx-auto px-6 mt-10">

          {/* ===== HEADER ===== */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company name..."
              className="w-[320px] bg-[#0B1220] border border-[#1F2937] 
              text-white rounded-xl px-4 py-2 
              focus:outline-none focus:border-[#3DC0DF]"
            />
          </div>

          {/* ===== TABLE CARD ===== */}
          <div className="bg-[#111827] rounded-2xl border border-[#1F2937] overflow-hidden shadow-xl">

            <table className="w-full text-sm text-gray-300">
              <thead className="bg-[#0B1220] text-[#3DC0DF]">
                <tr>
                  <th className="p-4 text-left">Company</th>
                  <th className="p-4 text-left">Address</th>
                  <th className="p-4 text-center">Type</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {filter.length ? filter.map((val, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#1F2937] hover:bg-[#0B1220] transition"
                  >
                    <td className="p-4 font-medium">
                      {val.company_name}
                    </td>

                    <td className="p-4 text-gray-400">
                      {val.company_city}
                    </td>

                    <td className="p-4 text-center">
                      {val.types === 1 ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                          Full Time
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">
                          Part Time
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-center">
                      {val.status === 1 ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-600 text-white">
                          Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="text-center p-10 text-gray-500">
                      No internship applications found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>

          </div>
        </div>
    </Nav>
  )
}

const mapStateToProps = (state) => ({
  res: state.UserAppliedForIntershipList
})

export default connect(mapStateToProps)(InternshipUser)