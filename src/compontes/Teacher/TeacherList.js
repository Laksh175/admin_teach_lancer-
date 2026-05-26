import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { teacherDetail, teacherList } from "../../store/action/getData";
import { updateTeacher, teacherSalary } from "../../store/action/addData";
import { FiEye } from "react-icons/fi";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { deleteTeacher } from "../../store/action/deleteData";
import Nav from "../nav/Nav";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import CloseIcon from "@mui/icons-material/Close";
import PaymentsIcon from "@mui/icons-material/Payments";
/* ---------- Modal Styles ---------- */

const glassModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  background: "rgba(15, 23, 42, 0.95)",
  borderRadius: 16,
  boxShadow: "0 0 40px rgba(0,0,0,0.5)",
  padding: 24,
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.1)",
};

const largeGlassModal = {
  ...glassModal,
  width: 900,
};

const paymentGlassModal = {
  ...glassModal,
  width: 550,
};

const TeacherList = ({
  dispatch,
  res,
  resdetail,
  resdetail2,
  resupdate,
  resdelete,
  respayment,
}) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [teacherdata, setTeacherdata] = useState({});

  /* ---------- Salary State ---------- */
  const [salary, setSalary] = useState({
    username: "",
    email: "",
    description: "",
    amount: "",
    cardNumber: "",
    cvc: "",
    exMonth: "",
    exYear: "",
  });

  /* ---------- Update State ---------- */
  const [updateData, setUpdateData] = useState({
    first_name: "",
    last_name: "",
    phone_code: "",
    mobile: "",
    position: "",
    experience: "",
    status: "",
  });

  /* ---------- Fetch Teachers ---------- */
  useEffect(() => {
    dispatch(teacherList());
  }, [dispatch]);

  useEffect(() => {
    const dataa = res?.data?.data?.data;
    if (dataa) {
      setData(dataa);
      setFilter(dataa);
    }
  }, [res]);

  /* ---------- Search ---------- */
  useEffect(() => {
    const result = data.filter((item) =>
      item.email.toLowerCase().includes(search.toLowerCase()),
    );
    setFilter(result);
  }, [search, data]);

  /* ---------- View Modal ---------- */
  const [open, setOpen] = useState(false);
  const details = (id) => {
    setOpen(true);
    dispatch(teacherDetail(id));
  };

  useEffect(() => {
    const d = resdetail?.data?.data?.data;
    if (d) setTeacherdata(d);
  }, [resdetail]);

  /* ---------- Update Modal ---------- */
  const [updateopen, setupdateOpen] = useState(false);

  const updateteacher = (id) => {
    dispatch(teacherDetail(id));
    setupdateOpen(true);
    localStorage.setItem("teacherId", id);
  };

  useEffect(() => {
    const d = resdetail2?.data?.data?.data;
    if (d) setUpdateData(d);
  }, [resdetail2]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const updateteacherdata = () => {
    const id = localStorage.getItem("teacherId");
    dispatch(updateTeacher(updateData, id));
  };

  useEffect(() => {
    const update = resupdate?.data?.data;
    if (update?.code === 200) {
      toast.success(update.message);
      window.location = "/teacher";
    }
  }, [resupdate]);

  /* ---------- Delete ---------- */
  const deleteTeacherData = (id) => {
    dispatch(deleteTeacher(id));
  };

  useEffect(() => {
    const del = resdelete?.data?.data;
    if (del?.code === 200) {
      toast.success(del.message);
      dispatch(teacherList());
    }
  }, [resdelete, dispatch]);

  /* ---------- Salary Modal ---------- */
  const [salaryopen, setsalaryOpen] = useState(false);

  const paySalary = () => {
    const id = localStorage.getItem("teacherId");
    dispatch(teacherSalary(id, salary));
  };

  useEffect(() => {
    const salarydata = respayment?.data?.data;
    if (salarydata?.code === 200) {
      toast.success(salarydata.message);
      setsalaryOpen(false);
      setSalary({
        username: "",
        email: "",
        description: "",
        amount: "",
        cardNumber: "",
        cvc: "",
        exMonth: "",
        exYear: "",
      });
    }
  }, [respayment]);

  return (
    <>
      <ToastContainer />

      <Nav title="teacher">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search teacher by email..."
              className="bg-white/10 text-white placeholder-gray-400 px-4 py-2 rounded-xl outline-none border border-white/20 w-[300px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex gap-3">
              <Link to="add-teacher">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition">
                  + Add Teacher
                </button>
              </Link>

              <Link to="/view-salary">
                <button className="bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition">
                  Transactions
                </button>
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-auto shadow-xl">
            <table className="w-full text-white">
              <thead className="bg-white/10">
                <tr>
                  {[
                    "Name",
                    "Email",
                    "Mobile",
                    "Experience",
                    "Position",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-sm font-semibold uppercase text-cyan-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filter.length ? (
                  filter.map((val) => (
                    <tr key={val._id} className="hover:bg-white/5 transition">
                      {/* <td className="px-4 py-3">{val.unique_code}</td> */}
                      <td className="px-4 py-3 capitalize">
                        {val.first_name} {val.last_name}
                      </td>
                      <td className="px-4 py-3">{val.email}</td>
                      <td className="px-4 py-3">
                        +{val.phone_code} {val.mobile}
                      </td>
                      <td className="px-4 py-3 capitalize">{val.experience}</td>
                      <td className="px-4 py-3 capitalize">{val.position}</td>
                      <td className="px-4 py-3">
                        {val.status === 1 ? (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                            Active
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <IconBtn
                            color="cyan"
                            onClick={() => updateteacher(val._id)}
                          >
                            <FaEdit />
                          </IconBtn>
                          <IconBtn
                            color="red"
                            onClick={() => deleteTeacherData(val._id)}
                          >
                            <MdDeleteOutline />
                          </IconBtn>
                          <IconBtn
                            color="emerald"
                            onClick={() => details(val._id)}
                          >
                            <FiEye />
                          </IconBtn>
                          <button
                            onClick={() => {
                              setsalaryOpen(true);
                              localStorage.setItem("teacherId", val._id);
                            }}
                            className="bg-gradient-to-r from-purple-500 to-indigo-600 px-3 py-1 rounded-lg text-xs text-white font-semibold shadow hover:scale-105 transition"
                          >
                            Salary
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-10 text-gray-400">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Nav>

      {/* View Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box
            sx={{
              width: 420,
              bgcolor: "#0f172a",
              borderRadius: 3,
              boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
              p: 4,
              mx: "auto",
              mt: "10%",
              border: "1px solid #22d3ee",
            }}
          >
            {/* Teacher Name */}
            <Typography
              variant="h5"
              align="center"
              sx={{
                color: "#22d3ee",
                fontWeight: "bold",
                mb: 3,
              }}
            >
              {teacherdata.first_name} {teacherdata.last_name}
            </Typography>

            {/* Profile */}
            <Box display="flex" justifyContent="center" mb={3}>
              <Avatar
                src={teacherdata.profile}
                alt="teacher profile"
                sx={{
                  width: 110,
                  height: 110,
                  border: "3px solid #22d3ee",
                  boxShadow: "0 4px 20px rgba(34,211,238,0.4)",
                }}
              />
            </Box>

            <Divider sx={{ borderColor: "#334155", mb: 3 }} />

            {/* Details */}
            <Grid container spacing={2}>
              <Grid item xs={12} display="flex" alignItems="center">
                <EmailIcon sx={{ color: "#22d3ee", mr: 1 }} />
                <Typography color="white">{teacherdata.email}</Typography>
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <PhoneIcon sx={{ color: "#22d3ee", mr: 1 }} />
                <Typography color="white">{teacherdata.mobile}</Typography>
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <WorkIcon sx={{ color: "#22d3ee", mr: 1 }} />
                <Typography color="white">{teacherdata.position}</Typography>
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <SchoolIcon sx={{ color: "#22d3ee", mr: 1 }} />
                <Typography color="white">{teacherdata.experience}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>

      {/* Update Modal */}
      <Modal
        open={updateopen}
        onClose={() => setupdateOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={updateopen}>
          <Box
            sx={{
              width: 520,
              bgcolor: "#0f172a",
              borderRadius: 3,
              boxShadow: "0 15px 45px rgba(0,0,0,0.6)",
              p: 4,
              mx: "auto",
              mt: "6%",
              border: "1px solid #22d3ee",
              position: "relative",
            }}
          >
            {/* Close Button */}
            <IconButton
              onClick={() => setupdateOpen(false)}
              sx={{ position: "absolute", top: 10, right: 10, color: "white" }}
            >
              <CloseIcon />
            </IconButton>

            {/* Header */}
            <Typography
              variant="h5"
              align="center"
              sx={{ color: "#22d3ee", fontWeight: "bold", mb: 3 }}
            >
              Update Teacher
            </Typography>

            {/* Avatar Preview */}
            <Box display="flex" justifyContent="center" mb={3}>
              <Avatar
                src={updateData.profile}
                sx={{
                  width: 90,
                  height: 90,
                  border: "3px solid #22d3ee",
                  boxShadow: "0 4px 15px rgba(34,211,238,0.4)",
                }}
              />
            </Box>

            {/* Form Fields */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="first_name"
                  value={updateData.first_name}
                  onChange={handleChange}
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#94a3b8" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#334155" },
                      "&:hover fieldset": { borderColor: "#22d3ee" },
                      "&.Mui-focused fieldset": { borderColor: "#22d3ee" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  value={updateData.last_name}
                  onChange={handleChange}
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#94a3b8" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#334155" },
                      "&:hover fieldset": { borderColor: "#22d3ee" },
                      "&.Mui-focused fieldset": { borderColor: "#22d3ee" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Mobile"
                  name="mobile"
                  value={updateData.mobile}
                  onChange={handleChange}
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#94a3b8" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#334155" },
                      "&:hover fieldset": { borderColor: "#22d3ee" },
                      "&.Mui-focused fieldset": { borderColor: "#22d3ee" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Position"
                  name="position"
                  value={updateData.position}
                  onChange={handleChange}
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#94a3b8" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#334155" },
                      "&:hover fieldset": { borderColor: "#22d3ee" },
                      "&.Mui-focused fieldset": { borderColor: "#22d3ee" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Experience"
                  name="experience"
                  value={updateData.experience}
                  onChange={handleChange}
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#94a3b8" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#334155" },
                      "&:hover fieldset": { borderColor: "#22d3ee" },
                      "&.Mui-focused fieldset": { borderColor: "#22d3ee" },
                    },
                  }}
                />
              </Grid>
            </Grid>

            {/* Buttons */}
            <Box display="flex" justifyContent="center" gap={2} mt={4}>
              <Button
                variant="outlined"
                onClick={() => setupdateOpen(false)}
                sx={{
                  color: "#ef4444",
                  borderColor: "#ef4444",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#ef4444",
                    color: "#fff",
                    borderColor: "#ef4444",
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={updateteacherdata}
                sx={{
                  background: "linear-gradient(90deg,#06b6d4,#2563eb)",
                  fontWeight: "bold",
                  px: 4,
                }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Salary Modal */}
      <Modal
        open={salaryopen}
        onClose={() => setsalaryOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        <Fade in={salaryopen}>
          <Box sx={{
              width: 520,
              bgcolor: "#0f172a",
              borderRadius: 3,
              boxShadow: "0 15px 45px rgba(0,0,0,0.6)",
              p: 4,
              mx: "auto",
              mt: "6%",
              border: "1px solid #22d3ee",
              position: "relative",
            }}>
            {/* Title */}
            <Typography
              variant="h5"
              align="center"
              className="text-cyan-400 font-bold mb-6"
            >
              Salary Payment
            </Typography>

            {/* Form */}
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(salary).map((key) => (
                <div key={key} className="flex flex-col">
                  <label className="text-gray-300 text-sm mb-1 capitalize">
                    {key.replace("_", " ")}
                  </label>

                  <input
                    name={key}
                    value={salary[key]}
                    onChange={(e) =>
                      setSalary({ ...salary, [key]: e.target.value })
                    }
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white outline-none focus:border-cyan-400 transition"
                  />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setsalaryOpen(false)}
                className="px-6 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition"
              >
                Cancel
              </button>

              <button
                onClick={paySalary}
                className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-2 rounded-lg text-white font-bold shadow-lg hover:scale-105 transition"
              >
                Pay Salary
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

/* ---------- Reusable Components ---------- */

const IconBtn = ({ children, onClick, color }) => {
  const colors = {
    cyan: "from-cyan-500 to-blue-600",
    red: "from-red-500 to-rose-600",
    emerald: "from-emerald-500 to-green-600",
  };

  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r ${colors[color]} p-2 rounded-lg text-white shadow hover:scale-105 transition`}
    >
      {children}
    </button>
  );
};

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-300 mb-1">{label}</label>
    <input
      {...props}
      className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white outline-none"
    />
  </div>
);

const mapStateToProps = (state) => ({
  res: state.teacherList,
  resdetail: state.teacherDetail,
  resdetail2: state.teacherDetail,
  resupdate: state.updateTeacher,
  resdelete: state.deleteTeacher,
  respayment: state.teacherSalary,
});

export default connect(mapStateToProps)(TeacherList);
