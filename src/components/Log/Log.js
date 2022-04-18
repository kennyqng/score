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
    "player 1",
    "player 2",
    "player 3",
    "player 4"
  ];

  return (
    <Box className="log" item sx={{ width: 320 }}>
      <div className="edit-link-div">
        <Link className="edit-link" to="/edit">
          <Icon>edit</Icon>
        </Link>
      </div>

      <Box className="log-container" borderRadius={5}>
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
    </Box>
  );
}

export default Log;
