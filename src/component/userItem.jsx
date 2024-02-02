import React from "react";
import useHttp from "../hook/useFetch";
import ReplyItem from "./replyItem";
import {
  addLike,
  deleteComments,
  limitMinuses,
  limitPluses,
  onlyLimitMinus,
  onlyLimitPlus,
  removeLike,
} from "./store/action/action";
import { useDispatch, useSelector } from "react-redux";

const UserItem = ({
  id,
  content,
  createdAt,
  replies,
  score,
  user,
  limitPlus,
  limitMinus,
}) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);
  const { request } = useHttp();

  const addLikes = (id) => {
    if (limitMinus) {
      dispatch(onlyLimitMinus(id));
    } else {
      dispatch(limitPluses(id));
    }

    if (!limitPlus) {
      const findComment = data.filter((item) => item.id === id)[0];
      const changeLikes = {
        ...findComment,
        score: findComment.score + 1,
        limitPlus: true,
        limitMinus: false,
      };
      request(
        `http://localhost:3001/comments/${id}`,
        "PUT",
        JSON.stringify(changeLikes)
      ).then((data) => dispatch(addLike(id)));
    }
  };
  const removeLikes = (id) => {
    if (limitPlus) {
      dispatch(onlyLimitPlus(id));
    } else {
      dispatch(limitMinuses(id));
    }
    if (!limitMinus) {
      const findComment = data.filter((item) => item.id === id)[0];
      const removeLikess = {
        ...findComment,
        score:
          findComment.score > 0 ? findComment.score - 1 : findComment.score,
        limitMinus: true,
        limitPlus: false,
      };
      request(
        `http://localhost:3001/comments/${id}`,
        "PUT",
        JSON.stringify(removeLikess)
      ).then((data) => dispatch(removeLike(id)));
    }
  };
  const deleteComment = (id) => {
    const findComments = data.filter((item) => item.id === id);
    const deleteCommentt = {
      ...findComments,
    };
    request(
      `http://localhost:3001/comments/${id}`,
      "DELETE",
      JSON.stringify(deleteCommentt)
    ).then(() => dispatch(deleteComments(id)));
  };

  return (
    <div className="container">
      <div className="div">
        <div className="score">
          <i onClick={() => addLikes(id)} class="fas fa-plus"></i>
          <p>{score}</p>
          <i onClick={() => removeLikes(id)} class="fas fa-minus"></i>
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
                <div className="replies-btn">
                  <p className="you">you</p>
                  <span onClick={() => deleteComment(id)}>
                    <i class="delete fas fa-trash"></i>
                    Delete
                  </span>
                  <span>
                    <i class="edit fas fa-pen"></i> Edit
                  </span>
                </div>
              ) : (
                <i class="fas fa-reply">Reply</i>
              )}
            </p>
          </div>

          <p className="content">{content}</p>
        </div>
      </div>
      <div className="reply-item">
        {replies.map((item) => (
          <ReplyItem {...item} />
        ))}
      </div>
    </div>
  );
};

export default UserItem;
