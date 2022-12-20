import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { check } from "meteor/check";
import moment from "moment";

import { ShiftsList } from "../imports/api/Collections";
import { LeaveReqList } from "../imports/api/Collections";

Meteor.startup(() => {});

Meteor.methods({
  "users.insert"(info) {
    check(info, Object);

    if (info.password !== info.passwordCheck) return "Passwords do not match!";
    else if (!!Meteor.users.findOne({ "emails.address": info.email })) {
      return "Email already exists.";
    } else {
      Accounts.createUser({
        email: info.email,
        password: info.password,
        profile: {
          firstName: info.firstName,
          lastName: info.lastName,
          gender: info.gender,
          role: info.role,
          employmentDate: info.employmentDate,
        },
      });
    }
  },

  "users.update"(info) {
    check(info, Object);
    // const user = Meteor.users.findOne({ "emails.address": info.email });
    // console.log(info.email);
    // console.log(user);
    Meteor.users.update(
      { _id: info._id },
      {
        $set: {
          "profile.firstName": info.firstName,
          "profile.lastName": info.lastName,
          emails: [{ address: info.email }],
          "profile.gender": info.gender,
          "profile.role": info.role,
          "profile.employmentDate": info.employmentDate,
        },
      }
    );
  },

  "shifts.insert"(shiftHours) {
    check(shiftHours, Object);

    let exists = ShiftsList.findOne({
      employeeId: shiftHours.employeeId,
    });

    !exists && ShiftsList.insert(shiftHours);
  },

  "shifts.update"(shiftHours) {
    check(shiftHours, Object);

    ShiftsList.update(
      { employeeId: shiftHours.employeeId },
      {
        $set: {
          shiftStart: shiftHours.shiftStart,
          shiftEnd: shiftHours.shiftEnd,
          lunchBreakStart: shiftHours.lunchBreakStart,
          lunchBreakEnd: shiftHours.lunchBreakEnd,
          totalTime: shiftHours.totalTime,
          weekDays: shiftHours.weekDays,
        },
      }
    );
  },

  "self.update"(info) {
    check(info, Object);
    // const user = Meteor.users.findOne({ "emails.address": info.email });
    // console.log(info.email);
    // console.log(user);
    Meteor.users.update(
      { _id: info._id },
      {
        $set: {
          "profile.firstName": info.firstName,
          "profile.lastName": info.lastName,
          emails: [{ address: info.email }],
          "profile.gender": info.gender,
        },
      }
    );
  },
  "leaveReqs.insert"(form) {
    check(form, Object);
    form.startDate = form.startDate.getTime();
    form.endDate = form.endDate.getTime();

    if (form.startDate < form.endDate) {
      form.startDate = moment(form.startDate).format("DD MMMM YYYY HH:mm");
      form.endDate = moment(form.endDate).format("DD MMMM YYYY HH:mm");

      LeaveReqList.insert(form);
      return "Leave request sent successfully!";
    }
    return "The start date of the request cannot be earlier than the end date of the request!";
  },
});

Meteor.publish("Manager", () => {
  return Meteor.users.find({
    "profile.role": { $ne: "Manager" },
  });
});

Meteor.publish("Employee", (userId) => {
  if (!!userId === false) return;
  return Meteor.users.find({ _id: userId });
});

Meteor.publish("Shifts", () => {
  return ShiftsList.find();
});

Meteor.publish("LeaveReq", () => {
  return LeaveReqList.find();
});
