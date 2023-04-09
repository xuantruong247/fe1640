import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import QAMenu from "../../../components/QAComponents/QAMenu";

const ManageIdeaQA = () => {
  const [ideaQA, setIdeaQA] = useState([]);

  const getAllIdeaQa = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/idea");
      setIdeaQA(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

const deleteIdeaQA = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:8080/admin/idea/${id}`)
    console.log(res.data);
    toast.success("Delete Idea Successfully")
    getAllIdeaQa()
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong")
  }
}

  useEffect(() => {
    getAllIdeaQa();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <QAMenu />
        </div>
        <div className="col-md-9">
          <h5>Manage Idea</h5>

          <div className="w-75 mt-3">
            <table className="table">
              <thead>
                <th>Title</th>
                <th>Content</th>
                <th>Description</th>
                <th>Like</th>
                <th>Dislike</th>
                <th>Action</th>
              </thead>
              <tbody>
                {ideaQA?.map((item, index) => (
                  <tr key={index}>
                    <>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                      <td>{item.desc}</td>
                      <td>{item.desc}</td>
                      <td>{item.desc}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteIdeaQA(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageIdeaQA;
