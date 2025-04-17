import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ACCESS_TOKEN,
  EXAM_PAPER,
  REVIEW_EXAM,
  STUDENT_DASHBOARD,
} from "../../../Constants/constants";
import {
  CircularProgress,
  Container,
  FormControlLabel,
  Pagination,
  PaginationItem,
  Radio,
  RadioGroup,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { toast } from "react-toastify";

const StudentExam = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState({});
  const location = useLocation();
  const { notes } = location.state || {};
  const { index: editIndex, results: editResult } = location.state || {};
  const [results, setResults] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    editIndex || 0
  );
  const navigate = useNavigate();

  const resultStorageKey = `exam_results_${id}`;
  const indexStoredKey = `exam_currentQuestionIndex_${id}`;

  useEffect(() => {
    const fetchExamPaper = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/student/${EXAM_PAPER}?id=${id}`,
        { headers: { "access-token": localStorage.getItem("token") } }
      );
      setQuestions(response.data);

      const storedResult = localStorage.getItem(resultStorageKey);
      if (storedResult) {
        setResults(JSON.parse(storedResult));
      } else {
        const initialResult = response?.data?.data?.map((q) => ({
          question: q._id,
          answer: "",
        }));

        setResults(editResult || initialResult);
        localStorage.setItem(
          resultStorageKey,
          JSON.stringify(editResult || initialResult)
        );
      }

      const storedIndex = localStorage.getItem(indexStoredKey);
      if (storedIndex) {
        setCurrentQuestionIndex(parseInt(storedIndex));
      }

      if (response?.data?.statusCode === 500) {
        toast.error("Can't find exam");
      }
      console.log("ExamPaper", response.data);
    };
    fetchExamPaper();
  }, []);

  useEffect(() => {
    const res = results;
    localStorage.setItem("examData", JSON.stringify(res));
  }, [editResult, results]);

  console.log("results", results);
  const handleOptionsChange = (questionId, selectedAnswer) => {
    const updatedQuestion = results?.map((result) =>
      result.question === questionId
        ? { ...result, answer: selectedAnswer }
        : result
    );
    setResults(updatedQuestion);
    localStorage.setItem(resultStorageKey, JSON.stringify(updatedQuestion));
    // (currentQuestionIndex < results.length - 1) && setCurrentQuestionIndex(currentQuestionIndex + 1)
  };

  const handlePageChange = (event, value) => {
    const newIndex = value - 1;
    setCurrentQuestionIndex(newIndex);
    localStorage.setItem(indexStoredKey, newIndex);
  };

  const handleNavigate = () => {

    navigate(`${STUDENT_DASHBOARD}/${REVIEW_EXAM}`, {
      state: {
        results,
        questions,
        id,
        notes,
        resultStorageKey,
        indexStoredKey,
      },
    });
  };

  return (
    <>
      <h1>Exam Paper</h1>
      <div className="mb-4">
        <h5>Notes:</h5>
        {notes?.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </div>

      <div className="ExamPage">
        <Container className="page-container">
          <div>
            <p>Question: {questions?.data?.[currentQuestionIndex]?.question}</p>
            <p>Options: </p>
            {!questions.data && (
              <CircularProgress
                style={{ top: "32%", left: "40%" }}
                id="loading"
              />
            )}
            {questions?.data?.[currentQuestionIndex]?.options?.map((option) => (
              <RadioGroup
                value={
                  results.find(
                    (res) =>
                      res.question ===
                        questions?.data?.[currentQuestionIndex]?._id || ""
                  )?.answer || ""
                }
                onChange={(e) =>
                  handleOptionsChange(
                    questions?.data?.[currentQuestionIndex]?._id,
                    e.target.value
                  )
                }
              >
                <FormControlLabel
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              </RadioGroup>
            ))}
            {currentQuestionIndex === questions?.data?.length - 1 && (
              <div>
                <button
                  className="modal-button"
                  style={{ width: "140px" }}
                  onClick={handleNavigate}
                >
                  Submit & Review
                </button>
              </div>
            )}
          </div>
          <Pagination
            count={7}
            page={currentQuestionIndex + 1}
            onChange={handlePageChange}
            color="primary"
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Container>
      </div>
    </>
  );
};

export default StudentExam;
