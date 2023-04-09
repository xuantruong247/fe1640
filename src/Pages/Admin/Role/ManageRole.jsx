import React, { useEffect, useState } from "react";
import AdminMenu from "../../../components/AdminComponents/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const ManageRole = () => {
  const [role, setRole] = useState([]);
  const getAllRole = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/role");
      setRole(res.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const deleteRole = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/admin/role/${id}`);
      toast.success("Delete Role successfully");
      getAllRole();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRole();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h5>Manage Role</h5>
          <NavLink to="/create-role-admin">
            <button className="btn btn-success m-2">New Role</button>
          </NavLink>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {role?.map((item, index) => (
                  <>
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>
                        <NavLink to={`/update-role/admin/${item._id}`}>
                          <button className="btn btn-primary">Edit</button>
                        </NavLink>
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => {
                            deleteRole(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRole;
