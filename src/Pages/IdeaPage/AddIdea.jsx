import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddIdea = () => {
  const [auth] = useAuth();
  const checkAdmin = auth.users?.role?.name === "admin";
  const checkQa = auth.users?.role?.name === "QA";
  const checkUser = auth.users?.role?.name === "user";

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  // Form data để lưu rồi lát bỏ này zô body  title, desc, submission_id, content, category_id
  const [ideaInfo, setIdeaInfo] = useState({
    title: "",
    desc: "",
    submission_id: id,
    content: "",
    category_id: "",
    avatar: "",
  });
  //Biến để ref với cái form.
  const { title, desc, submission_id, content, category_id, avatar } = ideaInfo;
  // Khi m change dât trong cái biến nó set giá trị vô cái form
  const onChangeUserInfo = (event) =>
    setIdeaInfo({
      ...ideaInfo,
      [event.target.name]: event.target.value,
    });

  //Đổi cái hình up lên thành báe64
  const fileToBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  };
  //Khi chọn cái hình
  const onUploadFileChange = ({ target }) => {
    if (target.files < 1 || !target.validity.valid) {
      return;
    }
    var preview = document.getElementById("img-review");
    var reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
    };
    const file = target.files[0];
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }

    fileToBase64(file, (err, result) => {
      if (result) {
        setIdeaInfo({
          ...ideaInfo,
          avatar: file,
        });
      }
    });
  };
  //KHi nhấm submit
  const onSubmitUpdateProfile = async (event) => {
    event.preventDefault();
    // setUpdateLoading(true);
    console.log(ideaInfo);

    var bodyFormData = new FormData();
    bodyFormData.append("info", JSON.stringify(ideaInfo));
    bodyFormData.append("avatar", avatar);

    const response = await axios.post(
      `http://localhost:8080/user/idea`,
      bodyFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkOGUzNTRiYTQ5N2FhZjViNWJkZGUiLCJpYXQiOjE2ODA3Nzc3OTJ9.7h0kkIlzzi2WF_7_2ET0QcBflGh3xZHb2r-qbDsaPV0",
        },
      },
      toast.success("Create Idea Successfully"),
      navigate("/idea")
    );
    console.log(response);
  };

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    console.log(auth);

    setAccessToken(auth?.accessToken);

    axios
      .get("http://localhost:8080/admin/category")
      .then((res) => {
        setCategories(res.data);
        const categories = res.data || [];
        setIdeaInfo({ ...ideaInfo, category_id: categories[0]?._id });
      })
      .catch((err) => {
        console.log(err);
      });
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

  const handleCategoryChange = (event) => {
    console.log(event.target);
    setIdeaInfo({ ...ideaInfo, category_id: event.target.value });
  };

  return (
    <div className="container">
      <h3>Add Idea</h3>
      <div className="w-1/3">
        <form
          className="bg-white rounded pt-6 pb-8 mb-4"
          onSubmit={onSubmitUpdateProfile}
        >
          <div className="mb-4">
            <label className="block text-black text-base " htmlFor="title">
              Title
            </label>
            <input
              className=" border-2 rounded w-full text-black py-1 "
              type="text"
              value={title}
              name="title"
              onChange={onChangeUserInfo}
            />
            <label className="block text-black text-base mt-2" htmlFor="brief">
              Description
            </label>
            <input
              className=" border-2 rounded w-full text-black py-1 "
              type="text"
              value={desc}
              name="desc"
              onChange={onChangeUserInfo}
            />
            <label
              className="block text-black text-base mt-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              rows="4"
              className=" border-2 rounded w-full text-black py-1 "
              type="text"
              value={content}
              name="content"
              onChange={onChangeUserInfo}
            />

            <label className="block text-black text-base mt-2" for="file">
              File
            </label>
            <input
              name="avatar"
              accept="image/*"
              onChange={onUploadFileChange}
              className=" border-2 rounded w-full text-black "
              type="file"
            />

            <label className="block text-black text-base mt-2">Category</label>
            <select
              onChange={handleCategoryChange}
              value={category_id}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   placeholder-gray-400 "
            >
              {categories?.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
              type="submit"
            >
              Create
            </button>
            <br />
            <div>{checkRole()}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIdea;
