import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ACCESS_TOKEN,
  EDIT_EXAM,
  EXAM_DETAIL,
  TEACHER_DASHBOARD,
  TEACHER_DASHBOARD_API,
} from "../../../Constants/constants";
import { Box, CircularProgress } from "@mui/material";
import ExamForm from "../../../Reusable/ExamForm";

const EditExam = () => {
  const [exam, setExam] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { subjectName, notes } = location.state;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API
        }/${TEACHER_DASHBOARD_API}/${EXAM_DETAIL}?id=${id}`,
        { headers: { "access-token": localStorage.getItem("token") } }
      );
      console.log("data", response.data);
      setExam(response.data);
    };
    fetchExam();
  }, [id]);

  console.log("subject " + subjectName, "notes " + notes);
  const handleSubmitExam = async (examData) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_API
        }/${TEACHER_DASHBOARD_API}/${EDIT_EXAM}?id=${id}`,
        {
          subjectName: examData.subjectName,
          questions: examData.saveQuestion,
          notes: examData.notes,
        },
        { headers: { "access-token": localStorage.getItem("token") } }
      );

      console.log("response", response);
      navigate(TEACHER_DASHBOARD);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
     (
      <Box id="loading">
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <h1>Edit Exam</h1>
      <div className="form-container">
        <ExamForm
          examData={{ ...exam?.data, subjectName: subjectName, notes: notes }}
          onSave={handleSubmitExam}
          onCancel={() => navigate(TEACHER_DASHBOARD)}
          loading={loading}
        />
      </div>
    </>
  );
};

export default EditExam;
