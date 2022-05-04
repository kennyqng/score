import React from "react";
import { Box, Grid } from "@mui/material/";
import "./Total.css";

function Total (props) {
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
        "Player1",
        "Player2",
        "Player3",
        "Player4"
      ];

    return (
        <div className="Total">
          <Box className="total-names">
            <Grid className="grid-name-point" container spacing={0} >
            {names.map(name => {
              return<Grid className="total-name" item xs={3} > {name}</Grid>
            })}
          </Grid>
          <Grid className="header-total" container spacing={0}>
            {total().map(item => {
              return <Grid className={item < 0 ? 'red-total-column-header' : 'total-column-header'} item xs={3} > {item}</Grid>;
            })}
          </Grid>
          </Box>
        </div>
    );
}

export default Total;