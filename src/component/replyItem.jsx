import React, { useEffect, useState } from "react";
import useHttp from "../hook/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addReplyLikes } from "./store/action/action";

const ReplyItem = ({ id, score, user, createdAt, replyingTo, content }) => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);
  const [parentId, setId] = useState();

  useEffect(() => {
    const findId = data.map((item) => {
      if (item.id !== id) {
        setId(item.id);
      }
    });
  }, []);

  const addReplyLike = (id) => {
    const findReplyComments = data.map((item) => {
      const addReplyLike = item.replies.map((elem) => {
        if (elem.id === id) {
          return {
            ...item,
            score: item.score + 1,
          };
        }else{
          return elem
        }
      });
      return addReplyLike;
    });

    const newReplyComment = data.map((el, index) => {
      return {
        ...el,
        replies: findReplyComments,
      };
    });

    const parentLike = newReplyComment.filter((item) => item.id === parentId);
  
    request(
      `http://localhost:3001/comments/${parentId}`,
      "PUT",
      JSON.stringify(parentLike[0])
    );

    dispatch(addReplyLikes(id));
  };

  return (
    <div className="div reply">
      <p className="p"></p>
      <div className="score">
        <i onClick={() => addReplyLike(id)} class="fas fa-plus"></i>
        <p>{score}</p>
        <i class="fas fa-minus"></i>
      </div>
      <div className="item">
        <div className="item-info">
          <div className="i_info">
            <img src={user.image.webp} alt="rasm" />

            <p className="username">{user.username}</p>
            <p className="time">{createdAt}</p>
          </div>
          <p className="icon">
            {user.username === "juliusomo" ? (
              <div className="acc-icon">
                <p className="you">you</p>
                <i class="delete fas fa-trash">Delete</i>
                <i class="edit fas fa-pen">Edit</i>
              </div>
            ) : (
              <i class="fas fa-reply">Reply</i>
            )}
          </p>
        </div>

        <p className="reply-content content">
          <span className="replyTo">@{replyingTo} </span>
          {content}
        </p>
      </div>
    </div>
  );
};

export default ReplyItem;
