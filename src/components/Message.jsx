import React from "react";
import { MdCropSquare } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedEmail } from "../redux/appSlice";
import { motion } from "framer-motion";

const Message = ({ email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openMail = () => {
    dispatch(setSelectedEmail(email));
    if (!email?.id) return;
    navigate(`/mail/${email.id}`);
  };

  const recipients = email?.data?.recipients || email?.data?.to || "";
  const subject = email?.data?.subject || "";
  const emailmsg = email?.data?.message || "";
  const ts = email?.data?.timestamp;
  const timeString = ts ? new Date(ts).toUTCString() : "";

  return (
    <motion.div
      onClick={openMail}
      className="flex items-start justify-between border-b border-gray-200 px-4 text-sm mt-2"
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-none text-gray-300">
          <MdCropSquare size={"18px"} />
        </div>
        <div className="flex-none text-gray-300">
          <RiStarLine size={"18px"} />
        </div>
      </div>

      <div className="flex-1 ml-4">
        <p className="text-gray-600 truncate inline-block w-[90%] font-semibold">
          {subject}
        </p>

        <p className="text-gray-600 truncate inline-block w-[90%]">
          {emailmsg}
        </p>
      </div>

      <div className="flex-none text-gray-400">{timeString}</div>
    </motion.div>
  );
};

export default Message;
