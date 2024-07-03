import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarGraph = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Food Items Price Comparison',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  // Random prices for demonstration
  const randomPrices = [
    8.99, 17.99, 15.99, 14.99, 7.99, 16.99, 14.99, 10.99, 10.99, 11.99, 15.99, 13.99, 12.99, 8.99, 9.99, 16.99, 8.99, 22.50
  ];

  const barChartData = {
    labels: [
      "Butter Chicken",
      "Paneer Tikka",
      "Fish Curry",
      "Vegetable Biryani",
      "Chicken Tandoori",
      "Prawn Masala",
      "Palak Paneer",
      "Dal Makhani",
      "Mutton Rogan Josh",
      "Masala Dosa",
      "Chicken Biryani",
      "Aloo Gobi",
      "Keema Pav",
      "Chole Bhature",
      "Chicken Tikka Salad",
      "Pesto Pasta",
      "Tandoori Salmon",
      "Greek Salad"
    ],
    datasets: [
      {
        label: "Price",
        data: randomPrices.map(price => (price*100).toFixed(2)),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Optimized Price",
        data: randomPrices.map(price => (price * (Math.random() * (40 - 7) + 7)).toFixed(2)), 
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={barChartData} />;
};
