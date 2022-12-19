import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { check } from "meteor/check";

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
});

Meteor.publish("Manager", () => {
  return Meteor.users.find({
    "profile.role": { $ne: "Manager" },
  });
});
