import * as React from 'react';
import './Login.scss';

interface LoginProps {
  setToken: React.Dispatch<React.SetStateAction<undefined>>
}

const Login: React.FunctionComponent<LoginProps> = () => {
  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login;