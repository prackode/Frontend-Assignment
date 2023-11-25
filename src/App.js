import React from "react";
import Base from "./components/Home/Base.js";
import { FormContextProvider } from "./FormContext.js";
const App = () => {
  return (
    <>
      <FormContextProvider>
        <Base />
      </FormContextProvider>
    </>
  );
};
export default App;
