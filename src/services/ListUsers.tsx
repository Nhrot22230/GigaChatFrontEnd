import React, { useEffect, useState } from "react";
import { FetchDataComponentProps, User } from "../model/myProps";
import UserCard  from "../components/UserCard";

const FetchDataComponent: React.FC<FetchDataComponentProps> = ({ search }) => {
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:8080/giga-chat/users/listUsers";
        const fetchUrl = search ? `${url}?search=${search}` : url;
        const response = await fetch(fetchUrl);
        if (response.status === 404) {
          throw new Error("Users not found");
        }
        else if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const recv_data = await response.json();
        setData(recv_data);
        setError(null);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, [search]); // Se vuelve a ejecutar cuando 'search' cambia

  return (
    <div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {data.map((user) => (
            <li key={user.userid}>
              <UserCard {...user} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchDataComponent;
