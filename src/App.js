import React from "react";
import { Outlet } from "react-router-dom";
//
import Header from "./parts/Header.js";
import Footer from "./parts/Footer.js";

// scss
import "./App.css";
import "./assets/scss/app.scss";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <ToastContainer />
        <SnackbarProvider>
          <Header />
          <Outlet />
          <Footer />
        </SnackbarProvider>
      </Provider>
    </React.Fragment>
  );
}

export default App;
