import { useEffect, useState } from "react";
import Log from "./Log";
import "./Add.css";

function Add() {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  const [number4, setNumber4] = useState(0);
  const [total, setTotal] = useState(number1 + number2 + number3 + number4);

  useEffect(() => {
    setTotal(number1 + number2 + number3 + number4);
  })
  const [local, setLocal] = useState(() => {
    const saved = localStorage.getItem("saved");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  function calculateTotal() {
    if (total === 0) {
      const play = [number1, number2, number3, number4]
      setLocal(arr => [...arr, play]);
      localStorage.setItem("saved", JSON.stringify(local));
      console.log(local);
    }
    else(alert("Cannot submit. Total is not zero."))
  }

  function deleteLocal () {
    setLocal([]);
    console.log("delete all clicked!");
  }

  return (
    <div className="Add">
      <h1>Adding score</h1>
      <div className="control">
        <input className="number"
          type="number"
          value={number1}
          onChange={(e) => setNumber1(+e.target.value)}
          placeholder="0"
        />
        <input className="number"
          type="number"
          value={number2}
          onChange={(e) => setNumber2(+e.target.value)}
          placeholder="0"
        />
                <input className="number"
          type="number"
          value={number3}
          onChange={(e) => setNumber3(+e.target.value)}
          placeholder="0"
        />
        <input className="number"
          type="number"
          value={number4}
          onChange={(e) => setNumber4(+e.target.value)}
          placeholder="0"
        />
      </div>

      <button className="submit" onClick={calculateTotal}>Submit</button>

      <p>{total}</p>
      <did>
        <Log arr={local}/>
      </did>
      <button className="delete-all" onClick={() => deleteLocal()}>Delete All</button>
    </div>
  );
}

export default Add;