const LoginForm = () => {
    return (
    <div className="mt-3 w-3/12 min-w-fit">
        <form method="POST" action="http://localhost:20396/login">
            <div className="relative mt-2">
                <input type="text" id="username" name="username" className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""/>
                <label for="username" className="absolute left-0 text-sm text-gray-500 duration-300 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-7">Username</label>
            </div>
            <div className="relative mt-5">
                <input type="password" id="password" name="password" className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""/>
                <label for="password" className="absolute text-sm left-0 text-gray-500 duration-300 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-7">Password</label>
            </div>
            <button type="submit" className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Log in</button>
        </form>
    </div>
    );
}

export default LoginForm;