import { useState } from "react";
import Button
    from "./Button";
interface AuthFormProps {
    buttonText: string;
    linkTo: string;
    onSubmit: (firstname?: string, lastname?: string, email?: string, password?: string) => void;
    showDomainSelect?: boolean;
    showFirstNameLastName?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
    buttonText,
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
        const fullEmail = email.trim() + domain;
        onSubmit(
            showFirstNameLastName ? firstname.trim() : undefined,
            showFirstNameLastName ? lastname.trim() : undefined,
            fullEmail,
            password
        );
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto p-4 text-sm md:text-base">
            {/* Firstname & Lastname */}
            {showFirstNameLastName && (
                <div className="flex flex-wrap -mx-3 mb-2 md:mb-6">
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

            {/* Email & Domain Select */}
            <div className="flex flex-wrap -mx-3 mb-2 md:mb-6">
                <div className="w-1/2 px-3 mb-2 md:mb-0">
                    <label htmlFor="email" className="block mb-2">Email Address</label>
                    <input
                        id="email"
                        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>

                {showDomainSelect && (
                    <div className="w-1/2 px-3 mb-2">
                        <label className="block mb-2 text-transparent">Domain</label>
                        <select
                            className="block w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                        >
                            <option value="@kkumail.ac.th">@kkumail.ac.th</option>
                            <option value="@kkumail.com">@kkumail.com</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Password */}
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

            {/* Submit Button */}
            <Button typeButton="submit">
                {buttonText}
            </Button>

        </form>
    );
};

export default AuthForm;
