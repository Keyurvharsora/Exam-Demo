import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/teacher.css";
import {
  ACCESS_TOKEN,
  CREATE_EXAM,
  DELETE_EXAM_API,
  EDIT_EXAM,
  TEACHER_DASHBOARD_API,
  VIEW_EXAM_API,
} from "../../../Constants/constants";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [exam, setExam] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExam = async () => {
      setExam("");
      const response = await axios.get(
        `${import.meta.env.VITE_API}/${TEACHER_DASHBOARD_API}/${VIEW_EXAM_API}`,
        { headers: { "access-token": localStorage.getItem("token") } }
      );

      setExam(response?.data);
      console.log("GetExamData", response?.data);
    };
    fetchExam();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = confirm("Do you want to delete the exam?");
    if (!confirmed) return;

    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API
        }/${TEACHER_DASHBOARD_API}/${DELETE_EXAM_API}?id=${id}`,
        { headers: { "access-token": localStorage.getItem("token") } }
      );
      toast.success("Exam Deleted Successfully");
      setExam((prevState) => ({
        ...prevState,
        data: prevState.data.filter((item) => item._id !== id),
      }));
      console.log("Deleted Data", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Welcome to Teacher Dashboard</h1>
      <h2>List of Exams</h2>

      <div id="createExam">
        <button
          className="btn btn-primary btn-block fa-lg gradient-custom-2"
          type="submit"
          onClick={() => navigate(CREATE_EXAM)}
        >
          <AddIcon /> &nbsp; Create Exam
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Subject Name</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          {!exam && (
            <Box id="loading">
              <CircularProgress />
            </Box>
          )}
          <tbody>
            {exam?.data?.length === 0 && (
              <p className="not-found">No Exam found</p>
            )}
            {exam?.data?.map((exam, index) => (
              <tr key={exam.id}>
                <td>{index + 1}</td>
                <td>{exam.subjectName}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`${EDIT_EXAM}/${exam?._id}`, {
                        state: {
                          subjectName: exam.subjectName,
                          notes: exam.notes,
                        },
                      })
                    }
                  >
                    <EditIcon fontSize="small" /> &nbsp; Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(exam?._id)}>
                    <DeleteIcon fontSize="small" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
