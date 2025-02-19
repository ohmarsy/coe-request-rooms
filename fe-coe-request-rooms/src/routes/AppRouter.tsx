import { Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "../pages/Dashboard";
import ImageAnalysePage from "../pages/ImageAnalyse";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/image-analyse" element={<ImageAnalysePage />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;
