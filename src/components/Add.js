import { useEffect, useState } from "react";
import Log from "./Log";
import "./Add.css";

function Add() {
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();
  const [number3, setNumber3] = useState();
  const [number4, setNumber4] = useState();
  const [total, setTotal] = useState(number1 + number2 + number3 + number4);

  useEffect(() => {
    setTotal(number1 + number2 + number3 + number4);
  });
  const [local, setLocal] = useState(() => {
    const saved = localStorage.getItem("saved");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  function calculateTotal() {
    if (total === 0) {
      const play = [number1, number2, number3, number4];
      setLocal(arr => [...arr, play]);
      localStorage.setItem("saved", JSON.stringify(local));
      console.log(local);
    } else alert("Cannot submit. Total is not zero.");
  }

  function deleteLocal() {
    setLocal([]);
    console.log("delete all clicked!");
  }

  return (
    <div className="Add">
      <h1>Adding score</h1>
      <div className="control">
        <div className="player-control"><p className="playerName" >Kenny</p>
          <button
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
          <button
            onClick={() => setNumber1(number1 != null ? number1 + 1 : 0 + 1)}
          >
            +
          </button>
        </div>
        <div className="player-control"><p className="playerName" >Khoa</p>
          <button
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
          <button
            onClick={() => setNumber2(number2 != null ? number2 + 1 : 0 + 1)}
          >
            +
          </button>
        </div>
        <div className="player-control"><p className="playerName" >Duy</p>
          <button
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
          <button
            onClick={() => setNumber3(number3 != null ? number3 + 1 : 0 + 1)}
          >
            +
          </button>
        </div>
        <div className="player-control"><p className="playerName" >Leo</p>
          <button
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
          <button
            onClick={() => setNumber4(number4 != null ? number4 + 1 : 0 + 1)}
          >
            +
          </button>
        </div>
      </div>

      <button className="submit" onClick={calculateTotal}>
        Submit
      </button>

      <p>{total}</p>
      <did>
        <Log arr={local} />
      </did>
      <button className="delete-all" onClick={() => deleteLocal()}>
        Delete All
      </button>
    </div>
  );
}

export default Add;
