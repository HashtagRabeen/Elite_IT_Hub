import { useEffect, useState } from "react";

const UpdateUsersHistory = () => {
  const [file, setFile] = useState([]);

  const getUpdateDetails = async () => {
    try {
      let res = await fetch("http://localhost:9000/api/getUpdateHistory");
      res = await res.json();
      console.log(res.getUpdate);
      setFile(res.getUpdate);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUpdateDetails();
  }, []);
  return (
    <div>
      <h1 className="font-bold text-5xl text-center mt-5 text-slate-700">Updation History</h1>
      <div className="flex justify-center flex-col overflow-x-auto shadow rounded-lg">
        <table className="w-full table-auto bg-white rounded-lg mt-5">
          <thead className="bg-[#0c717a] text-white">
            <tr>
              <th className="text-left px-6 py-3">Updated By</th>
              <th className="text-left  px-6 py-3 ">Updated User Name</th>
              <th className="text-left  px-6 py-3">Updated At</th>
            </tr>
          </thead>
          <tbody className="">
            {file.map((item, _id) => (
              <tr key={_id}>
                <td className=" px-6 py-2">{item.userName}</td>
                <td className="px-6 py-2">{item.updatedUserName}</td>
                <td className=" px-6 py-2">{item.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateUsersHistory;
