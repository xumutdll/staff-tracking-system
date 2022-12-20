import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import DateTimePicker from "react-datetime-picker";

import "./css/CreateUser.css";

export const CreateUser = () => {
  const [open, setOpen] = useState(false);
  const genderOptions = ["Unspecified", "Male", "Female"];
  const roleOptions = [
    "Intern",
    "Secretary",
    "Sales Representative",
    "Engineer",
    "Manager",
  ];

  const [form, setForm] = useState(() => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      gender: genderOptions[0],
      role: roleOptions[0],
      employmentDate: new Date(),
      password: "",
      passwordCheck: "",
    };
  });

  const handleRegister = () => {
    Meteor.call("users.insert", form, (err, res) => {
      if (res === undefined) {
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          gender: genderOptions[0],
          role: roleOptions[0],
          employmentDate: new Date(),
          password: "",
          passwordCheck: "",
        });
        alert("Succesfully registered.");
      } else alert(res);
    });
  };

  return (
    <div className="create-user">
      <button onClick={() => setOpen(true)}>Create New Account</button>
      <Modal open={open} onClose={() => setOpen(false)} center>
        <div className="create-user-form">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label htmlFor="gender">Gender:</label>
          <select
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            className="dropdown-input"
            name="gender"
          >
            {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label htmlFor="role">Position:</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="dropdown-input"
            name="role"
          >
            {roleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label htmlFor="employmentDate">Employment Date:</label>
          <div className="date-time-picker-wrapper">
            <DateTimePicker
              onChange={(e) => setForm({ ...form, employmentDate: e })}
              value={form.employmentDate}
              // minDate={new Date()}
              name="employmentDate"
            />
          </div>

          <label htmlFor="password">Password:</label>
          <input
            type="text"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <label htmlFor="password">Password (Again ):</label>
          <input
            type="text"
            name="password"
            value={form.passwordCheck}
            onChange={(e) =>
              setForm({ ...form, passwordCheck: e.target.value })
            }
          />

          <div className="filler"></div>

          {form.firstName === "" ||
          form.lastName === "" ||
          form.email === "" ||
          form.password === "" ||
          form.passwordCheck === "" ? (
            <button disabled> Register </button>
          ) : (
            <button onClick={handleRegister}> Register </button>
          )}
        </div>
      </Modal>
    </div>
  );
};
