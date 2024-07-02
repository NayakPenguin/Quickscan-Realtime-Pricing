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
    8.99, 17.99, 15.99, 14.99, 7.99, 16.99, 14.99, 10.99, 10.99, 11.99, 15.99, 13.99, 12.99, 8.99, 9.99, 16.99
  ];

  const barChartData = {
    labels: [
      "Spinach and Feta Salad", "Steak Fajitas", "Shrimp Scampi", "Vegetarian Sushi",
      "Caprese Salad", "Tomato Basil Bruschetta", "Lemon Garlic Butter Shrimp",
      "Beef and Broccoli Stir-Fry", "Quinoa and Roasted Vegetables", "Margherita Pizza",
      "Beef Tacos", "Teriyaki Glazed Salmon", "BBQ Pulled Pork Sandwich", "Chicken Alfredo Pasta",
      "Greek Salad", "Pesto Pasta", "Grilled Salmon"
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
