import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const handleButtonClick = async () => {
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passRef.current?.value || "";

    // ✅ IMPORTANT: validate signature match
    const message = checkValidData(name, email, password, isSignInForm);
    setErrorMessage(message);
    if (message) return;

    setIsLoading(true);

    try {
      if (!isSignInForm) {
        // ✅ SIGN UP
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(userCredential.user, {
          displayName: name.trim(),
          photoURL: USER_AVATAR,
        });

        const { uid, email: userEmail, displayName, photoURL } = auth.currentUser;

        dispatch(
          addUser({
            uid,
            email: userEmail,
            displayName,
            photoURL,
          })
        );

        navigate("/browse");
      } else {
        // ✅ SIGN IN
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/browse");
      }
    } catch (error) {
      setErrorMessage(error?.code ? `${error.code} - ${error.message}` : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
    setErrorMessage(null);
  };

  return (
    <div>
      <Header />

      <div className="absolute inset-0 -z-10">
        <img className="h-screen w-full object-cover" src={BG_URL} alt="bg" />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded"
          />
        )}

        <input
          ref={emailRef}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded"
        />

        <input
          ref={passRef}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded"
        />

        {errorMessage && (
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        )}

        <button
          type="button"
          className={`p-4 my-6 bg-red-700 w-full rounded-lg ${
            isLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
