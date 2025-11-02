import React from "react";
import GoogleButton from "react-google-button";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/appSlice";
const Login = () => {
  const dispatch = useDispatch();

  const SignInWithGoogle = async () => {
    // Handle Google login here
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      dispatch(
        setUser({
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        })
      );
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-10">Login</h1>
        <GoogleButton className="mt-4" onClick={SignInWithGoogle} />
      </div>
    </div>
  );
};

export default Login;
