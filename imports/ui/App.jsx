import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

import { Login } from "./Login.jsx";
import { Manager } from "./Manager.jsx";
import { Employee } from "./Employee.jsx";
import { NotFound } from "./Components/NotFound.jsx";

export const App = () => {
  const navigate = useNavigate();

  const user = useTracker(() => {
    return Meteor.user();
  });

  useEffect(() => {
    user && window.location.pathname === "/"
      ? user.profile.role === "Manager"
        ? navigate("/manager")
        : navigate("/employee")
      : {};
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/manager" element={<Manager />}></Route>
      <Route path="/employee" element={<Employee />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
