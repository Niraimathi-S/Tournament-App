import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="header-container">
      <header className="p-3 text-white bg-color">
        <div>
          <div className=" d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link
              to="/dashboard"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <span>Tournament App</span>
            </Link>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"></ul>
            <div className="text-end">
              <button type="button" className="btn account">
                <MdOutlineAccountCircle size={35} />
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
