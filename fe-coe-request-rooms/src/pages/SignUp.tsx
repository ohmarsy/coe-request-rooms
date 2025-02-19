import AuthLayout from "../layout/AuthLayout";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <AuthLayout>
       <div className="bg-[var(--background-color)] w-full h-full flex  flex-col items-center justify-center ">
        <h2>Sign Up</h2>
     </div>
    </AuthLayout>
  );
}
