import React, { useState, useEffect } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import axios from "axios";

import { RiInstagramLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import NavBar from "../components/NavBar";

const API_URL = "https://api.unsplash.com/photos/random";

function Auth() {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_API_KEY}`,
          },
          params: {
            query: "campus", 
            orientation: "landscape",
          },
        });
        console.log(res.data)
        setBackgroundImage(res.data.urls.full); 
      } catch (error) {
        console.error("Error fetching background image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div>
      <div className="button-container">
        <NavBar />
      </div>

      <div className="auth-introduction">
        <img
          src={backgroundImage}
          alt=""
          style={{ height: 700, width: 1700, padding:"25px 45px"}}
        />
        <h1 style={{textAlign:"center" , fontSize:"50px"}}>Welcome to Our Platform</h1>
        <p style={{textAlign:"center", fontSize:"25px"}}>
          Join us by signing in or create an account for the first to rate our
          amazing professors!
        </p>
      </div>
    </div>
  );
}

export default Auth;
