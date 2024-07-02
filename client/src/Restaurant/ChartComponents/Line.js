import { Line } from "react-chartjs-2"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale, 
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"


ChartJS.register(
    CategoryScale,
    LinearScale, 
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)



export const LineGraph = () => {
    const options = {};

    const lineChartData = {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ], datasets : [
          {
            label: "Steps",
            data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
            borderColor: "black",
          },
        ],
      };

    return <Line options={options} data={lineChartData} />;
}