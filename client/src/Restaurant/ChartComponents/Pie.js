import { Pie } from "react-chartjs-2"

import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement);

export const PieGraph = () => {
    const options = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    generateLabels: (chart) => {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map((label, i) => {
                                const meta = chart.getDatasetMeta(0);
                                const ds = data.datasets[0];
                                const value = ds.data[i];
                                const backgroundColor = ds.backgroundColor[i];
                                return {
                                    text: `${label}: ${value}`,
                                    fillStyle: backgroundColor,
                                    hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                    index: i,
                                };
                            });
                        }
                        return [];
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        let label = tooltipItem.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += tooltipItem.raw;
                        return label;
                    }
                }
            }
        }
    };


    const pieChartData = {
        labels: ["Rent", "Groceries", "Utilities", "Entertainment", "Transportation"],
        datasets: [
            {
                label: "Expenses",
                data: [1200, 300, 150, 180, 100],
                backgroundColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                hoverOffset: 4,
            },
        ],
    };

    return <Pie options={options} data={pieChartData} />;
}