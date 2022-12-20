import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import moment from "moment/moment";

import "./css/Employee.css";
import { Header } from "./Components/Header";
import { ShiftsList } from "../api/Collections";

export const Employee = () => {
  const id = Meteor.userId();

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
      password: "john123",
      employmentDate: "",
      createdAt: "",
    };
  });

  useEffect(() => {
    Meteor.subscribe("Employee", id);
    Meteor.subscribe("Shifts");
  }, []);

  const user = useTracker(() => {
    return Meteor.users.findOne({ _id: id });
  });

  const shifts = useTracker(() => {
    return ShiftsList.findOne({ employeeId: id });
  });
  console.log(shifts);

  useEffect(() => {
    if (!!user) {
      if (form.firstName === "") {
        setForm({
          ...form,
          _id: user._id,
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          email: user.emails[0].address,
          gender: user.profile.gender,
          role: user.profile.role,
          employmentDate: user.profile.employmentDate,
        });
      }
    }
  }, [user]);

  const handleUpdate = () => {
    Meteor.call("self.update", form, (err, res) => {
      if (res === undefined) {
        alert("Succesfully updated.");
      } else alert(res);
    });
  };

  return (
    <div className="employee">
      <Header />
      <div className="main">
        <div className="info">
          {!!user && (
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

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <label htmlFor="role">Position:</label>
              <select
                disabled
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
              <div className="empDate">
                {moment(form.employmentDate).format("DD MMMM YYYY HH:mm")}
              </div>

              <div className="filler"></div>

              {form.firstName === "" ||
              form.lastName === "" ||
              form.email === "" ||
              form.password === "" ? (
                <button disabled> Update </button>
              ) : (
                <button onClick={handleUpdate}> Update </button>
              )}
            </>
          )}
        </div>
        <div className="schedule">
          {!!shifts && (
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
                    <td>{shifts.shiftStart}</td>
                    <td>{shifts.shiftEnd}</td>
                    <td>{shifts.lunchBreakStart}</td>
                    <td>{shifts.lunchBreakEnd}</td>
                  </tr>
                </tbody>
              </table>
              <table className="weekly">
                <thead>
                  <tr>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {shifts.weekDays[0] ? (
                        <div className="on">Work Day</div>
                      ) : (
                        <div className="off">Off Day</div>
                      )}
                    </td>
                    <td>
                      {shifts.weekDays[1] ? (
                        <div className="on">Work Day</div>
                      ) : (
                        <div className="off">Off Day</div>
                      )}
                    </td>
                    <td>
                      {shifts.weekDays[2] ? (
                        <div className="on">Work Day</div>
                      ) : (
                        <div className="off">Off Day</div>
                      )}
                    </td>
                    <td>
                      {shifts.weekDays[3] ? (
                        <div className="on">Work Day</div>
                      ) : (
                        <div className="off">Off Day</div>
                      )}
                    </td>
                    <td>
                      {shifts.weekDays[4] ? (
                        <div className="on">Work Day</div>
                      ) : (
                        <div className="off">Off Day</div>
                      )}
                    </td>
                    <td>
                      {shifts.weekDays[5] ? (
                        <div className="on">Work Day</div>
                      ) : (
                        <div className="off">Off Day</div>
                      )}
                    </td>
                    <td>
                      {shifts.weekDays[6] ? (
                        <div className="on">Work Day</div>
                      ) : (
                        <div className="off">Off Day</div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
        <div className="leave"></div>
      </div>
    </div>
  );
};
