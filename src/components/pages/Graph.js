import React from "react";
import { useState } from "react";
import "./Graph.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

function Graph() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    aspectRatio: 1,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      },
      title: {
        display: true,
        text: "Total Histories"
      }
    }
  };
  let names = JSON.parse(localStorage.getItem("storedNames")) || ["Duy","Kenny","Venessa","Nghia"];
  const [local] = useState(() => {
    const saved = localStorage.getItem("scoreData");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  let reversedLocal = local.slice(0).reverse();

  let player1 = reversedLocal.map(item => item[0]);
  let player2 = reversedLocal.map(item => item[1]);
  let player3 = reversedLocal.map(item => item[2]);
  let player4 = reversedLocal.map(item => item[3]);
  const labels = Array.from({ length: player1.length }, (e, i) => i);
  console.log(labels);
  const data = {
    labels,
    datasets: [
      {
        label: names[0],
        data: player1,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      },
      {
        label: names[1],
        data: player2,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      },
      {
        label: names[2],
        data: player3,
        borderColor: "rgb(53, 235, 53)",
        backgroundColor: "rgba(53, 235, 105, 0.5)"
      },
      {
        label:names[3],
        data: player4,
        borderColor: "rgb(235, 232, 53)",
        backgroundColor: "rgba(229, 235, 53, 0.5)"
      }
    ]
  };

  return (
    <div className="Graph">
      {/* <div>This is the Graph</div>
            <div>{JSON.stringify(player1)}</div>
            <div>{JSON.stringify(player2)}</div>
            <div>{JSON.stringify(player3)}</div>
        <div>{JSON.stringify(player4)}</div> */}
        <div className="chart">
      <Line options={options} data={data}/>
        </div>
    </div>
  );
}

export default Graph;