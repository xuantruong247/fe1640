import React from "react";
import { NavLink } from "react-router-dom";
import logoUser from "../../asset/img/logo-User.png";
import { motion } from "framer-motion";
// import Search from "../Search/Search";
import { useAuth } from "../../context/auth";
import Dropdown from "../DropdownsHeader/Dropdown";

const HeaderAdmin = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      users: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "underline" : "none",
    };
  };
  return (
    <header className="">
      <div className="xl:container flex justify-between h-16 mx-auto text-xl md:text-2xl">
        <a
          href="/"
          className="flex items-center p-2"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "600",
          }}
        >
          IDEA GREENWICH
        </a>

        <ul className="space-x-3 flex items-center">
          <div className="md:hidden">
            <Dropdown />
          </div>
          <li className="flex list-none	no-underline mmd:hidden">
            <NavLink
              to="/home"
              style={navLinkStyles}
              className="flex items-center px-4 no-underline text-black  text-lg pt-2"
            >
              Home
            </NavLink>
          </li>
          <li className="flex mmd:hidden">
            <NavLink
              to="/idea"
              style={navLinkStyles}
              className="flex items-center px-4 text-black no-underline text-lg pt-2"
            >
              Idea
            </NavLink>
          </li>
          <li className="flex mmd:hidden">
            <NavLink
              to="/submissionAdmin"
              style={navLinkStyles}
              className="flex items-center px-4 text-black no-underline text-lg pt-2"
            >
              Submission
            </NavLink>
          </li>
          <li className="flex mmd:hidden">
            <NavLink
              to="/contact"
              style={navLinkStyles}
              className="flex items-center px-4 text-black no-underline text-lg pt-2"
            >
              Contact
            </NavLink>
          </li>
          <button>
            <motion.img
              className="w-10 pt-2 items-center dropdown-toggle "
              data-toggle="dropdown"
              whileTap={{ scale: 1.2 }}
              src={logoUser}
              alt="user"
            />
            {!auth.users ? (
              <>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <NavLink className="pl-1  dropdown-item" to="/login">
                    Login
                  </NavLink>
                </div>
              </>
            ) : (
              <>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <NavLink className="pl-1  dropdown-item" to="/manageAdmin">
                    Managements
                  </NavLink>
                  <NavLink
                    className="pl-1  dropdown-item"
                    onClick={handleLogout}
                    to="/"
                  >
                    logout
                  </NavLink>
                </div>
              </>
            )}
          </button>
        </ul>
      </div>
      <hr />
    </header>
  );
};

export default HeaderAdmin;
