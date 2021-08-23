const Navbar = () => {
    return (
        <div className="w-full bg-blue-400 ">
            <div className="flex container justify-between items-center text-white mx-auto py-7 font-poppins px-5 lg:px-20">
                {/* <div className="bg-white rounded-md">
                    <input type="text" className="bg-none border-none" />
                </div> */}
                <span className="font-semibold text-xl relative hidden md:block">
                    RevDonz
                <span className="w-3 h-3 bg-violet-500 rounded-full absolute animate-ping"></span>
                </span>
            </div>
        </div>
    )
}

export default Navbar
