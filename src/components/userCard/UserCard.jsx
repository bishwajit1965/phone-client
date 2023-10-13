import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserCard = ({ user, users, setUsers }) => {
  const { _id, name, email } = user;
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${_id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "User has been deleted.", "success");
              const remaining = users.filter((user) => user._id !== _id);
              setUsers(remaining);
            }
          });
      }
    });
  };
  return (
    <div className="col-span-3 border p-2 rounded-md shadow-lg">
      <h2>{name}</h2>
      <p>{_id}</p>
      <p>{email}</p>

      <div className="flex mt-4">
        <button
          onClick={() => handleDelete(_id)}
          className="btn btn-xs bg-red-500 text-white mx-2"
        >
          Delete
        </button>
        <Link to={`/users/${user._id}`}>
          <button className="btn btn-xs bg-indigo-800 text-white">
            {" "}
            Update{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
