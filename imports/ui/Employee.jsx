import React from "react";

import { Header } from "./Components/Header";

export const Employee = () => {
  return (
    <div className="employee">
      <Header />
      {/* <div className="main">
      <div className="schedule"></div>
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
                    minDate={new Date()}
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
      </div> */}
    </div>
  );
};
