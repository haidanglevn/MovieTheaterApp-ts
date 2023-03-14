import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";
import { handleGoogleSignIn, auth, googleSignOut } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Layout = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <div className="nav">
        <ul>
          <li>
            <NavLink to="/">New</NavLink>
          </li>
          <li>
            <NavLink to="/popular">Popular</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
      </div>
      <div className="top">
        <h1>
          <NavLink to="/">MOVIEX</NavLink>
        </h1>
        <div className="welcome-user">
          {user ? (
            <>
              <div>
                <img className="circle" src={user.photoURL!} alt="" />
              </div>
              <div>
                <p>{user.displayName} </p>
                <button onClick={googleSignOut}>Log Out</button>
              </div>
            </>
          ) : (
            <>
              <button onClick={handleGoogleSignIn}>LOG IN</button>
            </>
          )}

          <div></div>
        </div>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
