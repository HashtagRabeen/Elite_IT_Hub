import React, { useState } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

function DashboardPie({ data }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  return (
    <div>
      <div className="flex justify-center">
        <PieChart width={700} height={420} className="outline-none">
          <Pie
            activeIndex={activeIndex}
            data={data}
            dataKey="value"
            nameKey="title"
            outerRadius={200}
            fill="green"
            onMouseEnter={onPieEnter}
            style={{ cursor: "pointer", outline: "none" }} // Ensure no outline on focus
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

export default DashboardPie;
