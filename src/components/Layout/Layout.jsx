import React from "react";
import Header from "../Header/Header";
import Routers from "../../routers/Routers";
import Footer from "../Footer/Footer";
import { useAuth } from "../../context/auth";
import HeaderAdmin from "../Header/HeaderAdmin";
import HeaderQA from "../Header/HeaderQA";

const Layout = () => {
  const [auth] = useAuth();


  return (
    <>
      <header>
        {!auth.users?.role.name && <Header />}
        {auth.users?.role?.name === "admin" && <HeaderAdmin />}
        {auth.users?.role?.name === "QA" && <HeaderQA />}
        {auth.users?.role?.name === "user" && <Header />}
      </header>
      <div>
        <Routers />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
