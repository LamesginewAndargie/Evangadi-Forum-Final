import React, { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosBase from "../../Components/config/axios";
import { FaArrowRight } from "react-icons/fa";
import { AppState } from "../../App";
import "./question.css";

const NewQuestion = () => {
   const token = localStorage.getItem("token");
  const [error,setError] = useState("white")
  const { user } = useContext(AppState);
  const navigate = useNavigate();
  const titleRef = useRef();
  const questionRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value.trim();
    const description = questionRef.current.value.trim();

    if (!title || !description) {
      setError("red")
      return;
    }
  
    try {
       
      const data = await axiosBase.post(
        "/question",
        { title:title,description:description },
        {
          headers: { Authorization: `Bearer ${token}` }, // Use token from context
        }
      );
      // console.log(data);
      // titleRef.current.value = "";
      // questionRef.current.value = "";
      navigate("/");
    } catch (err) {
      console.log("Problem:", err.response?.data?.msg || err.message);
      alert(err.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <section className="container body-no-bg">
      <div className="d-flex flex-column my-5 left-corner">
        <h3 className="h3">Steps To Write A Good Question.</h3>
        <div className="headline_border"></div>
        <ul className="list-unstyled">
          <li>
            <FaArrowRight className="arrow-icon" />
            Summarize your question in a one-line title.
          </li>
          <li>
            <FaArrowRight className="arrow-icon" />
            Describe your problem in more detail.
          </li>
          <li>
            <FaArrowRight className="arrow-icon" />
            Describe what you tried and what you expected to happen.
          </li>
          <li>
            <FaArrowRight className="arrow-icon" />
            Review your question and post it to the site.
          </li>
        </ul>
      </div>
      <div className="container" style={{ width: "90%" }}>
        <div className="text-center font-weight-bold mb-4">
          <h3 className="h3">Post Your Question</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              style={{
                border: `2px solid 
                ${error}`,
              }}
              ref={titleRef}
              className="form-control mb-3 title"
              maxLength="200"
              type="text"
              name="title"
              placeholder="Question title"
            />
            <textarea
              style={{
                border: `2px solid 
                ${error}`,
              }}
              ref={questionRef}
              className="form-control mb-32 desc"
              maxLength="255"
              name="description"
              placeholder="Question Detail ..."
            />
            <button className="btn btn-lg btn-primary" type="submit">
              Post Your Question
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewQuestion;
