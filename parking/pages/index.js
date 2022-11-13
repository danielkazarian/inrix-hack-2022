import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import React, { useRef, useEffect } from "react";

import DefaultMap from "../components/map";
import Search from "../components/search";
import LocationCards from "../components/LocationCards";
import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { SearchContextProvider } from "../context/search-context";

export default function Home() {
  const [user, setUser] = useAuthState(auth);
  const googleAuth = new GoogleAuthProvider();
  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth);
  };
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <>
      <SearchContextProvider>
        <div className="flex flex-row h-screen w-screen">
          <div className="w-2/3">
            <DefaultMap />
          </div>
          <div className="flex flex-col w-1/3 bg-[#A9CEF4]">
            <div className="flex items-center justify-center gap-5 mt-5">
              <button className = "text-xl" onClick={login}>
                {!user ? "Sign In" : "Welcome, " + user.displayName}
              </button>
              <img className= "p-0 h-20 w-20" src={user ? user.photoURL : ""} />
            </div>
            <div className="flex justify-center mt-[2rem]">
              <Search />
            </div>
            <LocationCards />
          </div>
        </div>
      </SearchContextProvider>
    </>
  );
}
