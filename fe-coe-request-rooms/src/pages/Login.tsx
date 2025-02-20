import AuthLayout from "../layout/AuthLayout";
import { Link } from "react-router-dom";
import Button from "../components/Button";
export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="bg-[var(--background-color)] text-[var(--text-color)] w-full h-full flex flex-col items-center justify-center ">
        <h2 className="w-full max-w-xl mx-auto p-4 text-3xl text-[var(--text-color)] mb-6"><span className="text-[var(--primary-color)]">Sign in</span> to CoE Rooms</h2>
        <form className="w-full max-w-xl mx-auto p-4">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="appearance-none w-full p-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="text"
              />
            </div>
            
            <div className="w-full md:w-1/2 px-3">
              <label className="block mb-2 text-transparent">
                Email Address
              </label>
              
              <div className="relative">
                <select className="block appearance-none cursor-pointer w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" id="grid-state">
                  <option>@kkumail.ac.th</option>
                  <option>@kkumail.com</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block mb-2" htmlFor="email">
                Password
              </label>
              <input
                className="w-full p-2  border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="password"
              />
            </div>
          </div>
        </form>
        
        <div className="w-full max-w-xl mx-auto px-4">
        <Button>Sign in</Button>
        <p className="mt-5 text-xs">You don’t have an account ? <Link to='/sign-up' className="text-[var(--primary-color)] underline">Sign Up</Link></p>
        </div>
 
      </div>
    </AuthLayout>
  );
}
