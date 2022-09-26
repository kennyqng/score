import React from "react";
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

  let stat1 = 0;
  let stat2 = 0;
  let stat3 = 0;
  let stat4 = 0;

  let reversedLocal = props.arr.slice(0).reverse();
  let playerStat = reversedLocal.map(item => [
    stat1 += item[0],
    stat2 += item[1],
    stat3 += item[2],
    stat4 += item[3]
  ]);

  return (
    <Box className="log" item sx={{ width: 320 }}>
      <div className="edit-link-div">
        <Link className="edit-link" to="/edit">
          <Icon>edit</Icon>
        </Link>
      </div>

      <Box className="log-container">
        <Grid className="header-names" container spacing={0}>
              {names.map(name => {
                return (
                  <Grid className="log-name" item xs={3} key={name}>
                    {name}
                  </Grid>
                );
              })}
        {props.arr.map((item, index) => {
              return (
                <Grid className="table" container spacing={0}>
                  <Grid className={item[0] < 0 ? "red-column" : "column"} item xs={3}>
                    {item[0]}
                  </Grid>
                  <Grid className={item[1] < 0 ? "red-column" : "column"} item xs={3}>
                    {item[1]}
                  </Grid>
                  <Grid className={item[2] < 0 ? "red-column" : "column"} item xs={3}>
                    {item[2]}
                  </Grid>
                  <Grid className={item[3] < 0 ? "red-column" : "column"} item xs={3}>
                    {item[3]}
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
      </Box>

      <div className="spacing"></div>

      <Box className="log-container">
        <Grid className="header-names" container spacing={0}>
              {names.map(name => {
                return (
                  <Grid className="log-name" item xs={3} key={name}>
                    {name}
                  </Grid>
                );
              })}

        {playerStat.slice(0).reverse().map((item, index) => {
              return (
                <Grid className="table" container spacing={0}>
                  <Grid className={item[0] < 0 ? "red-column" : "column"} item xs={3}>
                    {item[0]}
                  </Grid>
                  <Grid className={item[1] < 0 ? "red-column" : "column"} item xs={3}>
                    {item[1]}
                  </Grid>
                  <Grid className={item[2] < 0 ? "red-column" : "column"} item xs={3}>
                    {item[2]}
                  </Grid>
                  <Grid className={item[3] < 0 ? "red-column" : "column"} item xs={3}>
                    {item[3]}
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
      </Box>

    </Box>
  );
}

export default Log;
