import { useEffect, useState } from "react";
import Log from "../Log/Log";
import "./Add.css";

function Add() {
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();
  const [number3, setNumber3] = useState();
  const [number4, setNumber4] = useState();
  const [total, setTotal] = useState(number1 + number2 + number3 + number4);
  let names = JSON.parse(localStorage.getItem("storedNames")) || ["Player 1", "Player 2", "Player 3", "Player 4"];
  

  useEffect(() => {
    setTotal(number1 + number2 + number3 + number4);
  });
  const [local, setLocal] = useState(() => {
    const saved = localStorage.getItem("saved");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  function handleSubmit () {
    if (total === 0) {
      const play = [number1, number2, number3, number4];
      setLocal(arr => [...arr, play]);
      localStorage.setItem("saved", JSON.stringify(local));
      console.log(local);
    } else alert("Cannot submit. Total is not zero.");
  }

  return (
    <div className="Add">
      <p>Sum: {total}</p>
      <div className="control">
        <div className="player-control"><p className="playerName" >{names[0]}</p>
          <button className="adjust"
            onClick={() => setNumber1(number1 != null ? number1 - 1 : 0 - 1)}
          >
            -
          </button>
          <input
            className="number"
            type="number"
            pattern="\d*"
            value={number1}
            onChange={e => setNumber1(+e.target.value)}
          />
          <button className="adjust"
            onClick={() => setNumber1(number1 != null ? number1 + 1 : 0 + 1)}
          >
            +
          </button>
        </div>
        <div className="player-control"><p className="playerName" >{names[1]}</p>
          <button className="adjust"
            onClick={() => setNumber2(number2 != null ? number2 - 1 : 0 - 1)}
          >
            -
          </button>
          <input 
            className="number"
            type="number"
            pattern="\d*"
            value={number2}
            onChange={e => setNumber2(+e.target.value)}
          />
          <button className="adjust"
            onClick={() => setNumber2(number2 != null ? number2 + 1 : 0 + 1)}
          >
            +
          </button>
        </div>
        <div className="player-control"><p className="playerName" >{names[2]}</p>
          <button className="adjust"
            onClick={() => setNumber3(number3 != null ? number3 - 1 : 0 - 1)}
          >
            -
          </button>
          <input
            className="number"
            type="number"
            pattern="\d*"
            value={number3}
            onChange={e => setNumber3(+e.target.value)}
          />
          <button className="adjust"
            onClick={() => setNumber3(number3 != null ? number3 + 1 : 0 + 1)}
          >
            +
          </button>
        </div>
        <div className="player-control"><p className="playerName" >{names[3]}</p>
          <button className="adjust"
            onClick={() => setNumber4(number4 != null ? number4 - 1 : 0 - 1)}
          >
            -
          </button>
          <input
            className="number"
            type="number"
            pattern="\d*"
            value={number4}
            onChange={e => setNumber4(+e.target.value)}
          />
          <button className="adjust"
            onClick={() => setNumber4(number4 != null ? number4 + 1 : 0 + 1)}
          >
            +
          </button>
        </div>
      </div>

      <button className="submit" onClick={() => handleSubmit()}>
        Submit
      </button>
      <div>
        <Log arr={local} />
      </div>
    </div>
  );
}

export default Add;
