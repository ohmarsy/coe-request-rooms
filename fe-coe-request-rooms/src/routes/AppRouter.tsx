import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../pages/Home";
import SignUpPage from "../pages/SignUp";
import SignInPage from "../pages/SignIn";
import MainPage from "../pages/Main";
const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;
