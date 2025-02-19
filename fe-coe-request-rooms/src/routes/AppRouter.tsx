import { Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "../pages/Dashboard";
import ImageAnalysePage from "../pages/ImageAnalyse";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/Signup";
const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/image-analyse" element={<ImageAnalysePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;
