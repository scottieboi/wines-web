import * as React from "react";
import { useState } from "react";
import { useAuth } from "../App/hooks";
import "./Login.scss";
import loginUser from "./loginUser";

const Login = (): JSX.Element => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <p>Username</p>
          <input
            id="username"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
