import { useQuery, useMutation } from "@apollo/client";

import { GET_ALL_USERS } from "../Graphql/Queries/User";

import { DELETE_USER } from "../Graphql/Mutation/User";

const UserList = () => {
  const { data } = useQuery(GET_ALL_USERS);

  const [deleteUser, removeUser] = useMutation(DELETE_USER);

  if (removeUser.error) {
    console.log(removeUser.error);
  }
  if (removeUser.data) {
    console.log(removeUser.data);
  }

  return (
    <div>
      <ul>
        {data &&
          data.getAllUsers.map((user: any) => {
            return (
              <li>
                <h3>
                  {user.name} / {user.username}{" "}
                  <button
                    onClick={() => {
                      console.log(user.id);
                      deleteUser({ variables: { id: user.id } });
                    }}
                  >
                    Delete
                  </button>
                </h3>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UserList;
