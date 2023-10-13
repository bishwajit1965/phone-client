import { Link, useLoaderData, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const UpdateUser = () => {
  const loadedUser = useLoaderData();
  const { _id, name, email } = loadedUser;
  console.log("User data", loadedUser);

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    const updatedUser = { name, email };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${_id}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(updatedUser),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.modifiedCount > 0) {
              Swal.fire("Updated!", "User has been updated.", "success");
            }
          });
      }
    });
  };
  return (
    <div className="lg:w-3/12 mx-auto">
      <form onSubmit={handleUpdate} className="space-y-2">
        <input
          type="text"
          name="name"
          defaultValue={name}
          placeholder="Name..."
          className="input input-bordered input-sm w-full max-w-xs"
        />
        <input
          type="email"
          name="email"
          defaultValue={email}
          placeholder="Email..."
          className="input input-bordered input-sm w-full max-w-xs"
        />

        <button className="btn btn-sm btn-primary mr-2">Update user</button>
        <Link to="/">
          <button className="btn btn-sm bg-amber-500">Home</button>
        </Link>
      </form>
    </div>
  );
};

export default UpdateUser;
