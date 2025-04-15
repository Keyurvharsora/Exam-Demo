import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ACCESS_TOKEN,
  EXAM_PAPER,
  EXAM_RESULT,
  STUDENT_GET_EXAM_API,
} from "../../../Constants/constants";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, TablePagination } from "@mui/material";
import { toast } from "react-toastify";

const StudentDashboard = () => {
  const [studentExam, setStudentExam] = useState([]);
  const navigate = useNavigate();
  console.log("studentExam", studentExam);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setCurrentIndex(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentIndex(0);
  };

  useEffect(() => {
    const fetchExam = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/${STUDENT_GET_EXAM_API}`,
        { headers: { "access-token": localStorage.getItem("token") } }
      );

      if (response.data.statusCode !== 200)
        toast.error(response?.data?.message);

      setStudentExam(response?.data);
      console.log("fetchExamList", response.data);
    };
    fetchExam();
  }, []);

  const pageContent = studentExam?.data?.slice(
    currentIndex * rowsPerPage,
    currentIndex * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <h1>Welcome to Student Dashboard</h1>
      <h2>List of Available Exam</h2>
      {!studentExam?.data && (
        <Box id="loading">
          <CircularProgress />
        </Box>
      )}
      <table className="studentTable">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Email</th>
            <th>Exam Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pageContent?.length !== null
            ? pageContent?.map((page) => (
                <tr key={page?._id}>
                  <td>{page?.subjectName}</td>
                  <td>{page?.email}</td>
                  <td>
                    {page?.Result?.length > 0 ? "Completed" : "Not Completed"}
                  </td>

                  <td>
                    {page?.Result?.length > 0 ? (
                      <button
                        style={{ backgroundColor: "darkgray" }}
                        onClick={() =>
                          navigate(`${EXAM_RESULT}/${page?._id}`, {
                            state: { ...page.Result },
                          })
                        }
                      >
                        View Result
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          navigate(`${EXAM_PAPER}/${page?._id}`, {
                            state: { notes: page.notes },
                          })
                        }
                      >
                        Start Exam
                      </button>
                    )}
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={studentExam?.data?.length}
          page={currentIndex}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </table>
    </>
  );
};

export default StudentDashboard;
