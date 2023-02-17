import React from "react";
import { Outlet } from "react-router-dom";
//
import Header from "./parts/Header.js";
import Footer from "./parts/Footer.js";

// scss
import "./App.css";
import "./assets/scss/app.scss";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <React.Fragment>
      <SnackbarProvider>
        <Header />
        <Outlet />
        <Footer />
      </SnackbarProvider>
    </React.Fragment>
  );
}

export default App;
