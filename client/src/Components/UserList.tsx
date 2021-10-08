import { useQuery, useMutation } from "@apollo/client";

import { GET_ALL_USERS } from "../Graphql/Queries/User";

import { DELETE_USER } from "../Graphql/Mutation/User";

const UserList = () => {
  const { data } = useQuery(GET_ALL_USERS);

  const [deleteUser, response] = useMutation(DELETE_USER);

  if (response.error) {
    console.log(response.error);
  }
  if (response.data) {
    console.log(response.data);
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
                      deleteUser({ variables: { id: user.id } });
                      window.location.reload();
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
