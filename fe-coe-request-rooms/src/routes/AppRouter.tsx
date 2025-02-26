import { Route, Routes, Navigate } from "react-router-dom";
import WelcomePage from "../pages/Welcome";
import SignUpPage from "../pages/SignUp";
import SignInPage from "../pages/SignIn";
import MainPage from "../pages/Main";
import RequestRoomsPage from "../pages/RequestRooms";
const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/request-rooms" element={<RequestRoomsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;
