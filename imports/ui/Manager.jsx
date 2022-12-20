import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import DateTimePicker from "react-datetime-picker";
import moment from "moment/moment";

import "./css/Manager.css";
import { Header } from "./Components/Header";
import { UserList } from "./Components/UserList";
import { ShiftsList } from "../api/Collections";

export const Manager = () => {
  const genderOptions = ["Unspecified", "Male", "Female"];
  const roleOptions = [
    "Intern",
    "Secretary",
    "Sales Representative",
    "Engineer",
    "Manager",
  ];

  const [empDateFlag, setEmpDateFlag] = useState(() => true);

  const [form, setForm] = useState(() => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      gender: genderOptions[0],
      role: roleOptions[0],
      employmentDate: new Date(),
      createdAt: "",
    };
  });

  const [shiftHours, setSchiftHours] = useState(() => {
    return {
      employeeId: "",
      shiftStart: "",
      shiftEnd: "",
      lunchBreakStart: "",
      lunchBreakEnd: "",
      totalTime: "",
    };
  });

  useEffect(() => {
    Meteor.subscribe("Manager");
    Meteor.subscribe("Shifts");
    //subscribe on deployment
  }, []);

  const userList = useTracker(() => {
    return Meteor.users.find({ "profile.role": { $ne: "Manager" } }).fetch();
  });

  const shiftsList = useTracker(() => {
    let list = ShiftsList.find().fetch();
    if (userList.length > 0) {
      if (userList.length !== list.length) {
        userList.forEach((user) => {
          Meteor.call("shifts.insert", { ...shiftHours, employeeId: user._id });
        });
      }
    }
    return list;
  });

  const handleChange = (id) => {
    let selectedUser = Meteor.users.findOne({ _id: id });
    setForm({
      _id: id,
      firstName: selectedUser.profile.firstName,
      lastName: selectedUser.profile.lastName,
      email: selectedUser.emails[0].address,
      gender: selectedUser.profile.gender,
      role: selectedUser.profile.role,
      employmentDate: selectedUser.profile.employmentDate,
      createdAt: selectedUser.createdAt,
    });

    shiftsList.forEach((shift) => {
      if (shift.employeeId === id) {
        setSchiftHours({
          employeeId: shift.employeeId,
          shiftStart: shift.shiftStart,
          shiftEnd: shift.shiftEnd,
          lunchBreakStart: shift.lunchBreakStart,
          lunchBreakEnd: shift.lunchBreakEnd,
          totalTime: shift.totalTime,
        });
      }
    });

    setEmpDateFlag(true);
  };

  const handleUpdate = () => {
    Meteor.call("users.update", form, (err, res) => {
      if (res === undefined) {
        alert("Succesfully updated.");
      } else alert(res);
    });
  };

  useEffect(() => {
    Meteor.call("shifts.update", shiftHours);
  }, [shiftHours]);

  return (
    <div className="manager">
      <Header />
      <div className="main">
        <UserList userList={userList} handleChange={(id) => handleChange(id)} />
        <div className="schedule">
          {!!shiftHours.employeeId && (
            <>
              <table className="daily">
                <thead>
                  <tr>
                    <th colSpan="2">Shift</th>
                    <th colSpan="2">Lunch Break</th>
                  </tr>
                  <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Start</th>
                    <th>End</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="time"
                        value={shiftHours.shiftStart}
                        onChange={(e) =>
                          setSchiftHours({
                            ...shiftHours,
                            shiftStart: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={shiftHours.shiftEnd}
                        onChange={(e) =>
                          setSchiftHours({
                            ...shiftHours,
                            shiftEnd: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={shiftHours.lunchBreakStart}
                        onChange={(e) =>
                          setSchiftHours({
                            ...shiftHours,
                            lunchBreakStart: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={shiftHours.lunchBreakEnd}
                        onChange={(e) =>
                          setSchiftHours({
                            ...shiftHours,
                            lunchBreakEnd: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
        <div className="info">
          {!!form._id && (
            <>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
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
              {empDateFlag ? (
                <div className="empDate" onClick={() => setEmpDateFlag(false)}>
                  {moment(form.employmentDate).format("DD MMMM YYYY HH:mm")}
                </div>
              ) : (
                <div className="date-time-picker-wrapper">
                  <DateTimePicker
                    onChange={(e) => setForm({ ...form, employmentDate: e })}
                    value={form.employmentDate}
                    // minDate={new Date()}
                    name="employmentDate"
                  />
                </div>
              )}

              <label htmlFor="CreatedAt">Created At:</label>
              <div className="empDate">
                {moment(form.createdAt).format("DD MMMM YYYY HH:mm")}
              </div>
              <div className="filler"></div>

              {form.firstName === "" ||
              form.lastName === "" ||
              form.email === "" ? (
                <button disabled> Update </button>
              ) : (
                <button onClick={handleUpdate}> Update </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
