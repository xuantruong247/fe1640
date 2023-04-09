import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateRole = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/admin/role", {
        name,
        desc,
      });
      toast.success("Create Role Successfully");
      navigate("/manage-role-admin");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

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
            <h1 className="text-2xl font-bold text-center">Create Role</h1>
            <form
              onSubmit={handleCreate}
              novalidate=""
              action=""
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div className="space-y-1 text-sm">
                <label for="username" className="block dark:text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="w-full px-4 py-3 rounded-md border-gray-700 bg-white text-black"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label for="password" className="block dark:text-gray-400">
                  Description
                </label>
                <input
                  type="text"
                  name="Description"
                  id="desc"
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  placeholder="Description"
                  className="w-full px-4 py-3 rounded-md dark:border-gray-700 bg-white text-black"
                />
              </div>
              <button
                type="submit"
                className="block w-full p-3 font-medium text-center rounded-sm text-gray-900 bg-blue-500"
              >
                Create Role
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;
