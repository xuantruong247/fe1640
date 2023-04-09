import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { GrView } from "react-icons/gr";

const DetailIdea = () => {
  const [ideaOne, setIdeaOne] = useState([]);
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const getFindOne = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/idea/${id}`);
      setIdeaOne(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const token = JSON.parse(localStorage.getItem("auth")).accessToken;

  const handleComment = async (id) => {
    try {
      const res = await axios({
        method: "post",
        url: `http://localhost:8080/auth/comments/${id}`,
        headers: {
          "x-access-token": `${token}`,
        },
        data: { content: comment },
      });
      setComment("");
      toast.success("Comment success");
      getFindOne();
    } catch (error) {
      console.log(error);
      toast.error("Comment err");
    }
  };

  useEffect(() => {
    getFindOne();
  }, []);

  return (
    <div className="container">
      <div>
        <h1>Detail Idea</h1>
        <a href="/idea">Back to list Idea</a>
        <hr />
      </div>
      <div className="grid grid-cols-12">
        <div
          className="col-span-5 h-[400px] "
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <img src={ideaOne?.image?.url} alt="" width={"400px"} />
        </div>
        <div className="col-span-7 h-[420px] relative">
          <div
            className="flex flex-col justify-between pl-4"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <div className="my-2">
              <p className="text-xl font-normal">
                Title:
                <span className="text-base font-light pl-2 ">
                  {ideaOne.title}
                </span>
              </p>
              <p className="text-xl font-normal">
                Category:
                <span className="text-base font-light pl-2">
                  {ideaOne.category?.name}
                </span>
              </p>
              <p
                className="text-xl font-normal"
                style={{ maxHeight: "250px", overflow: "auto" }}
              >
                Content:
                <span className="text-base font-light pl-2 ">
                  {ideaOne.content}
                </span>
              </p>
              <p className="text-xl font-normal">
                Submission:
                <span className="text-base font-light pl-2 ">
                  {ideaOne.submission?.name}
                </span>
              </p>
              <p className="d-flex">
                <GrView className="mt-1 mx-1" /> {ideaOne?.views?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div id="cmt" className="mx-2 pt-10 col-span-12">
          <hr />
          <label className="block text-black text-base mt-2" htmlFor="content">
            Your Comment
          </label>
          <input
            type="Text"
            placeholder="Enter Your Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              border: "none",
              borderBottom: "1px solid black",
              outline: "none",
              backgroundColor: "transparent",
              width: "88%",
            }}
          />
          <button
            className="btn btn-success mb-2 ml-2"
            onClick={() => handleComment(id)}
          >
            Send Comment
          </button>
        </div>
        {ideaOne.comments &&
          ideaOne.comments.map((item, index) => (
            <>
            <div className="flex flex-row col-span-12">
              <p className=" " 
              // style={{ width: "1000px" }}
              >
                  ( {moment(item.created_at).format("DD - MM - YYYY h:mm a")} ) -{" "}
                  <span className="ml-2">{item.content}</span>
                </p>
            </div>
            <hr  className="col-span-12"/>

            </>
          ))}
      </div>
    </div>
  );
};

export default DetailIdea;
