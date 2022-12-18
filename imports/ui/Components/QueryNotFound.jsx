import React from "react";
import "./css/QueryNotFound.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";

export const QueryNotFound = () => {
  return (
    <div className="query-not-found">
      <h2>Query not found.</h2>
      <FontAwesomeIcon icon={faFaceFrown} size="2x" />
    </div>
  );
};
