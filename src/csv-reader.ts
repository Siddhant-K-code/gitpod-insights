import { parse, ParseResult } from "papaparse";

export interface UsageReportCsvEntry {
  userName: string;
  teamId: string;
  startTime: string;
  contextUrl: string;
  credits: number;
  workspaceId: string;
  workspaceType: string;
  workspaceClass: string;
}

export interface UsageReportEntry extends UsageReportCsvEntry {
  totalCredits: number;
}

export const getCsvFile = (
  file: File
): Promise</*{ [key: string]: UsageReportEntry[] }*/ UsageReportEntry[]> => {
  return new Promise((resolve) => {
    const csvArray: string[][] = [];

    parse(file, {
      worker: true,
      step: (result: ParseResult<any>) => {
        csvArray.push(result.data);
      },
      complete: () => {
        //last element is an empty string
        csvArray.pop();
        //first element is an array with the headlines and no relevant data
        csvArray.shift();

        const csvDataStructuredAsObjects: UsageReportCsvEntry[] = csvArray.map(
          (value) => {
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
          }
        );

        const gitpodBillingEntries: UsageReportEntry[] =
          csvDataStructuredAsObjects.map((UsageReportCsvEntry) => {
            return {
              ...UsageReportCsvEntry,
              totalCredits: parseFloat(UsageReportCsvEntry.credits.toFixed(2)),
            };
          });
        resolve(gitpodBillingEntries);
      },
    });
  });
};
