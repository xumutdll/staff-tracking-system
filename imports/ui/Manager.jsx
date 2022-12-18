import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import "./css/Manager.css";
import { Header } from "./Components/Header";
import { UserList } from "./Components/UserList";

export const Manager = () => {
  const [form, setForm] = useState(() => {
    return {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      active: false,
      role: "Student",
    };
  });
  useEffect(() => {
    Meteor.subscribe("Manager");
    //subscribe on deployment
  }, []);

  const userList = useTracker(() => {
    return Meteor.users.find({ "profile.role": { $ne: "Manager" } }).fetch();
  });

  const handleChange = (id) => {
    let selectedUser = Meteor.users.findOne({ _id: id });
    setForm({
      _id: id,
      firstName: selectedUser.profile.firstName,
      lastName: selectedUser.profile.lastName,
      role: selectedUser.profile.role,
      email: selectedUser.emails[0].address,
      phone: selectedUser.profile.phone,
      createdAt: selectedUser.createdAt,
    });
  };

  return (
    <div className="manager">
      <Header />
      <div className="main">
        <UserList userList={userList} handleChange={(id) => handleChange(id)} />
        <div className="schedule"></div>
        <div className="info"></div>
      </div>
    </div>
  );
};
