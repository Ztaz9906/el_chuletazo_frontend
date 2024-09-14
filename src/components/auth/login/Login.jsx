import {useLoginMutation} from "@/servicios/api/auth/login/login.js";

const Login = () => {
    const [loginMutation, { isLoading }] = useLoginMutation();

    function handleSubmit(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        loginMutation({ email, password });
    }

    return (
        <div className="container mx-auto p-4 bg-gray-100">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl my-10">
                <div className="p-8 w-full">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-6 text-center">
                        Aqui Va un logo
                    </div>

                    <div className="flex flex-col items-center justify-center w-full">
                        <form className="w-full space-y-4 flex flex-col items-center" onSubmit={handleSubmit}>
                            <div className="w-full">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left mb-1">
                                    User name or Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <div className="w-full">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-1/2 p-2 flex justify-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 ${
                                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {isLoading ? 'Loading...' : 'Login'}
                            </button>
                        </form>
                    </div>

                    <div className="mt-6 text-center w-full">
                        <p className="text-sm text-gray-500">----------- OR -----------</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
