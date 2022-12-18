import React, { useState, useEffect } from "react";

import "./css/UserList.css";
import { QueryNotFound } from "./QueryNotFound";
import { SearchBar } from "./SearchBar";
import { CreateUser } from "./CreateUser";

export const UserList = ({ userList, handleChange }) => {
  const [prevActive, setPrevActive] = useState(() => null);
  const [searchQuery, setSearchQuery] = useState(() => "");

  const handleClick = (e, id) => {
    // document.getElementById("MyElement").classList.add('MyClass');
    // document.getElementById("MyElement").classList.remove('MyClass');
    // if ( document.getElementById("MyElement").classList.contains('MyClass') )
    // document.getElementById("MyElement").classList.toggle('MyClass');

    if (!prevActive) {
      setPrevActive(e.currentTarget);
      e.currentTarget.className += "chosen";
      handleChange(id);
    } else {
      // when you cahse the current user
      prevActive.classList.remove("chosen");
      setPrevActive(e.currentTarget);
      e.currentTarget.classList.add("chosen");
      handleChange(id);
    }
  };

  let searchlist = userList.filter(
    (user) =>
      user.profile.firstName.toLowerCase().includes(searchQuery) ||
      user.profile.lastName.toLowerCase().includes(searchQuery) ||
      user.profile.role.toLowerCase().includes(searchQuery)
  );

  return (
    <ul className="user-list">
      <CreateUser />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {searchlist.length === 0 ? (
        <QueryNotFound />
      ) : (
        searchlist.map((user) => {
          return (
            <li onClick={(e) => handleClick(e, user._id)} key={user._id}>
              {user.profile.firstName} {user.profile.lastName}
              {" : "}
              {user.profile.role}
            </li>
          );
        })
      )}
    </ul>
  );
};
