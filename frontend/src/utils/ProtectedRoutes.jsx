import { Outlet, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { sessionData } from "../hooks/sessionData";

function ProtectedRoutes() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, isTimeExpired, data } =
    sessionData();

  useEffect(() => {
    const checkSession = () => {
      // if (!toastShown.current) {
      //   toast("Session Timeout!", {
      //     duration: 4000,
      //     position: "top-center",
      //     style: {},
      //     className: "",
      //     // icon: "❗",
      //     iconTheme: {
      //       primary: "#000",
      //       secondary: "#fff",
      //     },
      //     ariaProps: {
      //       role: "status",
      //       "aria-live": "polite",
      //     },
      //   });
      // }
      if (data) {
        setIsAuthenticated(data?.isAuthenticated);

        if (isTimeExpired) {
          sessionStorage.clear();
          sessionStorage.removeItem("token");
          navigate("loginPage");
        }
      } else {
        console.error("No session found! ");
        console.error("NOTICE: YOU NEED TO LOGIN FIRST");
      }
    };

    setTimeout(() => {
      checkSession();
    }, 0);

    return () => clearTimeout(checkSession);
  }, [data]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/loginPage" />;
}

export default ProtectedRoutes;
