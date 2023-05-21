import Chart from "react-apexcharts";

const LineChart = (props) => {
    const {series, options} = props;
    const formattedSeries = [{
        name: series.name, data: series.data, color: series.color
    }];

    return (<Chart
        options={options}
        type="line"
        width="100%"
        height="100%"
        series={formattedSeries}
    />);
};

export default LineChart;
