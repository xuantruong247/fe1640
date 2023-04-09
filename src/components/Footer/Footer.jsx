import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { useAuth } from "../../context/auth";

const Footer = () => {
  const [auth] = useAuth();
  const checkAdmin = auth.users?.role?.name === "admin";
  const checkQa = auth.users?.role?.name === "QA";
  const checkUser = auth.users?.role?.name === "user";

  const checkRole = () => {
    if (checkAdmin) {
      return (
        <NavLink
          to="/submissionAdmin"
          className="text-white no-underline text-sm flex md:text-xl"
        >
          <AiOutlineRight className="pt-2 text-red-500" />
          <p>Submission</p>
        </NavLink>
      );
    }
    if (checkQa) {
      return (
        <NavLink
          to="/submissionQA"
          className="text-white no-underline text-sm flex md:text-xl"
        >
          <AiOutlineRight className="pt-2 text-red-500" />
          <p>Submission</p>
        </NavLink>
      );
    }
    if (checkUser) {
      return <a href="/submission">Back to list</a>;
    }
  };

  return (
    <footer className="py-6 bg-black text-white md:flex justify-center">
      <div className="xl:container mx-[30px] md:overflow-hidden msm:overflow-hidden">
        <div className="grid grid-cols-12 md:flex md:justify-between">
          <NavLink
            to="/"
            className="pb-6 col-start-1 col-span-full md:pb-0 md:col-span-6 text-2xl md:text-3xl no-underline text-white"
          >
            IDEA GREENWICH
          </NavLink>
          <div className="col-start-1 col-span-5 md:text-left md:col-span-3 mx-[10px]">
            <p className="pb-1 text-base md:text-2xl font-medium text-red-600">
              GreenWich Viet Nam
            </p>
            <ul className="px-0">
              <li>
                <p className="text-white no-underline text-sm md:text-xl">
                  No. 20 Cong Hoa, Ward 12, Tan Binh District, Ho Chi Minh City
                </p>
              </li>
              <li>
                <p
                  to="/idea"
                  className="text-white no-underline text-sm md:text-xl"
                >
                  Hotline: 028.7300.2266
                </p>
              </li>
              <li>
                <p
                  to="/submision"
                  className="text-white no-underline text-sm md:text-xl"
                >
                  Phone: 0933.108.554
                </p>
              </li>
              <li>
                <p
                  to="/contact"
                  className="text-white no-underline text-sm md:text-xl"
                >
                  Email: group18@example.com
                </p>
              </li>
            </ul>
          </div>

          <div className=" col-start-8 col-span-5 md:col-span-3 mx-[10px]">
            <p className="pb-1 text-sm md:text-2xl font-medium text-red-600">
              Userful Links
            </p>
            <ul className="px-0 text-left sm:text-right">
              <li className="">
                <NavLink
                  to="/"
                  className="text-white no-underline flex text-sm md:text-xl"
                >
                  <AiOutlineRight className="pt-2 text-red-500" />
                  <p className="">Home</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/idea"
                  className="text-white no-underline text-sm flex md:text-xl"
                >
                  <AiOutlineRight className="pt-2 text-red-500" />
                  <p>Idea</p>
                </NavLink>
              </li>
              <li>{checkRole()}</li>
              <li>
                <NavLink
                  to="/contact"
                  className="text-white no-underline text-sm flex md:text-xl"
                >
                  <AiOutlineRight className="pt-2 text-red-500" />
                  <p>Contact</p>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
