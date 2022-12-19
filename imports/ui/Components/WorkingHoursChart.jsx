import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

export const WorkingHoursChart = () => {
  const [data, setData] = useState({
    labels: ["Employee 1", "Employee 2", "Employee 3"],
    datasets: [
      {
        label: "Hours Worked",
        data: [40, 50, 60],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  return (
    <div>
      <Bar
        data={data}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
