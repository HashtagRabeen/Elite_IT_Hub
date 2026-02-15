import React from "react";

function UserView({ users, onBack }) {
  return (
    <div>
      <div className="text-right w-full py-2">
        <button
          className="px-4 py-1 bg-[#003e3d] rounded-xl text-white"
          onClick={onBack}
        >
          Go back
        </button>
      </div>
      <div>
        <table className="shadow w-32 md:w-96 lg:w-full">
          <thead className="border bg-[#18b1af] text-white">
            <tr>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Role</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="text-left px-6 py-3">{user.name}</td>
                <td className="text-left px-6 py-3">{user.role}</td>
                <td className="text-left px-6 py-3">{user.email}</td>
                <td className="text-left px-6 py-3">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserView;
