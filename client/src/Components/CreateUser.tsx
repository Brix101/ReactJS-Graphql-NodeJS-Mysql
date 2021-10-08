import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_USER } from "../Graphql/Mutation/User";

function CreateUser() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [createUser, { error, data }] = useMutation(CREATE_USER);

  if (error) {
    console.log({ Error: error });
  }
  if (data) {
    console.log(data.createUser.message);
  }

  const onsubmit = () => {
    createUser({
      variables: { name: name, username: username, password: password },
    });
  };

  return (
    <div className="createUser">
      <form onSubmit={onsubmit}>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default CreateUser;
