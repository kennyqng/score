import { useEffect, useState } from "react";
import Log from "../Log/Log";
import Total from "../Total/Total";
import dealer from "../../assets/Dealer.svg";
import money from "../../assets/money.gif";
import confetti from "../../assets/confetti.gif";
import harper from "../../assets/harper.gif";
import duck from "../../assets/jungle-brown-line.gif";
import leo from "../../assets/leo.gif";
import shocked from "../../assets/shocked.gif";
import elmo from "../../assets/elmo.gif";
import "./Add.css";
import { Button, Slider, Box, Grid, Icon, Switch } from "@mui/material/";

function Add(props) {
  //set each players' points
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  const [number4, setNumber4] = useState(0);
  const [total, setTotal] = useState(number1 + number2 + number3 + number4);
  //set indiv total, set leader, stats
  function calcTotal(arr) {
    let players = [0, 0, 0, 0];
    arr.map(item => {
      players[0] += item[0];
      players[1] += item[1];
      players[2] += item[2];
      players[3] += item[3];
    });
    return players;
  }

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
    localStorage.setItem("leader", JSON.stringify(indexOfHighScore));
  }
  let award = JSON.parse(localStorage.getItem("awards")) || [0,0,0,0];
  function updateAward (index) {
    let arr =  award;
    arr[index] += 1;
    localStorage.setItem("awards", JSON.stringify(arr));
  };
  function undoAward (index) {
    let arr =  award;
    arr[index] -= 1;
    localStorage.setItem("awards", JSON.stringify(arr));
  };
  function translateAward (num) {
    let medals = "";
    for(let i = 0; i < num; i++) {
      medals += "🏅";
    }
    return medals;
  }
  //players names
  let names = JSON.parse(localStorage.getItem("storedNames")) || [
    "Duy",
    "Kenny",
    "Venessa",
    "Nghia"
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
  //undo last submit
  const [submitted, setSubmitted] = useState(false);
  function undoSubmit () {
    const undoneLocal = local.splice(1);
    setLocal(undoneLocal);
    searchLead(calcTotal(undoneLocal));
    undoAward(homer);
    setHomer(5);
    setRoundCounter(currentCount => {
      return currentCount - 1;
    });
    setSubmitted(false);
  }
  //submit button text
  const [buttonText, setButtonText] = useState("Submit");
  function changeButtonText () {
    if(intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }
    setButtonText("Updated")
    setGif(gif);
    const newSubmit = setInterval(() => {
      setButtonText("Submit")
    },800);
    
    setIntervalId(newSubmit);
  }
  //flashes on submit
  const [opacityValue, setOpacityValue] = useState(1);
  function submitFlash() {
    let num = 0;
    setOpacityValue(0);
    const countInterval = setInterval(() => {
      num += 1;
      setOpacityValue(current => {
        return current + 0.1;
      });
      if (num > 10) {
        clearInterval(countInterval);
        setOpacityValue(1);
      }
    }, 50);
  }
  
  function handleSubmit() {
    if (total === 0) {
      const play = [number1, number2, number3, number4];
      setLocal(arr => [play, ...arr]);
      setNumber1(0);
      setNumber2(0);
      setNumber3(0);
      setNumber4(0);
      setRoundCounter(currentCount => {
        return currentCount + 1;
      });
      localStorage.setItem("roundNumber", roundCounter + 1);
      setHomer(5);
      localStorage.setItem("homer", JSON.stringify(5));
      //determine celebration
      for(let i = 0; i < 4; i++) {
        if(play[i] > 53) {
          if(names[i].toLowerCase() === "venessa" || names[i].toLowerCase() === "vennesa") {
            startCelebrate(2);
          } else if(names[i].toLowerCase() === "duy" || names[i].toLowerCase() === "mike") {
            startCelebrate(3);
          } else if(names[i].toLowerCase() === "leo" || names[i].toLowerCase() === "nghia") {
            startCelebrate(4);
          } else if(names[i].toLowerCase() === "khoa") {
            startCelebrate(5);
          } else if(names[i].toLowerCase() === "kenny") {
            startCelebrate(6);
          }  else startCelebrate(1);
          setHomer(i);
          updateAward(i);
          localStorage.setItem("homer", JSON.stringify(i));
          break;
        } else if (play[i] > 26) {
          startCelebrate(0);
          setHomer(i);
          updateAward(i);
          localStorage.setItem("homer", JSON.stringify(i));
          break;
        }
      }
      //determine current highest standing
      searchLead(calcTotal([play, ...local]));
    } 
    submitFlash();
    setSubmitted(true);
    changeButtonText();
  }
  //Log toggle
  const [activeButton, setActiveButton] = useState("Transactions");
  function displayInfo (info) {
    setActiveButton(info);
  }  
  //fun features: themes and animation
  const colorPreset = ['#0f6896','#4B1980','#df5a4e','#4ea0ff','#22c1c3', '#1976d2'];
  const celebrate = [confetti, money, duck, harper, leo, shocked, elmo];
  const [homer, setHomer] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("homer"));
    return saved || 5;
  });
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
      <Total arr={local} color={props.color} opa={opacityValue}/>
      <Box className="control">
        <Grid container spacing={0}>
          <Grid className="" item xs={4}>
            <p className="round-item">Round: {roundCounter}</p>
          </Grid>
          <Grid className="" item xs={3}>
            <p className="round-item"
            style={{display: submitted === false ? "none" : ""}} 
            onClick={() => undoSubmit()}>
              <Icon>undo</Icon>
              </p>
          </Grid>
          <Grid className="" item xs={5}>
            <p className="round-item">
              Big Win
              <Switch size="small" checked={bigWin} onChange={handleSwitch} />
            </p>
          </Grid>
        </Grid>
        {/* player 1 */}
        <Grid container spacing={0}>
          <Grid className="control-name" item xs={5}>
            {names[0]}
            {homer === 0 ? " 🥳": ""}
            <img
              className="dealer-logo"
              style={{ display: roundCounter % 4 === 1 ? "" : "none" }}
              alt="dealer icon"
              src={dealer}
            ></img>
          </Grid>
          <Grid className="achievements" item xs={6}>
            {award[0] > 0 ? translateAward(award[0]): ""}
          </Grid>
          <Grid
            className="control-point"
            style={{ color: number1 < 0 ? "#fd5252" : "#424647" }}
            item
            xs={1}
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
          <Grid className="control-name" item xs={5}>
          {names[1]}
            {homer === 1 ? " 🥳": ""}
            <img
              style={{ display: roundCounter % 4 === 2 ? "" : "none" }}
              alt="dealer icon"
              src={dealer}
            ></img>
          </Grid>
          <Grid className="achievements" item xs={6}>
            {award[1] > 0 ? translateAward(award[1]): ""}
          </Grid>
          <Grid
            className="control-point"
            style={{ color: number2 < 0 ? "#fd5252" : "#424647" }}
            item
            xs={1}
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
          <Grid className="control-name" item xs={5}>
          {names[2]}
            {homer === 2 ? " 🥳": ""}
            <img
              style={{ display: roundCounter % 4 === 3 ? "" : "none" }}
              alt="dealer icon"
              src={dealer}
            ></img>
          </Grid>
          <Grid className="achievements" item xs={6}>
            {award[2] > 0 ? translateAward(award[2]): ""}
          </Grid>
          <Grid
            className="control-point"
            style={{ color: number3 < 0 ? "#fd5252" : "#424647" }}
            item
            xs={1}
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
          <Grid className="control-name" item xs={5}>
          {names[3]}
            {homer === 3 ? " 🥳": ""}
            <img
              style={{ display: roundCounter % 4 === 0 ? "" : "none" }}
              alt="dealer icon"
              src={dealer}
            ></img>
          </Grid>
          <Grid className="achievements" item xs={6}>
            {award[3] > 0 ? translateAward(award[3]): ""}
          </Grid>
          <Grid
            className="control-point"
            style={{ color: number4 < 0 ? "#fd5252" : "#424647" }}
            item
            xs={1}
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
      <button className={buttonText} disabled={total === 0 && buttonText === "Submit" ? false : true}
      style= {total === 0 && buttonText === "Submit" ? {background:colorPreset[props.color], color:"#ffffff"} : {background:"", color:""}}
       onClick={() => handleSubmit()}>
        {total === 0 ? buttonText : total}
      </button>
      <div className="logistic">
        <button className="log-button"
        style={{opacity: activeButton === "Transactions" ? 1 : 0.5, background:colorPreset[props.color], color:"#ffffff"}}
        onClick={() => {activeButton === "Transactions" ? displayInfo("none") : displayInfo("Transactions")}}
        >Transactions</button>
        <button  className="log-button"
        style={{opacity: activeButton === "Summary" ? 1 : 0.5, background:colorPreset[props.color], color:"#ffffff"}}
        onClick={() => {activeButton === "Summary"? displayInfo("none") : displayInfo("Summary")}}
        >Summary</button>
        <button  className="log-button" hidden
        style={{opacity: activeButton === "Chart" ? 1 : 0.5, background:colorPreset[props.color], color:"#ffffff"}}
        onClick={() => {activeButton === "Chart" ? displayInfo("none") : displayInfo("Chart")}}
        >Chart</button>   
      </div>
      <div>
        <Log arr={local} info={activeButton}/>
      </div>
    </Box>
  );
}

export default Add;
