import React, { useState, useEffect } from 'react'
import Nav from '../nav/Nav'
import { Link } from 'react-router-dom'
import { userList } from '../../store/action/getData'
import { connect } from 'react-redux'
import { deleteUser } from '../../store/action/deleteData'
import { MdDeleteOutline } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = ({ dispatch, res, resdelete }) => {

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");

  /* Fetch users */
  useEffect(() => {
    dispatch(userList());
  }, [dispatch]);

  useEffect(() => {
    const list = res?.data?.data?.data;
    if (list) {
      setData(list);
      setFilter(list);
    }
  }, [res]);

  /* Search */
  useEffect(() => {
    const result = data.filter(item =>
      item.email?.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(result)
  }, [search, data])

  /* Delete */
  const deleteUserData = (id) => {
    dispatch(deleteUser(id))
  }

  useEffect(() => {
    const deleteData = resdelete?.data?.data;
    if (deleteData?.code === 200) {
      toast.success(deleteData.message, { position: toast.POSITION.TOP_CENTER })
      dispatch(userList());
    } else if (deleteData?.code) {
      toast.error(deleteData.message || "Failed to delete user", { position: toast.POSITION.TOP_CENTER })
    }
  }, [resdelete, dispatch])

  return (
  <Nav title="User Management">
      <ToastContainer />

      <div className="max-w-7xl mx-auto px-6 mt-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email..."
            className="w-full md:w-[320px] bg-[#0B1220] border border-[#1F2937] 
            text-white rounded-xl px-4 py-2 focus:outline-none focus:border-[#3DC0DF]"
          />

          <Link to="/view-transaction">
            <button className="bg-[#3DC0DF] hover:bg-[#22D3EE] 
            text-black font-bold px-5 py-2 rounded-xl transition">
              View Transactions
            </button>
          </Link>
        </div>

        {/* Table */}
        <div className="bg-[#111827] rounded-2xl border border-[#1F2937] overflow-hidden">
          <table className="w-full text-sm text-gray-300">
            <thead className="bg-[#0B1220] text-[#3DC0DF]">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">City</th>
                <th className="p-4 text-left">Wallet</th>
                <th className="p-4 text-left">Mother Tongue</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filter.length ? filter.map((val) => (
                <tr key={val._id} className="border-b border-[#1F2937] hover:bg-[#0B1220] transition">
                  <td className="p-4 capitalize">{val.first_name} {val.last_name}</td>
                  <td className="p-4">{val.email}</td>
                  <td className="p-4">{val.phone_code} {val.mobile}</td>
                  <td className="p-4 capitalize">{val.city}</td>
                  <td className="p-4">{val.wallet}</td>
                  <td className="p-4 capitalize">{val.mother_tongue || "N/A"}</td>

                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Link to={`/job/${val._id}`}>
                        <button className="bg-[#3DC0DF] text-black px-3 py-1 rounded-lg text-xs font-bold">
                          Job
                        </button>
                      </Link>

                      <Link to={`/internship/${val._id}`}>
                        <button className="bg-[#22D3EE] text-black px-3 py-1 rounded-lg text-xs font-bold">
                          Internship
                        </button>
                      </Link>

                      <MdDeleteOutline
                        className="text-xl text-red-500 cursor-pointer"
                        onClick={() => deleteUserData(val._id)}
                      />
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center p-10 text-gray-500">
                    No users found
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
  res: state.userList,
  resdelete: state.deleteUser
})

export default connect(mapStateToProps)(User)