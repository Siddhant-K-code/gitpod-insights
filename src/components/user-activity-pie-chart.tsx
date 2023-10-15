import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { groupBy, sumBy, orderBy } from "lodash";
import { useState } from "react";

interface PieData {
  name: string;
  value: number;
  color: string;
}

interface UserActivityPieChartProps {
  csvData: { userName: string; credits: number }[];
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const UserActivityPieChart: React.FC<UserActivityPieChartProps> = ({
  csvData,
}) => {
  // Group by userName and sum their credits
  const groupedData = groupBy(csvData, "userName");
  const pieData: PieData[] = orderBy(
    Object.keys(groupedData).map((userName) => ({
      name: userName,
      value: sumBy(groupedData[userName], "credits"),
      color: getRandomColor(),
    })),
    "value",
    "desc" // Sort by credits in descending order
  );

  const [sortConfig, setSortConfig] = useState<{
    key: keyof PieData;
    direction: "asc" | "desc";
  }>({ key: "value", direction: "desc" });

  const sortedData = orderBy(pieData, [sortConfig.key], [sortConfig.direction]);

  const requestSort = (key: keyof PieData) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ width: "50%", height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              // label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
              //   const RADIAN = Math.PI / 180;
              //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              //   const x  = cx + radius * Math.cos(-midAngle * RADIAN);
              //   const y = cy  + radius * Math.sin(-midAngle * RADIAN);
              //   return (
              //     <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
              //       {`${name} (${value})`}
              //     </text>
              //   );
              // }}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${(+value).toFixed(2)} Credits`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginLeft: 20 }}>
        <h3>User Credits Usage</h3>
        <div className="styled-table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Color</th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => requestSort("name")}
                >
                  User
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => requestSort("value")}
                >
                  Credits
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((data, index) => (
                <tr key={index}>
                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        width: 20,
                        height: 20,
                        backgroundColor: data.color,
                      }}
                    ></span>
                  </td>
                  <td>{data.name}</td>
                  <td>{(+data.value).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserActivityPieChart;
