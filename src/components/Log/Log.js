import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Icon } from "@mui/material/";
import "./Log.css";

function Log(props) {
  let names = JSON.parse(localStorage.getItem("storedNames")) || [
    "Duy",
    "Kenny",
    "Vennesa",
    "Leo"
  ];

  let stats = [0, 0, 0, 0];
  let reversedLocal = props.arr.slice(0).reverse();
  let playerStat = reversedLocal.map(item => [
    (stats[0] += item[0]),
    (stats[1] += item[1]),
    (stats[2] += item[2]),
    (stats[3] += item[3])
  ]);

  const [display, setDisplay] = useState(props.arr);
  const [tap, setTap] = useState(0);

  return (
    <Box className="log" item sx={{ width: 320 }}>
      <div className="log-buttons">
      </div>


      <Box className="log-container">
      <div className="edit-link-div">
      <button onClick={() => setDisplay(props.arr) & setTap(0)} style={tap === 0 ? {textDecoration:"underline"} : {textDecoration:"none"}}>Transactions</button>
      <button onClick={() => setDisplay(playerStat) & setTap(1)} style={tap === 1 ? {textDecoration:"underline"} : {textDecoration:"none"}}>Previous Totals</button>
        <Link className="edit-link" to="/edit">
          <Icon>edit</Icon>
        </Link>
      </div>
      <div className="log-data">
        <Grid className="header-names" container spacing={0}>
          {names.map(name => {
            return (
              <Grid className="log-name" item xs={3} key={name}>
                {name}
              </Grid>
            );
          })}
          {display.map((item, index) => {
            return (
              <Grid className="table" container spacing={0}>
                <Grid
                  className={item[0] < 0 ? "red-column" : "column"}
                  item
                  xs={3}
                >
                  {item[0]}
                </Grid>
                <Grid
                  className={item[1] < 0 ? "red-column" : "column"}
                  item
                  xs={3}
                >
                  {item[1]}
                </Grid>
                <Grid
                  className={item[2] < 0 ? "red-column" : "column"}
                  item
                  xs={3}
                >
                  {item[2]}
                </Grid>
                <Grid
                  className={item[3] < 0 ? "red-column" : "column"}
                  item
                  xs={3}
                >
                  {item[3]}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </div>
      </Box>
    </Box>
  );
}

export default Log;
