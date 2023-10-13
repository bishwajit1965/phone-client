import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import UserCard from "../../components/userCard/UserCard";
import { useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    const user = { name, email };
    console.log(user);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged === true) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <>
      <div className="lg:w-3/12 mx-auto">
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Name..."
            className="input input-bordered input-sm w-full max-w-xs"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email..."
            className="input input-bordered input-sm w-full max-w-xs"
            required
          />

          <button className="btn btn-sm btn-primary">Upload</button>
        </form>
      </div>

      <h1 className="text-xl font-bold">Users:{users.length}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 justify-between gap-6">
        {users?.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            users={users}
            setUsers={setUsers}
          />
        ))}
      </div>
    </>
  );
};

export default Users;
