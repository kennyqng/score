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
    let names = JSON.parse(localStorage.getItem("storedNames")) || ["Duy","Kenny","Venessa","Nghia"];
    const [local] = useState(() => {
      const saved = localStorage.getItem("scoreData");
      const initialValue = JSON.parse(saved);
      return initialValue || [];
    });
    
    let reversedLocal = local.slice(0).reverse();
    let stats = [0,0,0,0];
    let player1 = reversedLocal.map(item => stats[0] += item[0]);
    let player2 = reversedLocal.map(item => stats[1] += item[1]);
    let player3 = reversedLocal.map(item => stats[2] += item[2]);
    let player4 = reversedLocal.map(item => stats[3] += item[3]);
    const labels = Array.from({ length: player1.length }, (e, i) => i+1);
    console.log(labels);
    
    const [orientation, setOrientation] = useState("rotate(90deg)");
    const [height, setHeight] = useState("300px");
    const [width, setWidth] = useState("600px");
    function handleRotate (mode) {
      if (mode === "portrait") {
        setOrientation("rotate(0deg)");
        setWidth("300px");
        setHeight("600px");
      } else if (mode === "landscape") {
        setOrientation("rotate(90deg)");
      setWidth("600px");
      setHeight("300px");
    }
  }
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
const options = {
  aspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "bottom"
    },
    title: {
      display: true,
      text: "History of Totals"
    }
  }
};

  return (
    <div className="Graph">
      <button className="rotate-button"
      onClick={() => {orientation === "rotate(0deg)" ? handleRotate("landscape") : handleRotate("portrait") }}
      >
        Rotate</button>
      <div className="chart" 
      style={{transform: orientation}}
      >
      <Line options={options} data={data}/>
      </div>
    </div>
  );
}

export default Graph;