import { Children } from "react";
import Navbar from "./components/shared/Navbar";
// import SideBar from "./components/SideBar";
import Mail from "./components/Mail";
import Inbox from "./components/Inbox";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Messages from "./components/Messages";
import SendEmail from "./components/SendEmail";
import Login from "./components/login";
import { useSelector } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Inbox />,
      },
      {
        path: "/mail/:id",
        element: <Mail />,
      },
    ],
  },
]);
function App() {
  const user = useSelector((store) => store.appSlice.user);
  return (
    <>
      <div className="bg-[#F6F8FC] h-screen w-screen overflow-hidden">
        {!user ? (
          <Login />
        ) : (
          <>
            <Navbar />
            <RouterProvider router={router} />
            {/* <Messages /> */}
            <div className="absolute w-[30%] bottom-0 right-20 z-1">
              <SendEmail />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
