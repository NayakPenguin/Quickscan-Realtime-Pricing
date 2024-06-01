import React, { useState, useEffect } from "react";
import LeftMenu from "../Components/LeftMenu";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { Bar } from 'react-chartjs-2';

const Analytics = () => {
  const [pageID, setPageID] = useState("analytics");
  const [chartData, setChartData] = useState({
    labels: Array(7).fill('').map((_, i) => `Day ${i + 1}`), // Dummy day labels
    datasets: [
      {
        label: 'Daily Values',
        data: Array(7).fill(0), // Initialize with 0s for random values
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Generate random data for each day
    const randomData = chartData.datasets[0].data.map(() =>
      Math.floor(Math.random() * 100) // Adjust range as needed
    );

    // Update chart data
    setChartData({
      ...chartData,
      datasets: [
        {
          ...chartData.datasets[0],
          data: randomData,
        },
      ],
    });
  }, []);

  return (
    <Container>
      <LeftMenu pageID={pageID} />
      <Navbar />

      <h1>Analytics</h1>
      {/* <div style={{position: 'relative', width: 800, height: 400}}>
        <Bar data={chartData} options={{
          scales: {
            x: {
              type: 'category',
              labels: chartData.labels,
            },
          },
        }} />
      </div> */}
    </Container>
  )
}

export default Analytics;

const Container = styled.div`
  background-color: #fff6e659;
  width: 100vw;
  min-height: 100vh;
  padding: 100px 40px 40px 300px;
  h1{
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 30px;
  } 
`
