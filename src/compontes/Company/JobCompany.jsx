import React, { useState, useEffect } from "react";
import Nav from "../nav/Nav";
import { useParams } from "react-router-dom";
import { viweAllJobByCompany } from "../../store/action/getData";
import { connect } from "react-redux";

const JobCompany = ({ dispatch, res }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");

  const { id } = useParams();

  useEffect(() => {
    dispatch(viweAllJobByCompany(id));
  }, [dispatch, id]);

  useEffect(() => {
    const dataa = res?.data?.data?.data;
    if (dataa) {
      setData(dataa);
      setFilter(dataa);
    }
  }, [res]);

  useEffect(() => {
    if (!search) {
      setFilter(data);
    } else {
      const result = data.filter((item) =>
        item.position?.toLowerCase().includes(search.toLowerCase()),
      );
      setFilter(result);
    }
  }, [search, data]);

  return (
    <Nav title="Company Jobs">
      <div className="bg-[#0F172A] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 mt-24">
          {/* Page Content */}
          <div className="bg-[#020617] border border-[#1E293B] rounded-xl shadow-lg">
            {/* Top Bar */}
            <div className="p-5 border-b border-[#1E293B] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Job Listings</h2>

              {/* Search */}
              <div className="relative w-[320px]">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by position..."
                  className="w-full bg-[#0F172A] border border-[#1E293B] text-sm text-gray-200 rounded-lg pl-10 pr-3 py-2 
                focus:outline-none focus:ring-1 focus:ring-cyan-500"
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
            <div className="overflow-x-auto max-h-[60vh]">
              <table className="w-full text-sm">
                <thead className="bg-[#0F172A] sticky top-0 z-10">
                  <tr className="text-left text-gray-300 uppercase text-xs tracking-wider">
                    <th className="px-6 py-4">Position</th>
                    <th className="px-6 py-4">Salary</th>
                    <th className="px-6 py-4">Technology</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Vacancy</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#1E293B]">
                  {filter?.length > 0 ? (
                    filter.map((val, i) => (
                      <tr key={i} className="hover:bg-[#0F172A] transition">
                        <td className="px-6 py-4 font-medium text-white">
                          {val.position}
                        </td>

                        <td className="px-6 py-4 text-gray-300">
                          ₹ {val.salary}
                        </td>

                        <td className="px-6 py-4 text-gray-300">
                          {val.technology}
                        </td>

                        <td className="px-6 py-4">
                          {val.type == 1 ? (
                            <span
                              className="px-3 py-1 rounded-full text-xs font-semibold 
                          bg-green-500/10 text-green-400 border border-green-500/30"
                            >
                              Full Time
                            </span>
                          ) : (
                            <span
                              className="px-3 py-1 rounded-full text-xs font-semibold 
                          bg-purple-500/10 text-purple-400 border border-purple-500/30"
                            >
                              Part Time
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold 
                        bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                          >
                            {val.vacancy}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-10 text-gray-400"
                      >
                        No job data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Nav>
  );
};

const mapStateToProps = (state) => ({
  res: state.viweAllJobByCompany,
});

export default connect(mapStateToProps)(JobCompany);
