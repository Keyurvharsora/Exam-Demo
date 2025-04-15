import axios from "axios";
import React, { useState } from "react";
import { ACCESS_TOKEN, TEACHER_DASHBOARD } from "../../../Constants/constants";
import { useNavigate } from "react-router-dom";
import ExamForm from "../../../Reusable/ExamForm";
import { toast } from "react-toastify";
import "../../CSS/student.css";

const CreateExam = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveButton = async (examData) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_CREATE_EXAM_API,
        {
          subjectName: examData.subjectName,
          questions: examData.saveQuestion,
          notes: examData.notes,
        },
        { headers: { "access-token": localStorage.getItem("token") } }
      );
      toast.success(response?.data?.message);
      navigate(TEACHER_DASHBOARD);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Create Exam</h1>
      <div className="form-container">
        <ExamForm
          onSave={handleSaveButton}
          onCancel={() => navigate(TEACHER_DASHBOARD)}
          loading={loading}
        />
      </div>
    </>
  );
};

export default CreateExam;
