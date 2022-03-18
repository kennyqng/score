import { useEffect, useState } from "react";
import "./Setting.css";

function Setting(props) {
  const [playerNames, setPlayerNames] = useState(() => {
    const saved = localStorage.getItem("storedNames");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useEffect(() => {
    setPlayerNames([player1, player2, player3, player4]);
  });

  function deleteLocal() {
    localStorage.removeItem("saved");
  }

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");
  const [player4, setPlayer4] = useState("");

  function saveNames() {
    localStorage.setItem("storedNames", JSON.stringify(playerNames));
  }

  return (
    <div className="setting">
        <div className="name-field">
            {playerNames.map(name => {return <div className="name">{name}</div>;})}
        </div>
      <input onChange={e => setPlayer1(e.target.value)}></input>
      <input onChange={e => setPlayer2(e.target.value)}></input>
      <input onChange={e => setPlayer3(e.target.value)}></input>
      <input onChange={e => setPlayer4(e.target.value)}></input>
      <div>
        <button className="button-save" onClick={() => saveNames()}>
          Save Names
        </button>
      </div>
      <div>
        <button className="button-delete" onClick={() => deleteLocal()}>
          Delete All Scores
        </button>
      </div>
    </div>
  );
}

export default Setting;
