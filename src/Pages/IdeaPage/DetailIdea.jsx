import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { GrView } from "react-icons/gr";

const DetailIdea = () => {
  const [ideaOne, setIdeaOne] = useState([]);
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
            <div>
              <p className="text-xl font-normal">
                Title:
                <span className="text-base font-light ">{ideaOne.title}</span>
              </p>
              <p className="text-xl font-normal">
                Category:
                <span className="text-base font-light">
                  {" "}
                  {ideaOne.category?.name}{" "}
                </span>
              </p>
              <p className="text-xl font-normal">
                Content:{" "}
                <span className="text-base font-light ">{ideaOne.content}</span>
              </p>
              <p className="text-xl font-normal">
                Submission{" "}
                <span className="text-base font-light ">
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
            style={{
              border: "none",
              borderBottom: "1px solid black",
              outline: "none",
              backgroundColor: "transparent",
              width: "89%",
            }}
          />
          <button className="btn btn-success mb-2 ml-2">Sent Comment</button>
        </div>

        {ideaOne.comments &&
          ideaOne.comments.map((item, index) => (
            <>
              <p className="d-flex " style={{ width: "1000px" }}>
                ( {moment(item.created_at).format("DD - MM - YYYY h:mm a")} ) -{" "}
                <span className="ml-2">{item.content}</span>
              </p>
            </>
          ))}
      </div>
    </div>
  );
};

export default DetailIdea;
