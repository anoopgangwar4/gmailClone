// import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiCircleQuestion } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { PiDotsNineBold } from "react-icons/pi";
import Avatar from "react-avatar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setUser } from "../../redux/appSlice";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
function Navbar() {
  const [input, setInput] = useState("");
  const [toggle, setToggle] = useState(false);
  const user = useSelector((store) => store.appSlice.user);
  const dispatch = useDispatch();
  const signOuthandler = () => {
    // Add your sign-out logic here
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };
  useEffect(() => {
    dispatch(setSearchText(input));
  }, [input]);

  return (
    <>
      <div className="flex items-center justify-between mx-3 h-16">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
              <RxHamburgerMenu />
            </div>
            <img
              className="w-8"
              src="https://static.vecteezy.com/system/resources/previews/022/484/516/original/google-mail-gmail-icon-logo-symbol-free-png.png"
              alt="gmail-logo"
            />
            <h1 className="text-2xl text-gray-500  font-medium">Gmail</h1>
          </div>
        </div>
        <div className="md:block hidden w-[50%] mr-60">
          <div className="flex items-center bg-[#EAF1FB] rounded-full px-2 py-3 ">
            <IoIosSearch size={"24px"} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search mail"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent outline-none border-none w-full text-gray-600 placeholder:text-gray-600 px-2"
            />
          </div>
        </div>
        <div className="md:block hidden">
          <div className="flex items-center gap-2">
            <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
              <CiCircleQuestion size={"20px"} />
            </div>
            <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
              <CiSettings size={"20px"} />
            </div>
            <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
              <PiDotsNineBold size={"20px"} />
            </div>
            <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
              <Avatar
                onClick={() => setToggle(!toggle)}
                src={user?.photoURL}
                size="40"
                round={true}
              />
              <AnimatePresence>
                {toggle && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                      <ul className="py-1">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Profile
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Settings
                        </li>
                        <li
                          onClick={signOuthandler}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
