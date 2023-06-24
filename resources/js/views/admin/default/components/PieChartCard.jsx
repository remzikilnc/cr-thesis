import PieChart from "@/components/admin/charts/PieChart";
import {pieChartOptions } from "@/variables/admin/charts";
import Card from "@/components/admin/card";
import {getRandomColor} from "@/utils/randomColor";

const PieChartCard = (props) => {
    const {pieChartFooterParentCount, pieChartFooterChildCount } = props;
    const {title,footerParentTitle, footerChildTitle, bottomRight} = props;
    const arrayData = Object.values(props.pieChartData).filter(item => typeof item === 'object');
        pieChartOptions.labels = arrayData.map(item => item.category);
        const pieChartData = arrayData.map(item => item.count);
        pieChartOptions.colors = Array.from({length: pieChartOptions.labels.length}, () => getRandomColor());
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white ">
              {title}
          </h4>
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center mt-5">
        <PieChart options={pieChartOptions} series={pieChartData} />
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <p className="ml-1 text-sm font-normal text-gray-600">{footerParentTitle}</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
              {pieChartFooterParentCount}
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <p className="ml-1 text-sm font-normal text-gray-600">{footerChildTitle}</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
              {pieChartFooterChildCount}
          </p>
        </div>

          <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

          <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center">
                  <p className="ml-1 text-sm font-normal text-gray-600">{bottomRight}</p>
              </div>
              <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
                  {'% '+((pieChartFooterChildCount / pieChartFooterParentCount) * 100).toFixed(2)}
              </p>
          </div>
      </div>
    </Card>
  );
};

export default PieChartCard;
