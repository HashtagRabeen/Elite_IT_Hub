import React from "react";
import {motion} from "framer-motion"
const StatCard = ({ title, value, icon,onClick }) => {
  return (
    <div className="flex gap-4 p-4">
      <button onClick={onClick} className="w-full md:w-96">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-5 text-center shadow-md rounded hover:scale-105 transition"
        >
          <div className="flex justify-center mb-2">
            <span className="p-3 bg-gray-100 rounded-full shadow">{icon}</span>
          </div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-4xl font-bold">{value}</p>
        </motion.div>
      </button>
    </div>
  );
};

export default StatCard;
