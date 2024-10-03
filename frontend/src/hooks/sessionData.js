import { useState } from "react";

export const sessionData = () => {
  const token = sessionStorage.getItem("token");
  const data = JSON.parse(token);
  let sessionObj = {
    user_name: data?.user_name,
  };
  const [isAuthenticated, setIsAuthenticated] = useState(data?.isAuthenticated);

  // const currentTime = new Date().setMinutes(new Date().getMinutes());
  const currentTime = new Date().setHours(new Date().getHours());
  // const currentTime = new Date().setSeconds(new Date().getSeconds());
  const isTimeExpired = currentTime > data?.expiredAt;

  return {
    isAuthenticated,
    setIsAuthenticated,
    isTimeExpired,
    data,
    sessionObj,
  };
};
