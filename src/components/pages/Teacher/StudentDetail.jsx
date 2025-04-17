import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ACCESS_TOKEN,
  TEACHER_DASHBOARD_API,
  VIEW_STUDENT_DETAIL_API,
} from "../../../Constants/constants";
import { useParams } from "react-router-dom";
import "../../CSS/teacher.css";
import { Box, CircularProgress } from "@mui/material";
import Table from "../../../Reusable/Table";

const StudentDetail = () => {
  const { id } = useParams();
  const [studentDetail, setStudentDetail] = useState();

  useEffect(() => {
    const fetchStudent = async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API
        }/${TEACHER_DASHBOARD_API}/${VIEW_STUDENT_DETAIL_API}?id=${id}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        }
      );
      setStudentDetail(response.data);
    };
    fetchStudent();
  }, []);

  return (
    <>
      <h1>Student Detail</h1>
      {!studentDetail?.data && (
        <Box id="loading">
          <CircularProgress />
        </Box>
      )}
      {studentDetail?.data?.map?.((student) => (
        <div>
          {console.log(
            "data",
            student?.Result?.map((result) =>
              result?.studentAnswer?.map((r) => ({
                Subject: result.subjectName,
                Question: r.question,
                Answer: r.answer,
              }))
            )
          )}
          {console.log(
            "detail",
            student?.Result?.map((result) => ({
              subjectName: result.subjectName,
              score: result.score,
              rank: result.rank,
              resultStatus: result.resultStatus,
            }))
          )}

          <div className="student-detail">
            <h4>Name: {student.name}</h4>
            <h4>Email: {student.email}</h4>
          </div>
          <h4>Result: </h4>
          <div key={student._id}>
            <Table
              headers={["subjectName", "score", "rank", "resultStatus"]}
              data={student?.Result?.map((result) => ({
                subjectName: result.subjectName,
                score: result.score,
                rank: result.rank,
                resultStatus: result.resultStatus,
              }))}
            />
            {/* <table className="student-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Rank</th>
                  <th>ResultStatus</th>
                </tr>
              </thead>
              <tbody>
                {student?.Result?.length === 0 && (
                  <p className="not-found">No Result Found</p>
                )}
                {student?.Result?.map((result) => (
                  <tr key={result._id}>
                    <td>{result.subjectName}</td>
                    <td>{result.score}</td>
                    <td>{result.rank}</td>
                    <td>{result.resultStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            <h4 style={{marginTop:"5px"}}>Review Answer: </h4>
            <Table
              headers={["Subject", "Question", "Answer"]}
              data={student?.Result?.flatMap((result) =>
                result?.studentAnswer?.map((r) => ({
                  Subject: result.subjectName,
                  Question: r.question,
                  Answer: r.answer,
                }))
              )}
            />
            {/* <table className="student-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Question</th>
                  <th>Answer</th>
                </tr>
              </thead>
              {student?.Result?.length === 0 && (
                <p className="not-found">No Result Found</p>
              )}
              <tbody>
                {student?.Result?.map((result) =>
                  result?.studentAnswer?.map((question) => (
                    <tr>
                      <td>{result.subjectName}</td>
                      <td>{question.question}</td>
                      <td>{question.answer}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default StudentDetail;
