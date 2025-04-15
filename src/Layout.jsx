import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ToastContainer theme="dark" autoClose="2000" limit={1}/>
      <Outlet />
    </div>
  );
};

export default Layout;
