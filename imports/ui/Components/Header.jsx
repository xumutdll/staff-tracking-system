import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

import "./css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

export const Header = () => {
  const [firstName, setFirstName] = useState(() => "");
  const [lastName, setLastName] = useState(() => "");
  const [role, setRole] = useState(() => "");
  const navigate = useNavigate();
  const user = useTracker(() => Meteor.user());

  useEffect(() => {
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
  return (
    <div className="header">
      <div className="left">
        <span className="profile">
          {/* <div>
            <FontAwesomeIcon icon={faUser} />
          </div> */}

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
        <NavLink>
          <span>
            <FontAwesomeIcon icon={faBell} />
          </span>
        </NavLink>
        <NavLink>
          <span onClick={handleLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </span>
        </NavLink>
      </div>
    </div>
  );
};
