import React from "react";
import { SignedOut, SignedIn, useUser, SignInButton, SignOutButton, } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../css/NavBar.css";
import { RiInstagramLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import Auth from "../pages/Auth";

function NavBar() {
  const { user } = useUser();
  const navigate = useNavigate(); // Get navigate function

  const handleSignOut = () => {
    navigate('/auth'); // Redirect to Auth page after signing out
  };

  return (
    <div className="navbar">
      <div className="social-icons">
        <RiInstagramLine style={{ paddingRight: 30, width: "40px", height: "40px" }} />
        <FaFacebook style={{ width: "40px", height: "40px" }} />
      </div>

      <div className="auth-section">
        <SignedOut>
          <SignInButton 
            mode="modal" 
            className="auth-button" 
            style={{ padding: "15px", border: "2px solid black", borderRadius: "30px", marginRight: "30px", backgroundColor: "black", color: "white" }}>
            Sign In
          </SignInButton>
        </SignedOut>
        
        <SignedIn>
          <span className="user-greeting" style={{ padding: "15px", border: "2px solid black", borderRadius: "20%", color: "white", backgroundColor: "black" }}>
            {user ? `Hi, ${user?.primaryEmailAddress?.emailAddress.split('@')[0]}` : "Hi, Guest"}
          </span>
          <SignOutButton 
            onSignOut={handleSignOut} 
            style={{ padding: "15px", border: "2px solid black", borderRadius: "30px", marginLeft: "30px", backgroundColor: "black", color: "white" }}>
            Sign Out
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
}

export default NavBar;
