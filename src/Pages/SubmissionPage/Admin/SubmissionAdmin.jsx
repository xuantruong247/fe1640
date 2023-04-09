import Pagination from 'react-bootstrap/Pagination';
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import FileSaver from "file-saver"
import { saveAs } from "file-saver";
const JSZip = require("jszip");


const SubmissionAdmin = () => {
  const [submission, setSubmission] = useState([]);
  const [dataZip, setDataZip] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [arrUrl, setArrUrl] = useState([]);
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
      setDataZip(res.data);
      exportZip(dataZip);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  const exportZip = async () => {
    const arrUrl = dataZip.map(item => item.image.url);
      setArrUrl(arrUrl)
      console.log(arrUrl);
    const zip = new JSZip();
    // const zipFiles = [];

    // for (const url of arrUrl) {
    //   const response = await axios.get(url, { responseType: "arraybuffer" });
    //   const data = await response.data;
    //   const filename = url.substring(url.lastIndexOf("/") + 1);
    //   const zip = new JSZip();
    //   zip.file(filename, data);
    //   const content = await zip.generateAsync({ type: "arrayBuffer" });
    //   zipFiles.push(content);
    // }
    // const zip = new JSZip();

    // const imagesFolder = zip.folder("images");
    // console.log(imagesFolder);

    // for (const zipFile of zipFiles) {
    //   const blob = await zipFile.blob();
    //   const filename = "file_" + Date.now() + ".zip";
    //   imagesFolder.file(filename, blob);
    // }
    // const content = await zip.generateAsync({ type: "arrayBuffer" });
    // const blob = new Blob([content], { type: "application/zip" });
    // saveAs(blob, "all_images.zip");

    try {
      const responses = await Promise.all(
        arrUrl.map((url) =>
          axios.get(url, {
            responseType: "arraybuffer",
          })
        )
      );
      let i = 0;
      for (const response of responses) {
        const data = await response.data;
        const filename = arrUrl[i].substring(arrUrl[i].lastIndexOf("/") + 1);
        const zip = new JSZip();
        zip.file(filename, data);
        const content = await zip.generateAsync({ type: 'blob' });
        // zipFiles.push(content);
        saveAs(content, "images.zip");
        i++;
      }
      // const content = await zip.generateAsync({ type: "blob" });
      // console.log(zipFiles);
    } catch (error) {
      console.error("Failed to download files and create zip:", error);
    }
  };
  return (
    <>
    <div className="container mb-28 grid grid-cols-3 gap-4 row-span-2  mlg:grid-cols-2 mmd:grid-cols-1 mmd:max-w-md">
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
              <NavLink to={`/listIdea/${item._id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
                  View Ideas
                </button>
              </NavLink>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-2 "
                onClick={() => getSubId(item._id)}
              >
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
    <Pagination>
    {/* <Pagination.First /> */}
    <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
    {/* <Pagination.Item>{1}</Pagination.Item>
    <Pagination.Ellipsis />

    <Pagination.Item>{10}</Pagination.Item>
    <Pagination.Item>{11}</Pagination.Item>
    <Pagination.Item active>{12}</Pagination.Item>
    <Pagination.Item>{13}</Pagination.Item>
    <Pagination.Item disabled>{14}</Pagination.Item>

    <Pagination.Ellipsis />
    <Pagination.Item>{20}</Pagination.Item> */}
    <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
    {/* <Pagination.Last /> */}
  </Pagination>
  </>
  );
};
export default SubmissionAdmin;
