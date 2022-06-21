import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { columns_skills, experiences_columns } from "../const/Api";
import Access from "../pages/Access";
import LoginP from "../pages/LoginP";
import ProtectedRoutes from "../pages/ProtectedRoutes";
import TemplateES from "./TemplateES";
import LayoutP from "./LayoutP";
import Messages from "./Messages";
import PersonalSettings from "./PersonalSettings";
import Photos from "./Photos";
import Portfolios from "./Employee";
import Users from "./Users";
import Role from "./Role";
import Author from "./Author";
import Category from "./Category";
import Books from "./Books";
import Employee from "./Employee";
import Course from "./Course";

const index = () => {
  return (
    <Routes>
      <Route path="/" element={<Access />}>
        <Route
          path="/"
          element={
            <LayoutP>
              <Outlet />
            </LayoutP>
          }
        >
          <Route path="/" element={<Navigate to="employee" />} />
          <Route path="employee" element={<Employee />} />
          <Route path="role" element={<Role />} />
          <Route path="author" element={<Author />} />
          <Route path="category" element={<Category />} />
          <Route path="books" element={<Books />} />
          <Route path="course" element={<Course />} />
        </Route>
      </Route>

      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/login" element={<LoginP />} />
      </Route>
    </Routes>
  );
};

export default index;
