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
      const gradientPresets = [
        'linear-gradient(152deg, rgba(30,25,60,1) 0%, rgba(114,120,150,1) 27%, rgba(161,26,76,1) 50%, rgba(15,104,150,1) 74%, rgba(56,18,74,1) 100%)',
        'linear-gradient(124deg, rgba(101,206,232,1) 49%, rgba(128,0,255,1) 100%)',
        'linear-gradient(124deg, rgba(223,90,78,1) 33%, rgba(252,0,255,0.8211659663865546) 100%)',
        'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
        'linear-gradient(114deg, rgba(34,193,195,1) 0%, rgba(98,191,152,1) 29%, rgba(115,191,140,1) 37%, rgba(133,190,128,1) 45%, rgba(253,187,45,1) 100%)'
      ];

    return (
        <div className="Total">
          <Box className="total-names" style={{
              background: gradientPresets[props.color]
          }} >
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