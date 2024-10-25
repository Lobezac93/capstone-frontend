import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";


function Auth() {
  return (
    <div className="signed-in-container">
      
      <SignedOut>
        <SignInButton mode="modal"/>
        <SignUpButton mode="modal"/>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

export default Auth;
