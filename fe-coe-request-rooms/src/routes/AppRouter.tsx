import { Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "../pages/Dashboard";
import ImageAnalysePage from "../pages/ImageAnalyse";
import HomePage from "../pages/Home";
import SignUpPage from "../pages/SignUp";
import SignInPage from "../pages/SignIn";
const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/image-analyse" element={<ImageAnalysePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;
