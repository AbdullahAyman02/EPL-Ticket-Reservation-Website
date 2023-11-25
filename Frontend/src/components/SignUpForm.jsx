const SignUpForm = () => {
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
            <div className="relative mt-2 w-full flex justify-around">
                <div className="w-full">
                    <input type="text" id="firstName" className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""/>
                    <label for="firstName" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 bg-white  top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:bg-white peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4">First Name</label>
                </div>
                <div className="w-full">
                    <input type="text" id="lastName" className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""/>
                    <label for="lastName" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 bg-white  top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:bg-white peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4">Last Name</label>
                </div>
            </div>
            <div className="relative mt-2">
                <input type="date" id="birthDate" className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"/>
                <label for="birthDate" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 bg-white  top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:bg-white peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4">Birth Date</label>
            </div>
            <div>
                <p className="relative text-md text-gray-500 bg-white">Gender</p>
                <div className="relative mt-2 flex justify-around">
                    <div className="flex">
                        <input checked id="male" type="radio" value="male" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                        <label for="male" className="ms-2 text-sm font-medium text-gray-900">Male</label>
                    </div>
                    <div className="flex">
                        <input id="female" type="radio" value="female" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                        <label for="female" className="ms-2 text-sm font-medium text-gray-900">Female</label>
                    </div>
                    <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="{hover|click}" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">City <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                    </button>
                    <div id="dropdownHover" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownHoverButton">
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Cairo</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Alexendria</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Aswan</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Luxur</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="relative mt-2">
                <input type="address" id="address" className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""/>
                <label for="address" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 bg-white top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:bg-white peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4">Address</label>
            </div>
            <div className="relative mt-2">
                <input type="email" id="email" className="block border border-white-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=""/>
                <label for="email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 bg-white top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:bg-white peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4">Email Address</label>
            </div>
            <button type="submit" className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Sign Up</button>
        </form>
    </div>
    );
}

export default SignUpForm;