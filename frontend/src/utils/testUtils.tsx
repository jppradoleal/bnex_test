import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

interface IThemeWrapperProps {
  children: React.ReactElement;
}

export const ThemeWrapper = ({ children }: IThemeWrapperProps) => (
  <BrowserRouter>
    <ChakraProvider>{children}</ChakraProvider>
  </BrowserRouter>
);
