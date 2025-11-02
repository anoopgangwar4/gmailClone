import React, { useState } from "react";
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import {
  MdCropSquare,
  MdInbox,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useSelector } from "react-redux";
import Messages from "./Messages";

function Inbox() {
  const mailType = [
    {
      icon: <MdInbox size={"20px"} />,
      text: "Primary",
    },
    {
      icon: <GoTag size={"20px"} />,
      text: "Promotions",
    },
    {
      icon: <FaUserFriends size={"20px"} />,
      text: "Social",
    },
  ];

  const [mailTypeSelected, setMailTypeSelected] = useState(0);
  // const { emails } = useSelector((store) => store.app);

  return (
    <>
      <div className="flex-1 bg-white rounded-xl mx-5 my-3 flex flex-col">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2 text-gray-700 py-2">
            <div className="flex items-center gap-2">
              <MdCropSquare size={"20px"} />
              <FaCaretDown size={"20px"} />
            </div>
            <div className="rounded-full hover:bg-gray-100 cursor-pointer p-2">
              <IoMdRefresh size={"20px"} />
            </div>
            <div className="rounded-full hover:bg-gray-100 cursor-pointer p-2">
              <IoMdMore size={"20px"} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-400">1-50 of 10,000</p>
            <button className="rounded-full hover:bg-gray-100 cursor-pointer p-2">
              <MdKeyboardArrowLeft size={"20px"} />
            </button>
            <button className="rounded-full hover:bg-gray-100 cursor-pointer p-2">
              <MdKeyboardArrowRight size={"20px"} />
            </button>
          </div>
        </div>

        <div className="h-[90vh] overflow-y-auto">
          <div className="flex items-center gap-1">
            {mailType.map((item, index) => (
              <button
                key={index}
                className={`flex items-center gap-5 p-4 ${
                  mailTypeSelected === index
                    ? "border-b-4 border-b-blue-600 text-blue-600"
                    : "border-b-4 border-b-transparent"
                } w-52 hover:bg-gray-100`}
                onClick={() => {
                  setMailTypeSelected(index);
                }}
              >
                {item.icon}
                <span>{item.text}</span>
              </button>
            ))}
          </div>
          <Messages />
        </div>
      </div>
    </>
  );
}

export default Inbox;
