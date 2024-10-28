import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import "../css/Auth.css"; // Create a CSS file for styles
import { RiInstagramLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";

function Auth() {
  return (
    <div>
      <div className="auth-container">
        <div>
          <RiInstagramLine style={{ paddingRight: 30 }} />
          <FaFacebook />
        </div>
        <div className="button-container">
          <SignedOut>
            <SignInButton mode="modal" className="auth-button">
              Sign In
            </SignInButton>
            <SignUpButton mode="modal" className="auth-button">
              Sign Up
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      <div className="auth-introduction">
        <h1>Welcome to Our Platform</h1>
        <p>Join us to rate our amazing professors!</p>
      </div>
    </div>
  );
}

export default Auth;
