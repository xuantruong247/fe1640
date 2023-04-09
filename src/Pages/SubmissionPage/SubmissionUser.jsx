import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import Pagination from 'react-bootstrap/Pagination';

const SubmissionPage = () => {
  const [submission, setSubmission] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const getAllSub = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/submission?page=${currentPage}&limit=${pageSize}`);
      setSubmission(res.data.docs);
      // console.log(res.data.docs);
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

  const isDeadlineExpired = (deadline) => {
    return moment(deadline).isBefore(moment());
  };

  useEffect(() => {
    getAllSub();
  }, [currentPage, pageSize]);

  return (
    <>
    <div className="container mb-28 grid grid-cols-3 gap-4  mlg:grid-cols-2 mmd:grid-cols-1 mmd:max-w-md">
      {submission?.map((item, index) => (
        <div
          key={index}
          style={{
            color: moment(item.deadline_2).isBefore(moment()) ? "red" : "black",
          }}
          className="max-w-sm rounded overflow-hidden shadow-lg mb-[30px] m-auto"
        >
          <div className="px-6 py-4 text-center  ">
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
            <NavLink to={`/listIdea/${item._id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-full rounded-full mt-2">
                View Ideas
              </button>
            </NavLink>
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

export default SubmissionPage;
