import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

import { Login } from "./Login.jsx";

export const App = () => {
  const navigate = useNavigate();

  const user = useTracker(() => {
    return Meteor.user();
  });

  useEffect(() => {
    user && window.location.pathname === "/"
      ? user.profile.role === "Manager"
        ? navigate("/manager")
        : user.profile.role === "Teacher"
        ? navigate("/teacher")
        : navigate("/student")
      : {};
  }, [user]);

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
    </div>
  );
};
