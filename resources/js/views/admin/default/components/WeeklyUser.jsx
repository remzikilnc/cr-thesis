import React from "react";
import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdBarChart,
} from "react-icons/md";
import Card from "@/components/admin/card";
import {
  lineChartOptionsTotalSpent,
} from "@/variables/admin/charts";
import LineChart from "@/components/admin/charts/LineChart";

const WeeklyUser = (props) => {

    const totalValues = Object.values(props.boardData).reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    //chart
    lineChartOptionsTotalSpent.xaxis.categories = Object.keys(props.boardData)
    const chartData = {
        name: "Today",
        data: Object.values(props.boardData),
        color: "#4318FF",
    };

    return (
    <Card extra="!p-[20px] text-center">
        <h2 className="text-lg font-bold text-left text-navy-700 dark:text-white">
            Weekly New Users
        </h2>
      <div className="flex justify-between">
        <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium text-gray-600">Week</span>
        </button>
        <button className="!linear z-[1] flex items-center mb-3 justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
              {totalValues}
          </p>
          <div className="flex flex-col">
            <p className="mt-2 text-sm text-gray-600">Change</p>
            <div className="flex flex-row items-center justify-center">
              <MdArrowDropUp className="font-medium text-green-500" />
              <p className="text-sm font-bold text-green-500">
                  {'%'+ props.WeeklyChangeData.toFixed(2)} </p>
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <LineChart
            options={lineChartOptionsTotalSpent}
            series={chartData}
          />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyUser;
