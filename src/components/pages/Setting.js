import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  let navigate = useNavigate();


  function deleteLocal() {
      if (window.confirm("delete all data?") === true) {
          localStorage.removeItem("scoreData");
          navigate("/");
      }
  }

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");
  const [player4, setPlayer4] = useState("");

  function saveNames() {
    localStorage.setItem("storedNames", JSON.stringify(playerNames));
    navigate("/");
  }

  return (
    <div className="setting">
      <div className="name-field">
        {playerNames.map(name => {
          return <div className="name">{name}</div>;
        })}
      </div>
      <div>
        <p className="instruction">Enter new warriors here:</p>
        <input className="input" onChange={e => setPlayer1(e.target.value)}></input>
        <input className="input" onChange={e => setPlayer2(e.target.value)}></input>
        <input className="input" onChange={e => setPlayer3(e.target.value)}></input>
        <input className="input" onChange={e => setPlayer4(e.target.value)}></input>
      </div>
      <div>
        <button className="button-save" onClick={() => saveNames()}>
          Save Names
        </button>
      </div>
      <div>
        <button className="button-delete" onClick={() => deleteLocal()}>
          Delete All Scores
        </button>
        <p className="author">Kenny Nguyen 2022</p>
      </div>
    </div>
  );
}

export default Setting;
