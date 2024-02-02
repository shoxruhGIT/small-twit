import React, { useEffect, useState } from "react";
import useHttp from "../hook/useFetch";
import currentUss from "../images/avatars/image-juliusomo.png";
import { addComment } from "./store/action/action";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import moment from "moment";

const AddComment = () => {
  const { request } = useHttp();
  const [currentUs, setCurrentUs] = useState({});
  const [content, setContent] = useState();
  const dispatch = useDispatch();

  const addComments = (e) => {
    e.preventDefault();
    const newComment = {
      id: v4(),
      content: content,
      createdAt: moment().format("MMMM DD"),
      score: 0,
      user: {
        image: {
          png: "https://i.ibb.co/HB4w6Kb/image-juliusomo.png",
          webp: "https://i.ibb.co/HB4w6Kb/image-juliusomo.png",
        },
        username: "juliusomo",
      },
      replies: [],
      limitPlus: false,
      limitMinus: false,
    };

    request(
      "http://localhost:3001/comments",
      "POST",
      JSON.stringify(newComment)
    ).then(() => dispatch(addComment(content)));
  };

  useEffect(() => {
    request("http://localhost:3001/currentUser").then((data) =>
      setCurrentUs(data)
    );
  }, []);
  return (
    <form className="reply-form" onSubmit={addComments}>
      <img className="reply-img" src={currentUss} alt="" />
      <textarea
        className="reply-textarea"
        name=""
        id=""
        cols="50"
        rows="5"
        placeholder="Add a comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <input className="reply-btn" type="submit" value="Send" />
    </form>
  );
};

export default AddComment;
