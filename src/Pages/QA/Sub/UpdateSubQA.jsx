import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateSubQA = () => {
  // const [updateName, setUpdateName] = useState("");
  const [updateDeadline_1, setUpdateDeadline_1] = useState("");
  const [updateDeadline_2, setUpdateDeadline_2] = useState("");
  const [submissionMap, setSubmissionMap] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `http://localhost:8080/admin/submission/${id}`,
        {
          // name: updateName,
          deadline_1: updateDeadline_1,
          deadline_2: updateDeadline_2,
        }
      );
      navigate("/manage-sub-QA");
    } catch (error) {
      console.log(error);
    }
  };

  const getFineOneSub = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/admin/submission/${id}`
      );
      setSubmissionMap(res.data);
      console.log(res.data);
      toast.success("das");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFineOneSub();
  }, []);

  return (
    <div className="container">
      <h3>Update Submission</h3>
      <hr />
      <div className="w-1/3">
        <form
          className="bg-white rounded pt-6 pb-8 mb-4"
          onSubmit={handleUpdate}
        >
          <div className="mb-4">
            <label className="block text-black text-base " for="name">
              Name
            </label>
            <input
              className=" border-2 rounded w-full text-black py-1 "
              type="text"
              id="name"
              defaultValue={submissionMap?.name}
              readOnly
            />

            <label className="block text-black text-base mt-2" for="dealine_1">
              Deadline_1
            </label>
            <input
              className=" border-2 rounded w-full text-black py-1 "
              type="datetime-local"
              id="dealine_1"
              value={updateDeadline_1}
              onChange={(e) => {
                setUpdateDeadline_1(e.target.value);
              }}
            />
            <label className="block text-black text-base mt-2" for="dealine_2">
              Deadline_2
            </label>
            <input
              className=" border-2 rounded w-full text-black py-1 "
              type="datetime-local"
              id="dealine_2"
              value={updateDeadline_2}
              onChange={(e) => {
                setUpdateDeadline_2(e.target.value);
              }}
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
              type="submit"
            >
              Update Submission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSubQA;
