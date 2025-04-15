import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ACCESS_TOKEN,
  STUDENT_FOR_EXAM,
  TEACHER_DASHBOARD,
  TEACHER_DASHBOARD_API,
  VIEW_STUDENT_DETAILS,
} from "../../../Constants/constants";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TablePagination } from "@mui/material";
import "../../CSS/table.css";

const StudentList = () => {
  const [student, setStudent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showStudentData, setShowStudentData] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState();
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isChecked, setIsChecked] = useState(false);
  const [verified, setVerified] = useState();

  const navigate = useNavigate();
  const checkboxRef = useRef();

  const handleChangePage = (event, newPage) => {
    setCurrentIndex(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentIndex(0);
  };

  useEffect(() => {
    const fetchStudent = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/${TEACHER_DASHBOARD_API}`,
        { headers: { "access-token": localStorage.getItem("token") } }
      );
      setShowStudentData(response?.data);
      setStudent(response?.data);
    };
    fetchStudent();

    const verifiedStudent = async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API
        }/${TEACHER_DASHBOARD_API}/${STUDENT_FOR_EXAM}`,
        { headers: { "access-token": localStorage.getItem("token") } }
      );
      setVerified(response?.data);
    };
    verifiedStudent();
  }, []);

  const handleCheckbox = () => {
    if (checkboxRef.current.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const filteredSortData = useMemo(() => {
    let filtered = showStudentData?.data;
    if (searchText)
      filtered = filtered?.filter((item) =>
        item.name.trim().toLowerCase().includes(searchText.trim().toLowerCase())
      );

    const filteredIds = filtered?.map((item) => item._id);
    if (isChecked)
      filtered = verified?.data?.filter((item) =>
        filteredIds.includes(item._id)
      );

    filtered?.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
      if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredData(filtered);
    return filtered;
  }, [showStudentData, searchText, sortOrder, isChecked]);

  const pageContent = filteredData?.slice(
    currentIndex * rowsPerPage,
    currentIndex * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <h1>Student List</h1>
      <div>
        <label htmlFor="checkbox">
          <span className="h5">Verified Student </span>
          <input
            type="checkbox"
            onChange={handleCheckbox}
            name="checkbox"
            ref={checkboxRef}
            checked={isChecked}
          />
        </label>
      </div>

      <div className="search-container">
        <div>
          <label htmlFor="">
            Search:{" "}
            <input
              type="text"
              placeholder="Search name here"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </label>
        </div>
        <div>
          Sort:{" "}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            name="name"
            id="name"
          >
            <option value="asc">Ascending</option>
            <option value="dsc">Descending</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Exam Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        {!student?.data && (
          <Box id="loading">
            <CircularProgress />
          </Box>
        )}
        <tbody>
          {pageContent?.length !== 0
            ? pageContent?.map((page, index) => (
                <>
                  <tr key={page._id}>
                    <td>{page.name}</td>
                    <td>{page.email}</td>
                    <td>{page.status}</td>
                    <td>
                      <button
                        style={{ width: "140px" }}
                        onClick={() =>
                          navigate(
                            `${TEACHER_DASHBOARD}/${VIEW_STUDENT_DETAILS}/${page._id}`
                          )
                        }
                      >
                        <VisibilityIcon fontSize="small" /> &nbsp; View Details
                      </button>
                    </td>
                  </tr>
                </>
              ))
            : ""}

          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            count={filteredData?.length}
            page={currentIndex}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </tbody>
      </table>
    </>
  );
};

export default StudentList;
