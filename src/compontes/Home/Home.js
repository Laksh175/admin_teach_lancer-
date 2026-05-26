import React, { useEffect, useState } from "react";
import { FaHospitalUser } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { FaIndustry } from "react-icons/fa";
import Chart from "./Chart";
import { connect } from "react-redux";
import { FaDiscourse } from "react-icons/fa";
import { CgAssign } from "react-icons/cg";
import Nav from "../nav/Nav";
import {
  numberOfCourse,
  numberOfUsers,
  numberOfCompany,
  numofUserAppied,
} from "../../store/action/getData";
import Pie from "./Pie";
import CoursePie from "./CoursePie";

const Home = ({ dispatch, res, rescourse, rescompany, resappied }) => {
  const [totaluser, setTotalUser] = useState([]);
  const [totalcourse, setTotalCourse] = useState([]);
  const [totalcompany, setTotalcompany] = useState([]);
  const [totalappied, setTotalappied] = useState([]);

  //total Users
  useEffect(() => {
    dispatch(numberOfUsers());
  }, []);

  useEffect(() => {
    const dataa = res.data && res.data.data;
    if (dataa) {
      if (dataa.code === 200) {
        setTotalUser(dataa);
      }
    }
  }, [res]);

  //total Courses
  useEffect(() => {
    dispatch(numberOfCourse());
  }, []);

  useEffect(() => {
    const coursenum = rescourse.data && rescourse.data.data;
    if (coursenum) {
      if (coursenum.code === 200) {
        setTotalCourse(coursenum);
      }
    }
  }, [rescourse]);

  //total Conmpany
  useEffect(() => {
    dispatch(numberOfCompany());
  }, []);

  useEffect(() => {
    const companyData = rescompany.data && rescompany.data.data;
    if (companyData) {
      if (companyData.code === 200) {
        setTotalcompany(companyData);
      }
    }
  }, [rescompany]);

  //total Appied usser
  useEffect(() => {
    dispatch(numofUserAppied());
  }, []);

  useEffect(() => {
    const appiedData = resappied.data && resappied.data.data;
    if (appiedData) {
      if (appiedData.code === 200) {
        setTotalappied(appiedData);
      }
    }
  }, [resappied]);

  return (
    <Nav title="Dashboard">
        <div className="max-w-7xl mx-auto px-6 mt-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex justify-between items-center shadow-xl hover:scale-[1.02] transition">
              <div>
                <p className="text-gray-300 text-sm uppercase tracking-wide">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-white mt-2">
                  {totaluser.data}
                </p>
              </div>
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl text-white text-3xl shadow-lg">
                <FaHospitalUser />
              </div>
            </div>

            {/* Total Courses */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex justify-between items-center shadow-xl hover:scale-[1.02] transition">
              <div>
                <p className="text-gray-300 text-sm uppercase tracking-wide">
                  Total Courses
                </p>
                <p className="text-3xl font-bold text-white mt-2">
                  {totalcourse.data}
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl text-white text-3xl shadow-lg">
                <FaDiscourse />
              </div>
            </div>

            {/* Total Companies */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex justify-between items-center shadow-xl hover:scale-[1.02] transition">
              <div>
                <p className="text-gray-300 text-sm uppercase tracking-wide">
                  Total Companies
                </p>
                <p className="text-3xl font-bold text-white mt-2">
                  {totalcompany.data}
                </p>
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-xl text-white text-3xl shadow-lg">
                <FaIndustry />
              </div>
            </div>

            {/* Total Applied Users */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex justify-between items-center shadow-xl hover:scale-[1.02] transition">
              <div>
                <p className="text-gray-300 text-sm uppercase tracking-wide">
                  Applied Users
                </p>
                <p className="text-3xl font-bold text-white mt-2">
                  {totalappied.data}
                </p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl text-white text-3xl shadow-lg">
                <CgAssign />
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* Pie Chart */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-white text-lg font-semibold mb-4">
                User Distribution
              </h3>
              <div className="flex justify-center">
                <Pie />
              </div>
            </div>

            {/* Course Pie */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-white text-lg font-semibold mb-4">
                Course Distribution
              </h3>
              <div className="flex justify-center">
                <CoursePie />
              </div>
            </div>
          </div>
        </div>
    </Nav>
  );
};

const mapStateToProps = (state) => ({
  res: state.numberOfUsers,
  rescourse: state.numberOfCourse,
  rescompany: state.numberOfCompany,
  resappied: state.numofUserAppied,
});

export default connect(mapStateToProps)(Home);
