import { useState } from "react";
import { Token } from "./Token";

export default function useToken() {
  const getToken = () : string | null => {
    const tokenString = localStorage.getItem("token") ?? "{}";
    const userToken = JSON.parse(tokenString);
    return userToken?.token ?? null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: Token) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
