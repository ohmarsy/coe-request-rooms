import AuthLayout from "../layout/AuthLayout";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <AuthLayout>
     <div className="bg-[var(--background-color)] w-full h-full flex  flex-col items-center justify-center ">
        <h2>Login</h2>
     </div>
    </AuthLayout>
  );
}
