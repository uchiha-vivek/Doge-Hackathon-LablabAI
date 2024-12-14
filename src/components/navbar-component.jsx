import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { RiCloseFill, RiMenu3Line } from "react-icons/ri";
import ally from '../assets/x.png'

const Navbar = () => {
    const [open, setIsOpen] = useState(false);
   

    const toggleMenu = () => {
        setIsOpen(!open);
    };

    // const handleGoogleAuthentication = async (e) => {
    //     try {
    //         const provider = new GoogleAuthProvider();
    //         const result = await signInWithPopup(auth, provider);
    //         if (result) {
    //             setIsAuthenticated(true);  
    //             navigate("/voice-assistant");  
    //         }
    //     } catch (error) {
    //         console.error("Error during authentication:", error);
    //     }
    // };

    return (
        <>
            <nav className="fixed top-4 left-0 right-0 z-50 m-2">
                <div className="text-neutral-500 bg-black/60 max-w-7xl backdrop-blur mx-auto px-4 py-3 flex justify-between items-center border-neutral-800 rounded-xl border">
                    <img src={ally} alt="image" width={60} height={15} /> <span className="text-white font-2xl" >Gov</span>
                    <div className="hidden md:flex space-x-6">
                        <a href="#works" className="hover:text-neutral-200">
                            How it works
                        </a>
                        <a href="#works" className="hover:text-neutral-200">
                            Features
                        </a>
                        <a href="#works" className="hover:text-neutral-200">
                            Pricing
                        </a>
                    </div>
                    {/* <div className="hidden md:flex space-x-4 items-center">
                        {isAuthenticated ? (
                            <a href="/login" className="hover:text-neutral-200">
                                Login
                            </a>
                        ) : (
                            <button
                                onClick={handleGoogleAuthentication}
                                className="text-black bg-yellow-300 hover:bg-yellow-600 px-6 py-3 rounded-lg md:flex items-center"
                            >
                                Signup
                            </button>
                        )}
                        <a className="hover:bg-neutral-700">Demo</a>
                    </div> */}

                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white focus:outline-none"
                            aria-label={open ? "Close Menu" : "Open Menu"}
                        >
                            {open ? <RiCloseFill /> : <RiMenu3Line />}
                        </button>
                    </div>
                </div>
                {open && (
                    <div className="md:hidden bg-neutral-900/60 backdrop-blur-md border border-neutral-800 p-4 mt-2 rounded-xl">
                        <div className="flex flex-col space-y-4">
                            <a href="#" className="hover:text-neutral-700">
                                Product
                            </a>
                            <a href="#" className="hover:text-neutral-700">
                                Pricing
                            </a>
                            <a href="#" className="hover:text-neutral-700">
                                Resources
                            </a>
                            <a href="#" className="hover:text-neutral-700">
                                Login
                            </a>
                            <a href="#" className="hover:text-neutral-700">
                                Book your Free Trial
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;