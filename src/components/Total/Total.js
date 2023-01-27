import { React, useState } from "react";
import { Box, Grid, Switch } from "@mui/material/";
import "./Total.css";

function Total (props) {
    function total() {
      let players = [0, 0, 0, 0];
        props.arr.map(item => {
          players[0] += item[0];
          players[1] += item[1];
          players[2] += item[2];
          players[3] += item[3];
        });
        return players;
      }
      let names = JSON.parse(localStorage.getItem("storedNames")) || ["Duy","Kenny","Venessa","Nghia"];
      const gradientPresets = [
        //iron patriot
        'linear-gradient(152deg, rgba(30,25,60,1) 0%, rgba(114,120,150,1) 27%, rgba(161,26,76,1) 50%, rgba(15,104,150,1) 74%, rgba(56,18,74,1) 100%)',
        //original purple
        'linear-gradient(124deg, rgba(101,206,232,1) 49%, rgba(128,0,255,1) 100%)',
        //sunset
        'linear-gradient(54deg, rgba(139,61,121,1) 0%, rgba(255,82,48,1) 28%, rgba(254,184,98,1) 51%, rgba(223,90,117,1) 71%, rgba(59,49,124,1) 100%)',
        //unicorn
        'linear-gradient(328deg, rgba(254,230,0,1) 0%, rgba(246,165,186,1) 27%, rgba(78,215,255,1) 59%, rgba(255,59,201,1) 100%)',
        //pineapple
        'linear-gradient(114deg, rgba(34,193,195,1) 0%, rgba(98,191,152,1) 29%, rgba(115,191,140,1) 37%, rgba(133,190,128,1) 45%, rgba(253,187,45,1) 100%)',
        //blue
        '#1976d2'
      ];
      const lead  = JSON.parse(localStorage.getItem("leader"));
    
    const [usdView, setusdView]  = useState(false);

    function toUSD(point) {
      let result = "";
      if(point < 0) {
        result = "-$";
      } else result = "$";

    return (result + Math.abs(point)/2)
    }
    const handleSwitch = event => {
      setusdView(event.target.checked);
    };

    return (
        <div className="Total">
          <Box className="total-names" style={{
            background: gradientPresets[props.color], opacity:props.opa
          }} >
            <Grid className="grid-name-point" container spacing={0} >
            {names.map((name, index) => {return(
              <Grid className="total-name" item xs={3} >
                <div className="king">
              {index === lead ? "👑" : ""} 
                  </div> 
              {name}
              </Grid>)
            })}
          </Grid>
          <Grid className="header-total" container spacing={0}>
            {total().map(item => {
              return <Grid className={usdView ? 'total-column-header-usd': 'total-column-header'} item xs={3} > {usdView ? toUSD(item): item }</Grid>;
            })}
          </Grid>
          <Grid className="total-buttons" container spacing={0}>
            <Grid className="total-buttons"  xs={8}></Grid>
            <Grid className="total-buttons"  xs={2}>
              <p className="total-button-name"></p>
            </Grid>
            <Grid className="total-buttons"  xs={2}>
              <Switch className="usd-switch" size="small" checked={usdView} onChange={handleSwitch} />
            </Grid>
          </Grid>
          </Box>
        </div>
    );
}

export default Total;