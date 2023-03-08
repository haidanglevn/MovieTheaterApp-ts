import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <div className="nav">
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/theater">Theater</NavLink>
          </li>
        </ul>
      </div>
      <div className="top">
        <h1>
          <NavLink to="/home">MOVIEX</NavLink>
        </h1>
        <div className="welcome-user">
          <div className="circle"></div>
          <div>
            <p>Username </p>
            <p>User email</p>
          </div>
        </div>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
