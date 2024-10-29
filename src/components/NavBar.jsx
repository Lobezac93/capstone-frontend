import React from "react";
import { SignedOut, SignedIn, useUser, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import "../css/NavBar.css";
import { RiInstagramLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";

function NavBar() {
  const { user } = useUser();

  return (
    <div className="navbar">
      <div className="social-icons">
        <RiInstagramLine style={{ paddingRight: 30, width: "40px", height: "40px" }} />
        <FaFacebook style={{ width: "40px", height: "40px" }} />
      </div>

      <div className="auth-section">
        <SignedOut>
          <SignInButton mode="modal" className="auth-button" style={{padding:"15px", border:"2px solid black", borderRadius:"30px", marginRight:"30px"}}>
          Sign In
          </SignInButton>
        </SignedOut>
          <div >
            <span className="user-greeting" style={{padding:"15px", border:"2px solid black", borderRadius:"20%", color:"white", backgroundColor:"black"}}>
              {user ? `Hi, ${user.firstName}` : "Hi, Guest"}  
            </span>
          </div>
      </div>
    </div>
  );
}

export default NavBar;
