import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";

const ListIdea = () => {
  const [auth] = useAuth();
  const checkAdmin = auth.users?.role?.name === "admin";
  const checkQa = auth.users?.role?.name === "QA";
  const checkUser = auth.users?.role?.name === "user";
  const [submissison, setSubmission] = useState([]);
  const { id } = useParams();
  console.log(id);

  const getFindoneSub = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/admin/submission/${id}`
      );
      toast.success("ok");
      console.log(res.data);
      setSubmission(res.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getFindoneSub();
  }, []);

  const checkRole = () => {
    if (checkAdmin) {
      return <a href="/submissionAdmin">Back to list</a>;
    }
    if (checkQa) {
      return <a href="/submissionQA">Back to list</a>;
    }
    if (checkUser) {
      return <a href="/submission">Back to list</a>;
    }
  };

  const isDeadlineExpired = (deadline) => {
    return moment(deadline).isBefore(moment());
  };

  return (
    <div>
      <div
        className="container"
        style={{
          height: "100vh",
        }}
      >
        <h1>List ideas</h1>
        <div className="grid grid-cols-5">
          <div className="col-span-1 font-bold text-lg leading-3">
            <p>Name:</p>
            <p>Dealine_1</p>
            <p>Dealine_2: </p>
          </div>
          <div className="col-span-3 leading-3">
            <p>{submissison.name}</p>
            <p
              className={
                isDeadlineExpired(submissison.deadline_1)
                  ? "text-red-500"
                  : "text-black"
              }
            >
              {moment(submissison.deadline_1).format("DD - MM - YYYY h:mm a")}
            </p>
            <p
              className={
                isDeadlineExpired(submissison.deadline_2)
                  ? "text-red-500"
                  : "text-black"
              }
            >
              {moment(submissison.deadline_2).format("DD - MM - YYYY h:mm a")}
            </p>
          </div>
        </div>
        {!isDeadlineExpired(submissison.deadline_1) && (
          <NavLink to={`/addIdea/${id}`}>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Add Idea
          </button>
          </NavLink>
        )}

        <div>{checkRole()}</div>
      </div>
    </div>
  );
};

export default ListIdea;
