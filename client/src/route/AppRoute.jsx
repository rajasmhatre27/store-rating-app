import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage.jsx";
import Signup from "../pages/SignUpPage.jsx";
import StoreList from "../components/StoreList.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import OwnerDashboard from "../pages/OwnerDashboard.jsx";
import ChangePassword from "../pages/ChangePassword.jsx";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/stores" element={<StoreList />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/owner/dashboard" element={<OwnerDashboard />} />
      <Route path="/change-password" element={<ChangePassword />} />
    </Routes>
  );
};

export default AppRoute;
