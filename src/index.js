import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "Root";
import App from "components/App";

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Root>,
  document.querySelector("#root")
);

//----------------------------------------------------------------------------------------------------------------------
//We create a separate root file and write provider, store related codes is just to avoid
// them being imported in eact test files
//----------------------------------------------------------------------------------------------------------------------
//In react-router-dom v6, "Switch" is replaced by routes "Routes" and component was changed to element in v6.
//----------------------------------------------------------------------------------------------------------------------
//If we name a file starting with a lower case thats going to indicate that we are going to export a function by default
//Similarly if we name a file startng with upper case it indicates it is gng to export a class ny default.

