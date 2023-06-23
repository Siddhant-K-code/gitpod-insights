import React, { useState } from "react";
import Rechart from "./rechart";
import FileInput from "./fileInput";
import { parse } from "papaparse";
import { ParseResult } from "papaparse";

function App() {
  const [csvData, setCsvData] = useState(null);

  const getCsvFile = (file: string | File | NodeJS.ReadableStream) => {
    let csvArr:
      | {
          userName: string;
          teamId: string;
          startTime: string;
          contextUrl: string;
          credits: number;
          workspaceId: string;
          workspaceType: string;
          workspaceClass: string;
        }[]
      | React.SetStateAction<null>
      | unknown[][] = [];

    parse(file, {
      worker: true,
      step: (result: ParseResult<any>) => {
        // @ts-ignore
        csvArr.push(result.data);
      },
      complete: () => {
        //remove last element of the CSV-Array (empty string)
        // @ts-ignore
        csvArr.pop();
        //remove first element of the CSV-Array (table headers)
        // @ts-ignore
        csvArr.shift();

        //transform CSV Arr into objects
        // @ts-ignore
        const csvDataStructuredAsObjects = csvArr.map((value) => {
          return {
            userName: value[10],
            teamId: value[1].slice(5),
            startTime: value[11].slice(0, 10),
            contextUrl: value[12],
            credits: parseFloat(value[3]),
            workspaceId: value[13],
            workspaceType: value[15],
            workspaceClass: value[16],
          };
        });

        //structure CSV-Data by date
        const csvDataStructuredByStartTime = csvDataStructuredAsObjects.reduce(
          // @ts-ignore
          (acc, obj) => {
            const key = obj.startTime;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
          },
          {}
        );
        console.log(csvDataStructuredByStartTime);
        // @ts-ignore
        setCsvData(csvDataStructuredByStartTime);
      },
    });
  };

  return (
    <div className="App">
      <FileInput callback={getCsvFile} />
      {csvData ? <Rechart csvData={csvData} /> : ""}
    </div>
  );
}

export default App;
