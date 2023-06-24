import React, {useState} from "react";
import {GitpodDailyEntry} from "../csv-reader";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


interface BillingChartProps {
    csvData: GitpodDailyEntry[]/*{
        [key: string]: GitpodDailyEntry[]
    }*/ | null
}


const BillingChart = ({csvData}: BillingChartProps): JSX.Element => {
    const [sortedBy, setSortedBy] = useState("daily");

    const colors = ["#233666", "#96ADEA", "#4F79E6", "#414C66", "#3D5EB3", "#233666", "#96ADEA", "#4F79E6", "#414C66", "#3D5EB3"]
    let userNames: (string | number)[] = []
    const dropdownMenuOptions = ['daily', 'weekly'];


    // @ts-ignore
    const csvDataStructuredByDate: {[key: string]: GitpodDailyEntry[]} = csvData.reduce((acc: { [key: string]: GitpodDailyEntry[] }, obj: GitpodDailyEntry) => {
        const key: string = obj.startTime;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});

    const getWeekNumber = (dateAsString: string) => {
        const d: Date  = new Date(dateAsString)
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart: Date = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        //@ts-ignore
        const weekNumber: number = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

        return weekNumber
    }

    const groupDataByDay = () => {
        let tempGroupedByDayArray = []
        for (let date in csvDataStructuredByDate) {
            let finalObj: { [key: string]: any } = {}
            // @ts-ignore
            csvDataStructuredByDate[date].forEach((obj: { userName: string | number; totalCredits: number; }) => {
                (obj.userName in finalObj) ? finalObj[obj.userName] = finalObj[obj.userName] + obj.totalCredits : finalObj[obj.userName] = obj.totalCredits

                finalObj[obj.userName] = parseFloat(finalObj[obj.userName].toFixed(4))
                if (!userNames.includes(obj.userName)) userNames.push(obj.userName)
            })
            finalObj["name"] = date
            tempGroupedByDayArray.push(finalObj)
        }
        return tempGroupedByDayArray
    }

    // @ts-ignore
    const groupDataByWeek = (groupedByDayArray) => {
        // @ts-ignore
        const dataSortedByWeekNumbers = groupedByDayArray.reduce((acc, obj) => {
            const key: number = getWeekNumber(obj.name);
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});

        let sortedByWeekNumberArray = []
        //sum up the credits of each user to get the total credit per week
        for(let week in dataSortedByWeekNumbers){

            let finalObj = {}
            // @ts-ignore
            //iterating over an array containing objects with the date as name and the user-names with credits for this date
            dataSortedByWeekNumbers[week].forEach(obj => {
                for(let entry in obj){
                    //only the users with the credits are relevant
                    if(entry === "name") continue
                    // @ts-ignore
                    (entry in finalObj) ? finalObj[entry] = finalObj[entry] + obj[entry] : finalObj[entry] = obj[entry]
                    // @ts-ignore
                    finalObj[entry] = parseFloat(finalObj[entry].toFixed(4))
                }
            })
            // @ts-ignore
            finalObj["name"] = week
            sortedByWeekNumberArray.push(finalObj)
        }
        return sortedByWeekNumberArray
    }

    //[{name: date, (userName: value)* }* ]
    const structuredData = () => {
        const groupedByDayArray = groupDataByDay()
        if (sortedBy === "daily") {
            return groupedByDayArray
        } else {
            return groupDataByWeek(groupedByDayArray)
        }
    }


    return (
        <div>
            <Dropdown options={dropdownMenuOptions} onChange={(selectedValue) => {
                setSortedBy(selectedValue.value)
            }} value={sortedBy} placeholder="Select an option"/>
            <BarChart
                width={1000}
                height={600}
                data={structuredData()}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="2 2"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                {/*TODO: color array is finite */}
                {userNames.map((category, index) => <Bar dataKey={category} stackId="a" fill={colors[index]}
                                                               key={index}/>)}
            </BarChart>
        </div>
    )

}

export default BillingChart