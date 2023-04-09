import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const CarouselHome = () => {
  return (
    <div className='relative mmd:!h-[400px]'
      style={{
        backgroundImage:
          'url("https://accommodationforstudents.com/cdn-cgi/image/f=auto,q=85,w=960/https://images.accommodationforstudents.com/website/university-guides/gb/university-of-greenwich/uni.jpg")',
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
      }}
    >
      <div className="man-den mmd:!h-[400px]"></div>
      <div className="text-title flex flex-col justify-start">
        <h3 className="text-[20px] leading-[24px] items-start md:text-[40px] lg:text-[50px] md:leading-[50px]">Better digital experience with CMS Greenwich.</h3>
        <p className="text-[14px] leading-[20px] items-start md:text-[30px] lg:text-[30px] md:leading-[30px]">
          We are a team of talented designers making websites with my team.
        </p>
        <NavLink to='/idea'>
        <button type="button" className="btn btn-danger">
          Get Started!
        </button>
        </NavLink>
      </div>
    </div>
  );
};

export default CarouselHome;
