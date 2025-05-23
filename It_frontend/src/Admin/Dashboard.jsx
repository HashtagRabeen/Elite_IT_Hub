import { useContext } from "react"
import { AuthContext } from "../Context/AuthProvider"
import AdminInquiry from "./AdminInquiry"

function Dashboard() {
  const {user}=useContext(AuthContext)
  return (
    <div>
      <div className=" h-20 flex justify-center items-center mt-10">
        <h1 className="text-3xl font-semibold">Welcome Admin, <span className="font-bold"> {user?.name}</span></h1>
      </div>
      <AdminInquiry/>
    </div>
  )
}

export default Dashboard
