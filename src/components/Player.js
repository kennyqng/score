import React, { useEffect, useState } from "react";

function Player() {
  const [point1, setPoint1] = useState(0);
  const [point2, setPoint2] = useState(0);
  const [point3, setPoint3] = useState(0);
  const [point4, setPoint4] = useState(0);
  const [sum, setSum] = useState(point1 + point2 + point3 + point4);

  const [local, setLocal] = useState(() => {
    const saved = localStorage.getItem("saved");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const listItems = local.map((number) => <li>{number + ","}</li>);
  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(local));
  });
  
  function handleSubmit (e) {
    e.preventDefault();
    setSum(point1 + point2 + point3 + point4);
    if (sum === 0) {
      const play = [point1, point2, point3, point4]
      setLocal(arr => [...arr, play]);
      localStorage.setItem("saved", JSON.stringify(local));
      console.log(local);
      alert("invalid score " + sum);
    }
    else alert("invalid score " + sum);
  };

  return (
    <div>
      <form >
          <label>
            Player1:
            <input type="number" value={point1} onChange={(e) => setPoint1(e.target.value)}/>
          </label>
          <label>
          Player2:
          <input type="number" value={point2} onChange={(e) => setPoint2(e.target.value)}/>
          </label>
          <label>
          Player3:
          <input type="number" value={point3} onChange={(e) => setPoint3(e.target.value)}/>
          </label>
          <label>
          Player4:
          <input type="number" value={point4} onChange={(e) => setPoint4(e.target.value)}/>
          </label>
        </form>
        <div>
          <p>{point1}</p>
          <p>{point2}</p>
          <p>{point3}</p>
          <p>{point4}</p>
        </div>
          <p>Total: {sum}</p>
          <button type="submit" onClick={handleSubmit}>submit</button>
          <div>{listItems}</div>
    </div>
  );
}

export default Player;
