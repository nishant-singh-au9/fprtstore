import { StrictMode } from "react";
import ReactDOM from "react-dom";

import Routing from "./routing";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Routing />
  </StrictMode>,
  rootElement
);
