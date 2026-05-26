import React, { useEffect, useState } from "react";
import Nav from "../nav/Nav";
import { ViewAllComapny } from "../../store/action/getData";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteCompany } from "../../store/action/deleteData";

const Companyview = ({ dispatch, res, resdelete }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    dispatch(ViewAllComapny());
  }, []);

  useEffect(() => {
    const data = res?.data?.data?.data;
    if (data) {
      setData(data);
      setFilter(data);
    }
  }, [res]);

  // Search
  useEffect(() => {
    const result = data?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilter(result);
  }, [search]);

  // Delete company
  const deleteCompanyData = (id) => {
    dispatch(deleteCompany(id));
  };

  useEffect(() => {
    const deleteData = resdelete?.data?.data;
    if (deleteData && deleteData.code === 200) {
      toast.success(deleteData.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(ViewAllComapny());
    }
  }, [resdelete]);

  return (
    <>
      <Nav title="Company List">
        <ToastContainer />
          <div className="max-w-7xl mx-auto px-6 mt-10">
            {/* Page Content */}
            {/* Card */}
            <div className="bg-[#0F172A] rounded-xl shadow-xl border border-[#1E293B]">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-[#1E293B]">
                <h2 className="text-lg font-semibold tracking-wide text-cyan-400">
                  Registered Companies
                </h2>

                {/* Search */}
                <div className="relative w-full md:w-96">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search company..."
                    className="w-full bg-[#020617] text-white pl-10 pr-4 py-2 rounded-lg border border-[#1E293B] outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#020617] text-gray-300">
                    <tr className="uppercase text-xs tracking-wider">
                      <th className="px-4 py-3 text-left">Company</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Phone</th>
                      <th className="px-4 py-3 text-left">City</th>
                      <th className="px-4 py-3 text-left">Wallet</th>
                      <th className="px-4 py-3 text-left">Industry</th>
                      <th className="px-4 py-3 text-left">Type</th>
                      <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#1E293B]">
                    {filter?.length > 0 ? (
                      filter.map((val) => (
                        <tr
                          key={val._id}
                          className="hover:bg-[#020617] transition"
                        >
                          <td className="px-4 py-3 text-gray-300">{val.name}</td>
                          <td className="px-4 py-3 text-gray-300">
                            {val.email}
                          </td>
                          <td className="px-4 py-3 text-gray-300">
                            {val.mobile}
                          </td>
                          <td className="px-4 py-3 text-gray-300">
                            {val.city}
                          </td>
                          <td className="px-4 py-3 font-semibold text-cyan-400">
                            {val.wallet}
                          </td>
                          <td className="px-4 py-3 uppercase text-gray-300">
                            {val.industry_type}
                          </td>
                          <td className="px-4 py-3 capitalize text-gray-300">{val.type}</td>

                          <td className="px-4 py-3">
                            <div className="flex justify-center gap-2">
                              <Link to={`/job-company/${val._id}`}>
                                <button className="px-3 py-1 rounded-md text-xs font-semibold bg-cyan-500 hover:bg-cyan-600 transition">
                                  Jobs
                                </button>
                              </Link>

                              <Link to={`/internship-company/${val._id}`}>
                                <button className="px-3 py-1 rounded-md text-xs font-semibold bg-indigo-500 hover:bg-indigo-600 transition">
                                  Internship
                                </button>
                              </Link>

                              <button
                                onClick={() => deleteCompanyData(val._id)}
                                className="p-2 rounded-md bg-red-500 hover:bg-red-600 transition"
                              >
                                <MdDeleteOutline className="text-lg text-white" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          className="text-center py-10 text-gray-400 text-lg"
                        >
                          No companies found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </Nav>
    </>
  );
};

const mapStateToProps = (state) => ({
  res: state.ViewAllComapny,
  resdelete: state.deleteCompany,
});

export default connect(mapStateToProps)(Companyview);
