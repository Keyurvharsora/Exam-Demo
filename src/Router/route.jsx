import { createBrowserRouter } from "react-router-dom";
import SignUp from "../components/pages/auth/SignUp";
import Layout from "../Layout";
import ForgetPassword from "../components/pages/auth/ForgetPassword";
import Teacher from "../components/pages/Teacher/Teacher";
import NewPassword from "../components/pages/auth/NewPassword";
import ResetPassword from "../components/pages/auth/ResetPassword";
import CreateExam from "../components/pages/Teacher/CreateExam";
import Dashboard from "../components/pages/Teacher/Dashboard";
import EditExam from "../components/pages/Teacher/EditExam";
import StudentList from "../components/pages/Teacher/StudentList";
import Profile from "../components/pages/Teacher/Profile";
import StudentDetail from "../components/pages/Teacher/StudentDetail";
import Student from "../components/pages/Student/Student";
import StudentDashboard from "../components/pages/Student/StudentDashboard";
import StudentExam from "../components/pages/Student/StudentExam";
import StudentProfile from "../components/pages/Student/StudentProfile";
import ReviewExam from "../components/pages/Student/ReviewExam";
import ExamResult from "../components/pages/Student/ExamResult";
import {
  CREATE_EXAM,
  EDIT_EXAM,
  EXAM_PAPER,
  EXAM_RESULT,
  FORGOT_PASSWORD,
  LOGIN,
  NEW_PASSWORD,
  RESET_PASSWORD,
  REVIEW_EXAM,
  SIGNUP,
  STUDENT_DASHBOARD,
  STUDENT_LIST,
  STUDENT_PROFILE,
  TEACHER_DASHBOARD,
  TEACHER_PROFILE,
  VIEW_STUDENT_DETAILS,
} from "../Constants/constants";
import ProtectedRoute from "../Utils/ProtectedRoute";
import ErrorBoundary from "../Utils/ErrorBoundary";
import Login from "../components/pages/auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: LOGIN,
        element: <Login />,
      },
      {
        path: SIGNUP,
        element: <SignUp />,
      },
      {
        path: FORGOT_PASSWORD,
        element: <ForgetPassword />,
      },
      {
        path: RESET_PASSWORD,
        element: <ResetPassword />,
      },
      {
        path: NEW_PASSWORD,
        element: <NewPassword />,
      },
      {
        path: TEACHER_DASHBOARD,
        element: (
          <ProtectedRoute>
            <Teacher />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: CREATE_EXAM,
            element: <CreateExam />,
          },
          {
            path: `${EDIT_EXAM}/:id`,
            element: <EditExam />,
          },
          {
            path: STUDENT_LIST,
            element: <StudentList />,
          },
          {
            path: TEACHER_PROFILE,
            element: <Profile />,
          },
          {
            path: `${VIEW_STUDENT_DETAILS}/:id`,
            element: <StudentDetail />,
          },
        ],
      },
      {
        path: STUDENT_DASHBOARD,
        element: (
          <ProtectedRoute>
            <Student />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <StudentDashboard />,
          },
          {
            path: `${EXAM_PAPER}/:id`,
            element: <StudentExam />,
          },
          {
            path: REVIEW_EXAM,
            element: <ReviewExam />,
          },
          {
            path: `${EXAM_RESULT}/:id`,
            element: <ExamResult />,
          },
          {
            path: STUDENT_PROFILE,
            element: <StudentProfile />,
          },
        ],
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <h1>Page not found</h1>,
  // },
]);
