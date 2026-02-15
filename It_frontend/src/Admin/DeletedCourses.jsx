import { useEffect, useState } from "react";

const DeletedCourses = () => {
  const [file, setFile] = useState([]);

  const getDeleteDetails = async () => {
    try {
      let res = await fetch("http://localhost:9000/api/getDeleteDetails");
      res = await res.json();
      console.log(res.getDelete);
      setFile(res.getDelete);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getDeleteDetails();
  }, []);
  return (
    <div>
      <h1 className="font-bold text-5xl text-center mt-5">Delete History</h1>
      <div className="flex justify-center flex-col overflow-x-auto shadow rounded-lg">
        <table className="w-full table-auto bg-white rounded-lg mt-5">
          <thead className="bg-[#0c717a] text-white">
            <tr>
              <th className="text-left px-6 py-3">Delete By</th>
              <th className="text-left  px-6 py-3 ">Course Name</th>
              <th className="text-left  px-6 py-3">Delete At</th>
            </tr>
          </thead>
          <tbody className="">
            {file.map((item, _id) => (
              <tr key={_id}>
                <td className=" px-6 py-2">{item.userName}</td>
                <td className="px-6 py-2">{item.courseName}</td>
                <td className=" px-6 py-2">{item.deletedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeletedCourses;
