import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import {
  ACCESS_TOKEN,
  EXAM_PAPER,
  STUDENT_DASHBOARD,
  STUDENT_EXAM,
} from "../../../Constants/constants";
import { toast } from "react-toastify";
import Table from "../../../Reusable/Table";

const ReviewExam = () => {
  const location = useLocation();
  const {
    results: initialResult,
    questions,
    id,
    notes,
    resultStorageKey,
  } = location.state || {};
  const results = [...initialResult];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  console.log("checked", results);

  const handleExamSubmit = async () => {
    if (loading) return;

    const notChecked = results.find(
      (result, index) =>
        result.answer === "" &&
        toast.error(`Please enter answer at Question ${index + 1}`)
    );
    if (notChecked) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/${STUDENT_EXAM}?id=${id}`,
        results,
        { headers: { "access-token": localStorage.getItem("token") } }
      );
      toast.success(response?.data?.message);

      localStorage.removeItem(resultStorageKey);

      navigate(STUDENT_DASHBOARD);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const tableData = results.map((result, index) => ({
    "Sr no.": index + 1,
    Question: questions.data[index].question,
    Answer: result.answer,
    Action: (
      <button
        onClick={() =>
          navigate(`${STUDENT_DASHBOARD}/${EXAM_PAPER}/${id}`, {
            state: { results, index, notes },
          })
        }
      >
        <EditIcon fontSize="small" /> &nbsp; Edit
      </button>
    ),
  }));

  return (
    <>
      <h1>Review Exam</h1>

      <div>
        Submit the Exam by clicking the
        <button
          className="btn btn-primary btn-block fa-lg gradient-custom-2 w-30 m-3"
          type="submit"
          onClick={handleExamSubmit}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        or you can edit the answer in below table.
      </div>

      <Table
        headers={["Sr no.", "Question", "Answer", "Action"]}
        data={tableData}
      />
      {/* <table>
        <thead>
          <tr>
            <th>Sr no.</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{questions.data[index].question}</td>
              <td>{result.answer}</td>
              <td>
                {
                  <button
                    onClick={() =>
                      navigate(`${STUDENT_DASHBOARD}/${EXAM_PAPER}/${id}`, {
                        state: { results, index, notes },
                      })
                    }
                  >
                    <EditIcon fontSize="small" /> &nbsp; Edit
                  </button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  );
};

export default ReviewExam;
