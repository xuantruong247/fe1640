import React, { useEffect, useState } from "react";
import AdminMenu from "../../../components/AdminComponents/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const ManageIdea = () => {
  const [ideas, setIdeas] = useState([]);

  const getAllIdea = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/idea");
      setIdeas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIdea = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/admin/idea/${id}`);
      console.log(res.data);
      toast.success("Delete Idea successfully");
      getAllIdea();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllIdea();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
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
                {ideas?.map((item, index) => (
                  <tr key={index}>
                    <>
                      <td>{item.title}</td>
                      <td style={{ maxWidth: "350px", overflow: "auto" }}>
                        {item.content}
                      </td>
                      <td>{item.desc}</td>
                      <td>{item.desc}</td>
                      <td>{item.desc}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteIdea(item._id);
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

export default ManageIdea;
