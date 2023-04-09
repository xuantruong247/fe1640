import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../LoginPage/style.css";
import axios from "axios";
import { toast } from "react-toastify";

const CreateUser = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [roleMap, setRoleMap] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/role")
      .then((res) => {
        console.log(res.data);
        setRoleMap(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/admin/user", {
        username,
        password,

        email,
        phone,
        role_id: role,
      });
      console.log(res.data);
      toast.success("Register Successfully");
      navigate("/manage-user-admin");
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
            <h1 className="text-2xl font-bold text-center">Create User</h1>
            <form
              onSubmit={Register}
              novalidate=""
              action=""
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div className="space-y-1 text-sm">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  className=" mt-3 w-full px-4 py-2 rounded-md border-gray-700 bg-white text-black"
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder=" Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className=" mt-3 w-full px-4 py-2 rounded-md border-gray-700 bg-white text-black"
                />
                {/* <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className=" mt-3 w-full px-4 py-2 rounded-md border-gray-700 bg-white text-black"
                />

                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className=" mt-3 w-full px-4 py-2 rounded-md border-gray-700 bg-white text-black"
                /> */}

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className=" mt-3 w-full px-4 py-2 rounded-md border-gray-700 bg-white text-black"
                />

                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  className=" mt-3 w-full px-4 py-2 rounded-md border-gray-700 bg-white text-black"
                />
                <select
                  className="mt-3 w-full px-4 py-2 rounded-md border-gray-700 bg-white text-black"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
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

export default CreateUser;
