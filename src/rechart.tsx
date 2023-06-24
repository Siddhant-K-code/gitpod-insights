import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface RechartProps {
  csvData: {
    [key: string]: {
      userName: string;
      teamId: string;
      startTime: string;
      contextUrl: string;
      credits: number;
      workspaceId: string;
      workspaceType: string;
      workspaceClass: string;
    }[];
  } | null;
}

const Rechart = ({ csvData }: RechartProps): JSX.Element => {
  let colors = [
    "#233666",
    "#96ADEA",
    "#4F79E6",
    "#414C66",
    "#3D5EB3",
    "#233666",
    "#96ADEA",
    "#4F79E6",
    "#414C66",
    "#3D5EB3",
  ];
  let userNames: (string | number)[] = [];

  //[{name: startTime, (repositoryName: credits)* }* ]
  const sortedData = () => {
    let tempSortedDataArr = [];

    for (let startTime in csvData) {
      let finalObj = {};

      csvData[startTime].forEach(
        (obj: { userName: string | number; credits: number }) => {
          obj.userName in finalObj
            ? // @ts-ignore
              (finalObj[obj.userName] = finalObj[obj.userName] + obj.credits) // @ts-ignore
            : (finalObj[obj.userName] = obj.credits);
          if (!userNames.includes(obj.userName)) userNames.push(obj.userName);
        }
      );
      // @ts-ignore
      finalObj["name"] = startTime;
      tempSortedDataArr.push(finalObj);
    }
    return tempSortedDataArr;
  };

  return (
    <BarChart
      width={1000}
      height={600}
      data={sortedData()}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {/*TODO: color array is finite */}
      {userNames.map((category, index) => (
        <Bar dataKey={category} stackId="a" fill={colors[index]} key={index} />
      ))}
    </BarChart>
  );
};

export default Rechart;
