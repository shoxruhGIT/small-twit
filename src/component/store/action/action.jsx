const chatFetching = () => {
  return {
    type: "chatFetching",
  };
};
const chatFetched = (id) => {
  return {
    type: "chatFetched",
    payload: id,
  };
};
const addLike = (id) => {
  return {
    type: "addLike",
    payload: id,
  };
};
const removeLike = (id) => {
  return {
    type: "removeLike",
    payload: id,
  };
};
const limitPluses = (id) => {
  return {
    type: "limitPlus",
    payload: id,
  };
};
const limitMinuses = (id) => {
  return {
    type: "limitMinus",
    payload: id,
  };
};
const onlyLimitPlus = (id) => {
  return {
    type: "onlyLimitPlus",
    payload: id,
  };
};
const onlyLimitMinus = (id) => {
  return {
    type: "onlyLimitMinus",
    payload: id,
  };
};
const addComment = (msg) => {
  return {
    type: "addComment",
    payload: msg,
  };
};
const deleteComments = (id) => {
  return {
    type: "deleteComment",
    payload: id,
  };
};
const addReplyLikes = (id) => {
  return {
    type: "addReplyLike",
    payload: id,
  };
};

export {
  chatFetching,
  chatFetched,
  addLike,
  removeLike,
  limitPluses,
  limitMinuses,
  onlyLimitPlus,
  onlyLimitMinus,
  addComment,
  deleteComments,
  addReplyLikes
};
