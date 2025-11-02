import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdDeleteOutline,
  MdOutlineReport,
  MdOutlineMarkEmailUnread,
  MdOutlineWatchLater,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
  MdMore,
} from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";

const Mail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const selectedEmail = useSelector((store) => store.appSlice.selectedEmail);

  const handleNavigation = () => {
    navigate("/");
  };

  const deleteMailById = async (id) => {
    try {
      await deleteDoc(doc(db, "emails", id));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const timestamp = selectedEmail?.data?.timestamp;

  return (
    <motion.div
      className="flex-1 bg-white rounded-xl mx-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Action Buttons */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700 py-2">
          <motion.div
            whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
            className="p-2 rounded-full cursor-pointer"
            onClick={handleNavigation}
          >
            <IoMdArrowBack size={"20px"} />
          </motion.div>

          {[
            BiArchiveIn,
            MdOutlineReport,
            MdDeleteOutline,
            MdOutlineMarkEmailUnread,
            MdOutlineWatchLater,
            MdOutlineAddTask,
            MdOutlineDriveFileMove,
            MdMore,
          ].map((Icon, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
              className="p-2 rounded-full cursor-pointer"
              onClick={() =>
                Icon === MdDeleteOutline ? deleteMailById(params.id) : null
              }
            >
              <Icon size={"20px"} />
            </motion.div>
          ))}

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
              className="rounded-full cursor-pointer p-2"
            >
              <MdKeyboardArrowLeft size={"20px"} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
              className="rounded-full cursor-pointer p-2"
            >
              <MdKeyboardArrowRight size={"20px"} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Email Content */}
      <div className="h-[90vh] overflow-y-auto p-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 text-gray-500 mb-5 bg-white"
        >
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">
              {selectedEmail?.data?.subject || ""}
            </h1>
            <span className="text-sm bg-gray-200 rounded-md px-2">inbox</span>
          </div>
          <div className="flex-none text-gray-400 my-5 text-sm">
            <p>{timestamp ? new Date(timestamp).toUTCString() : ""}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-500 text-sm"
        >
          <h1>
            {selectedEmail?.data?.to || selectedEmail?.data?.recipients || ""}
          </h1>
          <span>to me</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="my-5 text-gray-700"
        >
          <p>{selectedEmail?.data?.message || ""}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Mail;
