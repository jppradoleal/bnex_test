import { ChakraProvider } from "@chakra-ui/react";
import { configure } from "axios-hooks";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { api } from "./services/api";

import "./global.scss";
import "./reset.scss";

configure({ axios: api });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
