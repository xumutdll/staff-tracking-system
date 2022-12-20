import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

import "./css/Header.css";
import { LeaveReqList } from "../../api/Collections";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

export const Header = ({ userList }) => {
  const [firstName, setFirstName] = useState(() => "");
  const [lastName, setLastName] = useState(() => "");
  const [role, setRole] = useState(() => "");
  const navigate = useNavigate();
  const user = useTracker(() => Meteor.user());

  const [notificationFlag, setNotificationFlag] = useState(() => false);
  // const [userInfo, setUserInfo] = useState(() => {
  //   return { firstName: "", lastName: "", role: "" };
  // });

  const userLeaveReqs = useTracker(() => {
    return LeaveReqList.find({ status: "Pending" }).fetch();
  });

  useEffect(() => {
    Meteor.subscribe("LeaveReq");
    if (!user) return;
    setFirstName(user.profile.firstName);
    setLastName(user.profile.lastName);
    setRole(user.profile.role);
  }, [user]);

  const handleLogout = () => {
    Meteor.logout((err) => {
      !err ? navigate("/") : console.log(err);
    });
  };

  const handleNotification = (id, result) => {
    let info = { _id: id, status: result };
    console.log(result);
    Meteor.call("leaveReqs.update", info);
  };

  return (
    <div className="header">
      <div className="left">
        <span className="profile">
          <div>
            <h3>{firstName}</h3>
          </div>
          <div>
            <h3>{lastName}</h3>
          </div>
          <div>
            <h3>- {role}</h3>
          </div>
        </span>
      </div>
      <div className="right">
        {user.profile.role === "Manager" && (
          <>
            <NavLink>
              <span onClick={() => setNotificationFlag(!notificationFlag)}>
                <FontAwesomeIcon icon={faBell} />
                {userLeaveReqs.length !== 0 && (
                  <div className="bubble">{userLeaveReqs.length}</div>
                )}
              </span>
            </NavLink>
            {notificationFlag && (
              <div className="notification">
                {userLeaveReqs.map((req) => {
                  return (
                    <div key={req._id} className="leave-reqs">
                      <h4>From: </h4>
                      {
                        userList.filter(
                          (user) => user._id === req.employeeId
                        )[0].profile.firstName
                      }{" "}
                      {
                        userList.filter(
                          (user) => user._id === req.employeeId
                        )[0].profile.lastName
                      }
                      {" - "}
                      {
                        userList.filter(
                          (user) => user._id === req.employeeId
                        )[0].profile.role
                      }
                      <br />
                      <h4>Title: </h4>
                      {req.title}
                      <br />
                      <h4>Statement: </h4>
                      {req.statement}
                      <br />
                      <h4>Start Date: </h4>
                      {req.startDate}
                      <br />
                      <h4>End Date: </h4>
                      {req.endDate}
                      <br />
                      <br />
                      <div className="buttons">
                        <button
                          className="refuse"
                          onClick={() =>
                            handleNotification(req._id, "Declined")
                          }
                        >
                          Refuse
                        </button>
                        <button
                          className="accept"
                          onClick={() =>
                            handleNotification(req._id, "Accepted")
                          }
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        <NavLink>
          <span onClick={handleLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </span>
        </NavLink>
      </div>
    </div>
  );
};
