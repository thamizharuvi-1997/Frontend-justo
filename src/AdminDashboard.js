import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/users");
    //   console.log(response)
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleStatus = async (userId, currentStatus) => {
    try {
      const action = currentStatus ? "block" : "unblock";

      const response = await axios.put("http://localhost:7000/api/action", {
        userId,
        action,
      });

    //   console.log(response)
      alert(response.data.message);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: !currentStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>User List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.mail}</td>
              <td>{user.phone}</td>
              <td>{user.status ? "Active" : "Blocked"}</td>
              <td>
                <button onClick={() => toggleStatus(user.id, user.status)}>
                  {user.status ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
