import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FormContextProvider } from "./FormContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <FormContextProvider>
      <App />
    </FormContextProvider>
  </>
);
