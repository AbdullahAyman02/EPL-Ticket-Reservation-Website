const LoginForm = () => {
    return (
    <div className="mt-3">
        <form>
            <div className="relative mt-2">
                <input type="text" id="username" className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""/>
                <label for="username" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 bg-white top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:bg-white peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4">Username</label>
            </div>
            <div className="relative mt-2">
                <input type="password" id="password" className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""/>
                <label for="password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 bg-white  top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:bg-white peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4">Password</label>
            </div>
            <button type="submit" className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log in</button>
        </form>
    </div>
    );
}

export default LoginForm;