import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import DateTimePicker from "react-datetime-picker";

import "./css/CreateLeaveRequest.css";

export const CreateLeaveRequest = () => {
  let id = Meteor.userId();
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState(() => {
    return {
      employeeId: id,
      title: "",
      statement: "",
      startDate: new Date(),
      endDate: new Date(),
      status: "Pending",
    };
  });

  const handleSend = () => {
    Meteor.call("leaveReqs.insert", form, (err, res) => {
      if (res === "Leave request sent successfully!") {
        setForm({
          employeeId: id,
          title: "",
          statement: "",
          startDate: new Date(),
          endDate: new Date(),
          status: "Pending",
        });
      }
      alert(res);
    });
  };

  return (
    <div className="create-leave">
      <button onClick={() => setOpen(true)}>Create Leave Request</button>
      <Modal open={open} onClose={() => setOpen(false)} center>
        <div className="create-leave-form">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <label htmlFor="statement">Statement:</label>
          <textarea
            type="text"
            name="statement"
            className="statement"
            value={form.statement}
            onChange={(e) => setForm({ ...form, statement: e.target.value })}
          ></textarea>

          <label htmlFor="startDate">Start Date:</label>
          <div className="date-time-picker-wrapper">
            <DateTimePicker
              onChange={(e) => setForm({ ...form, startDate: e })}
              value={form.startDate}
              minDate={new Date()}
              name="startDate"
            />
          </div>

          <label htmlFor="endDate">End Date:</label>
          <div className="date-time-picker-wrapper">
            <DateTimePicker
              onChange={(e) => setForm({ ...form, endDate: e })}
              value={form.endDate}
              minDate={new Date()}
              name="endDate"
            />
          </div>

          <div className="filler"></div>

          {form.title === "" ||
          form.statement === "" ||
          form.endDate.getTime() === new Date().getTime() ||
          form.startDate.getTime() === form.endDate.getTime() ? (
            <button disabled> Send </button>
          ) : (
            <button onClick={handleSend}> Send </button>
          )}
        </div>
      </Modal>
    </div>
  );
};
