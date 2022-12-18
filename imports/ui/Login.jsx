import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import "./css/Login.css";
export const Login = () => {
  const [email, setEmail] = useState(() => "");
  const [password, setPassword] = useState(() => "");

  const handleLogin = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(email, password, (err) => {
      !err ? (setEmail(""), setPassword("")) : alert("Incorrect Credentials.");
    });
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
