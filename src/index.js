import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./reduxToolkit";
import { Provider } from "react-redux";
import { AuthProvider } from "./contexts/authContext";
import { AvatarProvider } from "./contexts/avatarContext";
import { UserProvider } from "./contexts/userContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <BrowserRouter>
      <AuthProvider>
         <AvatarProvider>
            <Provider store={store}>
               <UserProvider>
                  <App />
               </UserProvider>
            </Provider>
         </AvatarProvider>
      </AuthProvider>
   </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
