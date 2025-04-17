import {
  CircularProgress,
  Container,
  Pagination,
  PaginationItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ".././components/CSS/button.css";
import { validateQuestion } from "../Utils/validateQuestion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CUSTOM_ID } from "../Constants/constants";

const ExamForm = ({ examData = null, onSave, onCancel, loading }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [subjectName, setSubjectName] = useState(examData?.subjectName || "");
  const initialQuestionState = Array.from({ length: 15 }, () => ({
    question: "",
    answer: "",
    options: ["", "", "", ""],
  }));
  // const STORAGE_KEY = "examData"
  const [saveQuestion, setSaveQuestion] = useState(
    JSON.parse(JSON.stringify(examData?.questions || initialQuestionState))
  );
  const [questions, setQuestions] = useState(initialQuestionState);
  const [notes, setNotes] = useState(examData?.notes || []);

  // useEffect(() => {
  //   const savedData = localStorage.getItem(STORAGE_KEY);
  //   if (savedData) {
  //     const parsed = JSON.parse(savedData);
  //     setSubjectName(parsed.subjectName || "");
  //     setQuestions(parsed.questions || initialQuestionState);
  //     setNotes(parsed.notes || []);
  //     console.log("savedData", JSON.parse(savedData));
  //   } else if (examData) {
  //     setSubjectName(examData?.subjectName || "");
  //     setQuestions(
  //       JSON.parse(JSON.stringify(examData?.questions || initialQuestionState))
  //     );
  //     setNotes(examData?.notes || []);
  //   }
  // }, [examData]);

  // useEffect(() => {
  //   const dataToSave = { subjectName, questions, notes };
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  // }, [subjectName, questions, notes]);

  useEffect(() => {
    if (examData) {
      setQuestions(examData?.questions || initialQuestionState);
    }
  }, [examData]);

  console.log("Question", questions);

  const handleChange = (field, value, index) => {
    const updatedQuestion = [...questions];
    if (field === "options") {
      updatedQuestion[currentQuestionIndex].options[index] = value;
    } else {
      updatedQuestion[currentQuestionIndex][field] = value;
    }
    setQuestions(updatedQuestion);
    // localStorage.setItem(STORAGE_KEY, JSON.stringify({questions : updatedQuestion}));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (subjectName === "")
      return toast.error("Please enter a subject name", { toastId: CUSTOM_ID });
    if (notes.length === 0)
      return toast.error("Please enter a notes", { toastId: CUSTOM_ID });

    if (
      saveQuestion.some((question, index) =>
        validateQuestion(saveQuestion, index, CUSTOM_ID)
      )
    )
      return;

    // localStorage.removeItem(STORAGE_KEY);
    onSave({ subjectName, saveQuestion, notes });
  };

  const handlePageChange = (event, value) => {
    const original = saveQuestion;

    if (examData) {
      if (value !== event.target.value) {
        if (
          JSON.stringify(questions?.[currentQuestionIndex]) !==
          JSON.stringify(saveQuestion?.[currentQuestionIndex])
        ) {
          const bool = confirm("Do you want changes");
          if (!bool) {
            return setQuestions(JSON.parse(JSON.stringify(original)));
          }
          handleSaveExam(currentQuestionIndex);
        }
      }
    }
    setCurrentQuestionIndex(value - 1);
  };

  const handleSaveExam = (currentIndex) => {
    if (validateQuestion(questions, currentIndex, CUSTOM_ID)) return;

    const updatedQuestion = [...questions];
    updatedQuestion[currentIndex] = questions[currentIndex];
    setSaveQuestion(JSON.parse(JSON.stringify(updatedQuestion)));
    if (currentQuestionIndex < questions.length - 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  console.log("saved", saveQuestion);

  return (
    <>
      <div className="ExamPage">
        <div className="inputs">
          <div className="label">
            <label htmlFor="" className="mt-2.5">
              Subject:
            </label>
            <input
              type="text"
              placeholder="Subject Name"
              className="border border-dark"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </div>

          <div className="label">
            <label htmlFor="" className="mt-2.5">
              Notes:
            </label>
            <textarea
              type="text"
              placeholder="Write Notes"
              className="border border-dark"
              value={notes}
              onChange={(e) => setNotes([e.target.value])}
            />
          </div>
        </div>
        <hr />
        <Container className="page-container">
          <p className="mb-0">{`Question ${currentQuestionIndex + 1}`}</p>
          <div>
            Question:{" "}
            <input
              type="text"
              placeholder="Enter Question"
              value={questions[currentQuestionIndex]?.question}
              onChange={(e) => handleChange("question", e.target.value)}
            />
          </div>
          <div id="optionInput">
            Options:
            {questions[currentQuestionIndex]?.options?.map(
              (option, optIndex) => (
                <>
                  <label htmlFor="" className="mt-2.5">
                    Option {optIndex + 1}:
                    <input
                      type="text"
                      placeholder={`Option ${optIndex + 1}`}
                      value={questions[currentQuestionIndex]?.options[optIndex]}
                      onChange={(e) =>
                        handleChange("options", e.target.value, optIndex)
                      }
                    />
                  </label>
                </>
              )
            )}
          </div>
          <div>
            Answer:{" "}
            <input
              type="text"
              placeholder="Enter Answer"
              value={questions[currentQuestionIndex]?.answer}
              onChange={(e) => handleChange("answer", e.target.value)}
            />
          </div>

          <button
            className="modal-button"
            onClick={() => handleSaveExam(currentQuestionIndex)}
          >
            Save
          </button>
          <hr />
          <Pagination
            count={15}
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
        <div className="submit-button">
          <button
            className="btn btn-primary btn-block fa-lg gradient-custom-2 w-24 mx-2"
            type="submit"
            onClick={handleSave}
          >
            {loading ? (
              <span style={{ textWrap: "nowrap" }}>
                <CircularProgress size={15} color="white" /> Submit
              </span>
            ) : (
              "Submit"
            )}
          </button>
          <button
            className="btn btn-primary btn-block fa-lg gradient-custom-2 w-24 mx-2"
            type="submit"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ExamForm;
