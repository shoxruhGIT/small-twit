import React from "react";
import ReactDOM from "react-dom/client";
import "./App.scss";
import { Provider} from "react-redux";
import App from "./App";
import { createStore } from "redux";
import chatReducer from "./component/store/reducer/reducer";


const store = createStore(chatReducer)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);
