import { useQuery } from "@apollo/client";

import { GET_ALL_USERS } from "../Graphql/Queries/User";

const UserList = () => {
  const { data, error, loading } = useQuery(GET_ALL_USERS);
  if (data) {
    console.log(data.getAllUsers);
  }
  if (error) {
    console.log(error);
  }
  return (
    <div>
      <ul>
        {data &&
          data.getAllUsers.map((user: any) => {
            return (
              <li>
                {user.name}/{user.username}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UserList;
