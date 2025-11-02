import React from "react";
import { IoMdStar } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import {
  MdOutlineDrafts,
  MdOutlineKeyboardArrowDown,
  MdOutlineWatchLater,
} from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setOpen } from "../redux/appSlice";

function SideBar() {
  const sideBarItems = [
    {
      icon: <LuPencil size={"15px"} />,
      title: "Inbox",
    },
    {
      icon: <IoMdStar size={"15px"} />,
      title: "Starred",
    },
    {
      icon: <MdOutlineWatchLater size={"15px"} />,
      title: "Snoozed",
    },
    {
      icon: <TbSend2 size={"15px"} />,
      title: "Sent",
    },
    {
      icon: <MdOutlineDrafts size={"15px"} />,
      title: "Drafts",
    },
    {
      icon: <MdOutlineKeyboardArrowDown size={"15px"} />,
      title: "More",
    },
  ];

  const dispatch = useDispatch();
  return (
    <div className="w-[15%]">
      <div className="p-3">
        <button
          onClick={() => {
            dispatch(setOpen(true));
          }}
          className="flex items-center gap-2 rounded-2xl hover:shadow p-4 bg-[#C2E7FF]"
        >
          <LuPencil size={"24px"} />
          Compose
        </button>
      </div>
      <div className="text-gray-500">
        {sideBarItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 pl-6 py-1 hover:bg-gray-200 cursor-pointer rounded-full"
          >
            {item.icon}
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
