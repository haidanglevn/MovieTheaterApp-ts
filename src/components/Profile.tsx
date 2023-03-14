import React from "react";
import { handleGoogleSignIn, auth, googleSignOut } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  const [user] = useAuthState(auth);
  const showUser = () => {
    if (user) {
      return (
        <>
          <h1>User: {user.displayName}</h1>
          <h1>Email: {user.email}</h1>
          <img src={user.photoURL!} alt="" />
          <button onClick={googleSignOut}>Log out</button>
        </>
      );
    } else {
      return (
        <>
          <h1>NO user</h1>
          <button onClick={handleGoogleSignIn}>Log in with google</button>
        </>
      );
    }
  };
  return <div>{showUser()}</div>;
};

export default Profile;
