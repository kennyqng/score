import { useEffect, useState } from "react";
import Log from "../Log/Log";
import Total from "../Total/Total";
import dealer from "../../assets/Dealer.svg";
import money from "../../assets/money.gif";
import confetti from "../../assets/confetti.gif";
import spirit from "../../assets/ssj3-goku.gif";
import goku from "../../assets/goku.gif";
import "./Add.css";
import { Button, Slider, Box, Grid, Icon, Switch } from "@mui/material/";

function Add(props) {
  //set each players' points
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  const [number4, setNumber4] = useState(0);
  const [total, setTotal] = useState(number1 + number2 + number3 + number4);
  //set indiv total and set leader
  function calcTotal(arr) {
    let player1 = 0;
    let player2 = 0;
    let player3 = 0;
    let player4 = 0;
    arr.map(item => {
      player1 += item[0];
      player2 += item[1];
      player3 += item[2];
      player4 += item[3];
    });
    const playerTotal = [player1, player2, player3, player4];
    return playerTotal;
  }
  const [lead, setLead] = useState(5);
  function searchLead (arr) {
    let indexOfHighScore = 5;
    let highScore = 0;
    for (let i = 0; i < 4; i++) {
      if (arr[i] > highScore) {
        highScore = arr[i];
        indexOfHighScore = i;
      }else if (arr[i] === highScore) {
        indexOfHighScore = 5;
      }
    }
    setLead(indexOfHighScore);
  }
  //players names
  let names = JSON.parse(localStorage.getItem("storedNames")) || [
    "Duy",
    "Kenny",
    "Vennesa",
    "Leo"
  ];
  //save to & load from local storage
  const [local, setLocal] = useState(() => {
    const saved = localStorage.getItem("scoreData");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  //continuous update of points total
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
      setHomer(5);
      //determine celebration
      for(let i = 0; i < 4; i++) {
        if(play[i] > 53) {
          if(names[i] === "Duy" || names[i] === "Mike") {
            // setBgRepeat("no-repeat");
            startCelebrate(3);
          } else startCelebrate(1);
          setHomer(i);
          break;
        } else if (play[i] > 26) {
          startCelebrate(0);
          setHomer(i);
          break;
        }
      }
      //determine current highest standing
      searchLead(calcTotal([play, ...local]));
    } 
  }
  //fun features: themes and animation
  const colorPreset = ['#0f6896','#4B1980','#df5a4e','#4ea0ff','#22c1c3'];
  const celebrate = [confetti,money, spirit, goku];
  const [homer, setHomer] = useState(5);
  const [gif, setGif] = useState(0);
  const [bgRepeat, setBgRepeat] = useState("repeat")
  const [celebrating, setCelebrating] = useState("none");
  const [intervalId, setIntervalId] = useState(0);

  function startCelebrate (gif) {
    if(intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }
    setCelebrating("inline");
    setGif(gif);
    const newCelebration = setInterval(() => {
      setCelebrating("none");
      setBgRepeat("repeat");
    },30000);
    
    setIntervalId(newCelebration);
  }

//extend slider range
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
  
  return (
    <Box className="Add">
      <div  className="fireworks" style={{backgroundImage: "url("+celebrate[gif]+")", display:celebrating, backgroundRepeat: bgRepeat}}></div>
      <Total arr={local} color={props.color} leader={lead}/>
      <Box className="control">
        <Grid container spacing={0}>
          <Grid className="" item xs={4}>
            <p className="round-counter">Round: {roundCounter}</p>
          </Grid>
          <Grid className="" item xs={3}>
            {/* <p className={total === 0 ? "sum-text-blue" : "sum-text"}>
              Sum: {isNaN(total) ? 0 : total}
            </p> */}
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
            {names[0]}
            {homer === 0 ? " 🥳": ""}
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
          {names[1]}
            {homer === 1 ? " 🥳": ""}
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
          {names[2]}
            {homer === 2 ? " 🥳": ""}
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
          {names[3]}
            {homer === 3 ? " 🥳": ""}
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
      style= {total === 0 ? {background:colorPreset[props.color]} : {background:"#f2f5fa", color:"#424647"}}
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
