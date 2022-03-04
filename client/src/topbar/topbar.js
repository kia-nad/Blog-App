import { Link } from "react-router-dom";
import "./topbar.css";
import Cookies from 'js-cookie'
import axios from "axios";

export default function Topbar() {
  console.log(Cookies.get('username'))
  let user = false;
  if (Cookies.get('username')) {
    user = true;
  }

  const handleLogout = async () => {
    const res = await axios.get("/signout/", {
    })
    res.data && window.location.replace("/");
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <div className="topRight">Hi {Cookies.get('username')} !</div>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/signup">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}