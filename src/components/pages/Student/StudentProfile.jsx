import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ACCESS_TOKEN, CUSTOM_ID, RESET_PASSWORD } from "../../../Constants/constants";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Button from "../../../Reusable/Button";
import { toast } from "react-toastify";
import "../../CSS/button.css";
import "../../CSS/student.css";

const StudentProfile = () => {
  const [student, setStudent] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchStudent = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/student/getStudentDetail`,
        { headers: { "access-token": localStorage.getItem("token") } }
      );

      setStudent(response.data);
      console.log("Stud Detail", response.data);
    };
    fetchStudent();
  }, []);

  const editStudent = async () => {
    if (loading) return;

    if (!student?.name || !/^[A-Za-z]+[A-Za-z ]*$/.test(student?.name))
      return toast.error("Please enter a valid name", { toastId: CUSTOM_ID });

    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API}/student/studentProfile`,
        { name: student?.name },
        { headers: { "access-token": localStorage.getItem("token") } }
      );

      setStudent((prev) => ({
        ...prev,
        data: { ...prev.data, name: response?.data?.data?.name },
      }));
      setShowEditModal(false);

      console.log("Student edited successfully", response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <h1>Student Profile</h1>
      <Button
        className="log-out"
        prop={"Log Out"}
        icon={"LogOut"}
        onClick={handleLogOut}
      />
      {!student?.data && (
        <Box id="loading">
          <CircularProgress />
        </Box>
      )}
      {student && (
        <div>
          <h4>Name: {student.data?.name}</h4>
          <h4>Email: {student.data?.email}</h4>
          <h4>Role: {student.data?.role}</h4>
          <button
            className="btn btn-primary btn-block fa-lg gradient-custom-2 w-36 mt-3 m-1"
            type="submit"
            onClick={() => setShowEditModal(true)}
          >
            Edit Profile
          </button>
          <button
            className="btn btn-primary btn-block fa-lg gradient-custom-2 w-36 mt-3 m-1"
            type="submit"
            onClick={() => navigate(RESET_PASSWORD)}
          >
            Reset Password
          </button>
        </div>
      )}
      {showEditModal && (
        <div className="swiper-modal">
          <div>
            Name:{" "}
            <input
              className="modal-input"
              placeholder="Enter Name"
              type="text"
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
            />{" "}
          </div>
          <br />
          <div>
            <button className="modal-button" onClick={editStudent}>
              Save
            </button>
            <button
              className="modal-button"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentProfile;
