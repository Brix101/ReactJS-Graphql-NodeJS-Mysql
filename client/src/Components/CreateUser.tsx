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

  return (
    <div className="createUser">
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

      <button
        onClick={() =>
          createUser({
            variables: { name: name, username: username, password: password },
          })
        }
      >
        Create User
      </button>
    </div>
  );
}

export default CreateUser;
