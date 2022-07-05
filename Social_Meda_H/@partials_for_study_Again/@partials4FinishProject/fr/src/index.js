import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const root = ReactDOM.createRoot(document.getElementById("root"));
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 2600,
  transition: transitions.SCALE,
};
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);
