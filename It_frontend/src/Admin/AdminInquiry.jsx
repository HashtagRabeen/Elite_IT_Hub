import { useEffect, useState } from "react";
import { Bounce, Slide, toast } from "react-toastify";
import {
  FaExclamationTriangle,
  FaClock,
  FaCheckCircle,
  FaTrash,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaBook,
  FaCalendar,
  FaChartBar,
} from "react-icons/fa";

function AdminInquiry() {
  const [inquiry, setInquiry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getInquiry = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:9000/api/getInquiry", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setInquiry(data.showInquiry || []);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      setError(error.message);
      toast.error("Failed to load inquiries", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInquiry();
  }, []);

  const deleteInquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9000/api/deleteInquiry/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || "Inquiry deleted successfully", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
        getInquiry();
      } else {
        toast.error("Couldn't delete inquiry", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      toast.error("An error occurred while deleting", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/updateInquiryStatus/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(
          data.message || `Status updated to ${newStatus} successfully`,
          {
            position: "top-right",
            autoClose: 2000,
            theme: "light",
            transition: Slide,
          },
        );
        getInquiry();
      } else {
        toast.error("Failed to update status", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Slide,
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("An error occurred while updating status", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    }
  };

  const urgent = inquiry.filter((item) => item.status === "urgent");
  const pending = inquiry.filter((item) => item.status === "pending");
  const responded = inquiry.filter((item) => item.status === "responded");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold text-lg mb-2">
            Error Loading Inquiries
          </h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={getInquiry}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
            Inquiry Management
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Inquiries"
              value={inquiry.length}
              icon={<FaChartBar className="text-3xl" />}
              color="blue"
            />
            <StatCard
              title="Urgent"
              value={urgent.length}
              icon={<FaExclamationTriangle className="text-3xl" />}
              color="red"
            />
            <StatCard
              title="Pending"
              value={pending.length}
              icon={<FaClock className="text-3xl" />}
              color="yellow"
            />
            <StatCard
              title="Responded"
              value={responded.length}
              icon={<FaCheckCircle className="text-3xl" />}
              color="green"
            />
          </div>
        </div>

        <Section
          title="Urgent Inquiries"
          data={urgent}
          onDelete={deleteInquiry}
          onUpdate={updateStatus}
          statusColor="red"
          icon={<FaExclamationTriangle />}
        />
        <Section
          title="Pending Inquiries"
          data={pending}
          onDelete={deleteInquiry}
          onUpdate={updateStatus}
          statusColor="yellow"
          icon={<FaClock />}
        />
        <Section
          title="Responded Inquiries"
          data={responded}
          onDelete={deleteInquiry}
          onUpdate={updateStatus}
          statusColor="green"
          icon={<FaCheckCircle />}
        />
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
    green: "bg-green-50 border-green-200 text-green-800",
    red: "bg-red-50 border-red-200 text-red-800",
  };

  return (
    <div
      className={`${colorClasses[color]} border-2 rounded-lg p-4 text-center shadow-sm transition-transform hover:scale-105`}
    >
      <div className="mb-2 flex justify-center">{icon}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm font-medium">{title}</div>
    </div>
  );
};

const Section = ({ title, data, onDelete, onUpdate,icon }) => {
  const [expandedId, setExpandedId] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "responded":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "urgent":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getPriorityIcon = (status) => {
    switch (status.toLowerCase()) {
      case "urgent":
        return <FaExclamationTriangle className="inline mr-1" />;
      case "pending":
        return <FaClock className="inline mr-1" />;
      case "responded":
        return <FaCheckCircle className="inline mr-1" />;
      default:
        return null;
    }
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-800 px-6 py-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          {title}
          <span className="text-sm font-normal bg-white text-gray-800 px-3 py-1 rounded-full">
            {data.length}
          </span>
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Contact Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <>
                <tr
                  key={item._id}
                  className={`hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <FaUser className="text-gray-500" />
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-600 flex items-center gap-2">
                        <FaEnvelope className="text-gray-500" />
                        {item.email}
                      </div>
                      <div className="text-xs text-gray-600 flex items-center gap-2">
                        <FaPhone className="text-gray-500" />
                        {item.phone}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <FaBook className="text-blue-600" />
                      {item.course}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700 max-w-xs">
                      <p className="line-clamp-2" title={item.message}>
                        {item.message}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeColor(
                        item.status,
                      )}`}
                    >
                      {getPriorityIcon(item.status)}
                      {item.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <FaCalendar className="text-gray-500" />
                      {formatDate(item.createdAt)}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          setExpandedId(
                            expandedId === item._id ? null : item._id,
                          )
                        }
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center gap-1"
                      >
                        <FaEdit />
                        {expandedId === item._id ? "Close" : "Manage"}
                      </button>
                      <button
                        onClick={() => onDelete(item._id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors font-medium flex items-center gap-1"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>

                {expandedId === item._id && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100"
                    >
                      <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-lg p-6 shadow-inner">
                          <h4 className="text-sm font-semibold text-gray-700 mb-4 text-center flex items-center justify-center gap-2">
                            <FaEdit className="text-blue-600" />
                            Change Inquiry Status
                          </h4>
                          <div className="flex gap-3 justify-center flex-wrap">
                            {item.status !== "responded" && (
                              <button
                                onClick={() => onUpdate(item._id, "responded")}
                                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2"
                              >
                                <FaCheckCircle />
                                Mark as Responded
                              </button>
                            )}
                            {item.status !== "urgent" && (
                              <button
                                onClick={() => onUpdate(item._id, "urgent")}
                                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2"
                              >
                                <FaExclamationTriangle />
                                Mark as Urgent
                              </button>
                            )}
                            {item.status !== "pending" && (
                              <button
                                onClick={() => onUpdate(item._id, "pending")}
                                className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2"
                              >
                                <FaClock />
                                Mark as Pending
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInquiry;
