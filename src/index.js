import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
import Footer from "./layout/Footer"
import Header from "./layout/Header"
import './index.css';
// import store from "./store";
import App from './App';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
