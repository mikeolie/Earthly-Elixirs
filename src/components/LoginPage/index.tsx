import React, { useState } from "react";

import { User } from "../../@types";
import { adminUsers } from "../../constants";

function LoginPage(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const isUserReady = email.length > 2 && password.length > 2;
  const handleSignInClick = (): void => {
    const userToVerify: User = {
      username: email,
      password,
    };
    if (adminUsers.includes(userToVerify)) {
      console.log("Success!");
    }
  };
  return (
    <div>
      <aside></aside>
      <main>
        <h4>Welcome Back</h4>
        <caption>
          Enter your email and your password to access the dashboard
        </caption>
        <form>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            <label>Password</label>
            <input
              type="text"
              hidden
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button disabled={!isUserReady} onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;
