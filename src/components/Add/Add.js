import { useEffect, useState } from "react";
import Log from "../Log/Log";
import Total from "../Total/Total";
import dealer from "../../assets/Dealer.svg";
import "./Add.css";
import { Button, Slider, Box, Grid, Icon, Switch, useThemeProps } from "@mui/material/";

function Add(props) {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  const [number4, setNumber4] = useState(0);
  const [total, setTotal] = useState(number1 + number2 + number3 + number4);
  let names = JSON.parse(localStorage.getItem("storedNames")) || [
    "Player 1",
    "Player 2",
    "Player 3",
    "Player 4"
  ];
  const colorPreset = [
    '#0f6896',
    '#4B1980',
    '#df5a4e',
    '#94bbe9',
    '#22c1c3'
  ]
  const [bigWin, setBigWin] = useState(false);
  const handleSwitch = event => {
    setBigWin(event.target.checked);
  };
  const minValue = bigWin ? -100 : -27;
  const maxValue = bigWin ? 100 : 27;

  const marks = bigWin
    ? [
        {
          value: -100,
          label: "-100"
        },
        {
          value: 0,
          label: "0"
        },
        {
          value: 100,
          label: "100"
        }
      ]
    : null;
  
  const [local, setLocal] = useState(() => {
    const saved = localStorage.getItem("scoreData");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useEffect(() => {
    localStorage.setItem("scoreData", JSON.stringify(local));
    setTotal(number1 + number2 + number3 + number4);
  },[local, number1, number2, number3, number4]);

  const [roundCounter, setRoundCounter] = useState(() => {
    const initialValue = parseInt(localStorage.getItem("roundNumber"));
    return initialValue || 1;
  });

  function handleSubmit() {
    if (total === 0) {
      const play = [number1, number2, number3, number4];
      setLocal(arr => [play, ...arr]);
      setNumber1(0);
      setNumber2(0);
      setNumber3(0);
      setNumber4(0);
      setRoundCounter(roundCounter + 1);
      localStorage.setItem("roundNumber", roundCounter + 1);
    } else console.log("Cannot submit. Sum of scores is not zero.");
  }

  return (
    <Box className="Add">
      <Total arr={local} color={props.color}/>
      <Box className="control">
        <Grid container spacing={0}>
          <Grid className="" item xs={4}>
            <p className="round-counter">Round: {roundCounter}</p>
          </Grid>
          <Grid className="" item xs={3}>
            <p className={total === 0 ? "sum-text-blue" : "sum-text"}>
              Sum: {isNaN(total) ? 0 : total}
            </p>
          </Grid>
          <Grid className="" item xs={5}>
            <p className="round-counter">
              Big Win
              <Switch size="small" checked={bigWin} onChange={handleSwitch} />
            </p>
          </Grid>
        </Grid>
        {/* player 1 */}
        <Grid container spacing={0}>
          <Grid className="control-name" item xs={8}>
            {names[0]}{" "}
            <img
              className="dealer-logo"
              style={{ display: roundCounter % 4 === 1 ? "" : "none" }}
              alt="dealer icon"
              src={dealer}
            ></img>
          </Grid>
          <Grid
            className="control-point"
            style={{ color: number1 < 0 ? "#fd5252" : "#424647" }}
            item
            xs={4}
          >
            {number1}
          </Grid>
        </Grid>
        <div className="player-control">
          <p className="playerName"></p>
        </div>
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Button
              className="adjust"
              variant="text"
              onClick={() => setNumber1(number1 != null ? number1 - 1 : 0 - 1)}
            >
              <Icon>remove</Icon>
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Slider
              size="small"
              min={minValue}
              max={maxValue}
              defaultValue={0}
              value={number1}
              onChange={e => setNumber1(parseInt(e.target.value))}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              className="adjust"
              variant="text"
              onClick={() => setNumber1(number1 != null ? number1 + 1 : 0 + 1)}
            >
              <Icon>add</Icon>
            </Button>
          </Grid>
        </Grid>

        {/* player 2 */}
        <Grid container spacing={0}>
          <Grid className="control-name" item xs={8}>
            {names[1]}{" "}
            <img
              style={{ display: roundCounter % 4 === 2 ? "" : "none" }}
              alt="dealer icon"
              src={dealer}
            ></img>
          </Grid>
          <Grid
            className="control-point"
            style={{ color: number2 < 0 ? "#fd5252" : "#424647" }}
            item
            xs={4}
          >
            {number2}
          </Grid>
        </Grid>
        <div className="player-control">
          <p className="playerName"></p>
        </div>
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Button
              className="adjust"
              variant="text"
              onClick={() => setNumber2(number2 != null ? number2 - 1 : 0 - 1)}
            >
              <Icon>remove</Icon>
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Slider
              size="small"
              min={minValue}
              max={maxValue}
              defaultValue={0}
              value={number2}
              onChange={e => setNumber2(parseInt(e.target.value))}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              className="adjust"
              variant="text"
              onClick={() => setNumber2(number2 != null ? number2 + 1 : 0 + 1)}
            >
              <Icon>add</Icon>
            </Button>
          </Grid>
        </Grid>

        {/* player 3 */}
        <Grid container spacing={0}>
          <Grid className="control-name" item xs={8}>
            {names[2]}{" "}
            <img
              style={{ display: roundCounter % 4 === 3 ? "" : "none" }}
              alt="dealer icon"
              src={dealer}
            ></img>
          </Grid>
          <Grid
            className="control-point"
            style={{ color: number3 < 0 ? "#fd5252" : "#424647" }}
            item
            xs={4}
          >
            {number3}
          </Grid>
        </Grid>
        <div className="player-control">
          <p className="playerName"></p>
        </div>
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Button
              className="adjust"
              variant="text"
              onClick={() => setNumber3(number3 != null ? number3 - 1 : 0 - 1)}
            >
              <Icon>remove</Icon>
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Slider
              size="small"
              min={minValue}
              max={maxValue}
              defaultValue={0}
              value={number3}
              onChange={e => setNumber3(parseInt(e.target.value))}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              className="adjust"
              variant="text"
              onClick={() => setNumber3(number3 != null ? number3 + 1 : 0 + 1)}
            >
              <Icon>add</Icon>
            </Button>
          </Grid>
        </Grid>

        {/* player 4 */}
        <Grid container spacing={0}>
          <Grid className="control-name" item xs={8}>
            {names[3]}{" "}
            <img
              style={{ display: roundCounter % 4 === 0 ? "" : "none" }}
              alt="dealer icon"
              src={dealer}
            ></img>
          </Grid>
          <Grid
            className="control-point"
            style={{ color: number4 < 0 ? "#fd5252" : "#424647" }}
            item
            xs={4}
          >
            {number4}
          </Grid>
        </Grid>
        <div className="player-control">
          <p className="playerName"></p>
        </div>
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Button
              className="adjust"
              variant="text"
              onClick={() => setNumber4(number4 != null ? number4 - 1 : 0 - 1)}
            >
              <Icon>remove</Icon>
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Slider
              size="small"
              min={minValue}
              max={maxValue}
              defaultValue={0}
              value={number4}
              onChange={e => setNumber4(parseInt(e.target.value))}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              className="adjust"
              variant="text"
              onClick={() => setNumber4(number4 != null ? number4 + 1 : 0 + 1)}
            >
              <Icon>add</Icon>
            </Button>
          </Grid>
        </Grid>
      </Box>
      <button className="submit" disabled={total === 0 ? false : true}
      style= {total === 0 ? {background:colorPreset[props.color]} : {background:"gray"}}
       onClick={() => handleSubmit()}>
        {total === 0 ? "Submit" : total}
      </button>
      <div>
        <Log arr={local} />
      </div>
    </Box>
  );
}

export default Add;
