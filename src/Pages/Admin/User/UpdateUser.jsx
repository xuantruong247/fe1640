import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../LoginPage/style.css";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const [userMap, setUserMap] = useState([]);
  const [roleMap, setRoleMap] = useState([]);
  const { id } = useParams();
  const [updateRole, setUpdateRole] = useState("");
  const navigate = useNavigate();

  const getFindoneUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/user/${id}`);
      setUserMap(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getAllRole = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/role");
      console.log(res.data);
      setRoleMap(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`http://localhost:8080/admin/user/${id}`, {
        role_id: updateRole,
      });
      console.log(res.data);
      toast.success("Update User Successfully");
      navigate("/manage-user-admin");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getFindoneUser();
    getAllRole();
  }, []);

  return (
    <div
      style={{
        backgroundImage:
          'url("https://accommodationforstudents.com/cdn-cgi/image/f=auto,q=85,w=960/https://images.accommodationforstudents.com/website/university-guides/gb/university-of-greenwich/uni.jpg")',
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <div className="man-den"></div>
      <div className="login-title">
        <div className="my-[20px] flex items-center justify-center">
          <div className="w-full  max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
            <h1 className="text-2xl font-bold text-center">Create User</h1>
            <form
              novalidate=""
              action=""
              className="space-y-6 ng-untouched ng-pristine ng-valid"
              onSubmit={handleUpdate}
            >
              <div className="space-y-1 text-sm">
                <input
                  type="text"
                  name="username"
                  id="username"
                  readOnly
                  defaultValue={userMap.username}
                  className=" mt-3 w-full px-4 py-2 rounded-md border-gray-700 bg-white text-black"
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  readOnly
                  defaultValue={userMap?.profile?.email}
                  className=" mt-3 w-full px-4 py-2 rounded-md border-gray-700 bg-white text-black"
                />
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  readOnly
                  defaultValue={userMap?.profile?.phone}
                  className=" mt-3 w-full px-4 py-2 rounded-md border-gray-700 bg-white text-black"
                />
                <select
                  className="mt-3 w-full px-4 py-2 rounded-md border-gray-700 bg-white text-black"
                  value={updateRole}
                  onChange={(role) => {
                    setUpdateRole(role.target.value);
                  }}
                >
                  <option>Choose Role</option>
                  {roleMap?.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="block w-full p-3 font-medium text-center rounded-sm text-gray-900 bg-blue-500"
              >
                Create User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
