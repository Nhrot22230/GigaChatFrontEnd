import React from "react";
import { User } from "../model/myProps";

const UserCard: React.FC<User> = ({
  userid,
  nickname,
  firstName,
  lastName,
}) => {
  return (
    <div>
      <h1>{nickname} [{userid}]</h1>
      <p>Full Name: {firstName} {lastName}</p>
    </div>
  );
};

export default UserCard;
