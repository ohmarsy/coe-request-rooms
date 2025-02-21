import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
interface AuthFormProps {
    buttonText: string;
    linkTo:string;
    onSubmit: (firstname?: string, lastname?: string, email?: string, password?: string) => void;
    showDomainSelect?: boolean;
    showFirstNameLastName?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
    buttonText,
    linkTo,
    onSubmit,
    showDomainSelect = false,
    showFirstNameLastName = false,
}) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [domain, setDomain] = useState("@kkumail.ac.th");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (showFirstNameLastName) {
            onSubmit(firstname, lastname, email + domain, password);
        } else {
            onSubmit(undefined, undefined, email + domain, password);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto p-4">
            {showFirstNameLastName && (
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label htmlFor="firstname" className="block mb-2">Firstname</label>
                        <input
                            id="firstname"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            placeholder="Enter your firstname"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label htmlFor="lastname" className="block mb-2">Lastname</label>
                        <input
                            id="lastname"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            placeholder="Enter your lastname"
                        />
                    </div>
                </div>
            )}

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label htmlFor="email" className="block mb-2">Email Address</label>
                    <input
                        id="email"
                        className="appearance-none w-full p-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>

                {showDomainSelect && (
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block mb-2 text-transparent">Domain</label>
                        <div className="relative">
                            <select
                                className="block appearance-none cursor-pointer w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                id="grid-state"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                            >
                                <option value="@kkumail.ac.th">@kkumail.ac.th</option>
                                <option value="@kkumail.com">@kkumail.com</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label htmlFor="password" className="block mb-2">Password</label>
                    <input
                        id="password"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
            </div>

            <div className="w-full max-w-xl mx-auto">
                <Link to={linkTo}>
                    <Button typeButton="submit">
                        {buttonText}
                    </Button>
                </Link>

            </div>
        </form>
    );
};

export default AuthForm;
