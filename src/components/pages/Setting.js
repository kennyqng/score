import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import KN from "../../assets/KN-black.svg";
import "./Setting.css";

function Setting(props) {
  // const [playerNames, setPlayerNames] = useState(() => {
  //   const saved = localStorage.getItem("storedNames");
  //   const initialValue = JSON.parse(saved);
  //   return initialValue || [];
  // });

  useEffect(() => {
    // setPlayerNames([player1, player2, player3, player4]);
  });
  
  let navigate = useNavigate();
  
  
  function deleteLocal() {
    if (window.confirm("delete all data?") === true) {
      localStorage.removeItem("scoreData");
      localStorage.removeItem("dealerPosition");
      localStorage.removeItem("roundNumber");
      navigate("/");
    }
  }
  
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");
  const [player4, setPlayer4] = useState("");
  
  function saveNames() {
    const allNames = [player1, player2, player3, player4];
    localStorage.setItem("storedNames", JSON.stringify(allNames));
    navigate("/");
  }

  return (
    <div className="setting">      
      <div>
        <p className="instruction">Enter new names here:</p>
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
      <div className="setting-options">
        <p className="setting-edit-button">
        <Link className="setting-edit" to="/edit">Edit current score</Link>
        </p>
        <button className="button-delete" onClick={() => deleteLocal()}>
          Delete All Scores
        </button>
      </div>
      <div  className="footer">      
        <p className="author">Kenny Nguyen 2022</p>
      </div>
    </div>
  );
}

export default Setting;
