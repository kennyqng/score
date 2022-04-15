import React from "react";
import { Link } from "react-router-dom";
import { Button, Slider, Box, Grid, Icon } from "@mui/material/";
import "./Log.css";

function Log(props) {
  function total() {
    let player1 = 0;
    let player2 = 0;
    let player3 = 0;
    let player4 = 0;
    props.arr.map(item => {
      player1 += item[0];
      player2 += item[1];
      player3 += item[2];
      player4 += item[3];
    });
    const playerTotal = [player1, player2, player3, player4];
    return playerTotal;
  }
  let names = JSON.parse(localStorage.getItem("storedNames")) || [
    "p1",
    "p2",
    "p3",
    "p4"
  ];

  return (
    <div>
      <div className="edit-link">
      <Link to="/edit">
        <Icon>edit</Icon>
      </Link>        
      </div>

      <Box className="log-container" borderRadius={10}>
        <div className="edit-container"></div>
        <table>
          <tbody>
            <tr className="header-names">
              {names.map(name => {
                return (
                  <td className="log-name" key={name}>
                    {name}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            {props.arr.map((item, index) => {
              return (
                <tr className="table">
                  <td className={item[0] < 0 ? "red-column" : "column"}>
                    {item[0]}
                  </td>
                  <td className={item[1] < 0 ? "red-column" : "column"}>
                    {item[1]}
                  </td>
                  <td className={item[2] < 0 ? "red-column" : "column"}>
                    {item[2]}
                  </td>
                  <td className={item[3] < 0 ? "red-column" : "column"}>
                    {item[3]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
    </div>
  );
}

export default Log;
