import moment from "moment/moment";
import { v4 } from "uuid";

const initialState = {
  isLoading: "chat",
  data: [],
};
const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "chatFetching": {
      return {
        ...state,
        isLoading: "loading",
      };
    }
    case "chatFetched": {
      return {
        ...state,
        data: action.payload,
        isLoading: "loaded",
      };
    }
    case "addLike": {
      const changeLike = state.data.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            score: item.score + 1,
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
        data: changeLike,
      };
    }
    case "removeLike": {
      const removeLike = state.data.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            score: item.score > 0 ? item.score - 1 : item.score,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        data: removeLike,
      };
    }
    case "limitPlus": {
      const changeLimit = state.data.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            limitPlus: true,
            limitMinus: false,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        data: changeLimit,
      };
    }
    case "limitMinus": {
      const changeLimit = state.data.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            limitMinus: true,
            limitPlus: false,
          };
        } else {
          return item;
        }
      });

      return {
        ...state,
        data: changeLimit,
      };
    }
    case "onlyLimitPlus": {
      const changeOnlyLimits = state.data.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            limitPlus: false,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        data: changeOnlyLimits,
      };
    }
    case "onlyLimitMinus": {
      const changeOnlyLimits = state.data.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            limitMinus: false,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        data: changeOnlyLimits,
      };
    }
    case "addComment": {
      const newComment = {
        id: v4(),
        content: action.payload,
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

      return {
        ...state,
        data: [...state.data, newComment],
      };
    }
    case "deleteComment": {
      const deleteComment = state.data.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        data: deleteComment,
      };
    }
    case "addReplyLike": {
      const findReplyComment = state.data.map((item) => {
        const addReplyLike = item.replies.map((elem) => {
          if (elem.id === action.payload) {
            return {
              ...elem,
              score: elem.score + 1,
            };
          } else {
            return elem;
          }
        });

        return addReplyLike;
      })[0];

      const newComment = state.data.map((el) => {
        return {
          ...el,
          replies: findReplyComment,
        };
      });

      return {
        ...state,
        data: newComment,
      };
    }

    default:
      return state;
  }
};

export default chatReducer;
