import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

import { Login } from "./Login.jsx";
import { Manager } from "./Manager.jsx";

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
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/manager" element={<Manager />}></Route>
    </Routes>
  );
};
