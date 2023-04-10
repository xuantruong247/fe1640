import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from 'react-bootstrap/Pagination';
import { saveAs } from "file-saver";
const JSZip = require("jszip");


const SubmissionQA = () => {
  const [submission, setSubmission] = useState([]);
  const [dataZip, setDataZip] = useState([]);
  const [idea, setIdea] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const XLSX=require('xlsx');
  const getAllSub = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/submission?page=${currentPage}&limit=${pageSize}`);
      setSubmission(res.data.docs);

    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSub();
  }, [currentPage, pageSize]);
  const convertJsonToExcel=()=>{
    const worksheet=XLSX.utils.json_to_sheet(dataZip);
    const workBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook,worksheet,"idea")
    XLSX.write(workBook,{bookType:'xlsx',type:"buffer"})
    XLSX.write(workBook,{bookType:'xlsx',type:"binary"})
    XLSX.writeFile(workBook,"ideaData.xlsx")
  }
  const isDeadlineExpired = (deadline) => {
    return moment(deadline).isBefore(moment());
  };
  const getSubId = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/user/idea/${id}`);
      const arrUrl = res.data.map(item => item.image.url);
      const arrName = res.data.map(item => item.title); // Lấy ra tên của từng idea
      const zip = new JSZip();
      try {
        const responses = await Promise.all(
          arrUrl.map((url) =>
            axios.get(url, {
              responseType: "arraybuffer",
            })
          )
        );
        for (let i = 0; i < responses.length; i++) {
          const response = responses[i];
          const data = await response.data;
          const filename = arrName[i]; // Lấy tên của từng idea
          const imgZip = new JSZip();
          imgZip.file(`${filename}.png`, data); // Đặt tên file zip theo tên idea
          const content = await imgZip.generateAsync({ type: "blob" });
          saveAs(content, `${filename}.zip`); // Tải xuống file zip cho từng ảnh
          zip.file(`${filename}.zip`, content);
        }
        const allContent = await zip.generateAsync({ type: "blob" });
        saveAs(allContent, "SubFile.zip");
      } catch (error) {
        console.error("Failed to download files and create zip:", error);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
    <div className="container mb-28 grid grid-cols-3 gap-4 row-span-2  mlg:grid-cols-2 mmd:grid-cols-1 mmd:max-w-md">
      <div className="flex justify-end row-start-1 col-span-3"></div>
      {submission?.map((item, index) => (
        <div
          key={index}
          style={{
            color: moment(item.deadline_2).isBefore(moment()) ? "red" : "black",
          }}
          className="max-w-sm rounded overflow-hidden shadow-lg mb-[30px] m-auto"
        >
          <div className="px-6 py-4 text-center">
            <img
              className="w-full"
              src="https://cms.greenwich.edu.vn/pluginfile.php/1/theme_adaptable/frontpagerendererdefaultimage/1671766848/edu-survey-landing-image.jpg"
              alt="logoSub"
            />
            <div className="font-bold text-xl mb-2">Name: {item.name}</div>
            <p
              className={
                isDeadlineExpired(item.deadline_1)
                  ? "text-red-500 d-flex font-normal"
                  : "text-black d-flex font-normal"
              }
            >
              Deadline:{" "}
              {moment(item.deadline_1).format("DD - MM - YYYY h:mm a")}
            </p>
            <p
              className={
                isDeadlineExpired(item.deadline_2)
                  ? "text-red-500 d-flex font-normal"
                  : "text-black d-flex font-normal"
              }
            >
              Deadline:{" "}
              {moment(item.deadline_2).format("DD - MM - YYYY h:mm a")}
            </p>

            <div className="flex justify-center">
              <NavLink to={`/listidea/${item._id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
                  View Ideas
                </button>
              </NavLink>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-2 "
              onClick={() => getSubId(item._id)}>
                Export ZIP
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-2"
                onClick={() => convertJsonToExcel(item._id)}
              >
                Export Excel
              </button>
            </div>
          </div>
        </div>
      ))}
      
    </div>
    <div className="text-center text-2xl mb-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <AiFillLeftCircle />
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="ml-2"
          >
            <AiFillRightCircle />
          </button>
        </div>
    </>
  );
};

export default SubmissionQA;
