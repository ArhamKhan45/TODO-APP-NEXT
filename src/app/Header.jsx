import React from "react";
import "../Scss/Header.scss";
import Link from "next/link";
import { LoginLogoutbtn } from "../components//ClientComponent.jsx";
function Header() {
  return (
    <nav className="navbar navbar-expand-md custom-navbar ">
      <div className="container-fluid">
        <Link className="navbar-brand my-0" href="/">
          TODO-APP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  ms-auto mb-2 mb-md-0 me-lg-5">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/about">
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <LoginLogoutbtn />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
