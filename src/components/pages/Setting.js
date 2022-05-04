import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Setting.css";

function Setting() {
  
  let navigate = useNavigate();  
  
  function deleteLocal() {
    if (window.confirm("Delete all data?\nWARNING: Cannot undo.") === true) {
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
    if(player1 !== "" & player2 !== "" & player3 !== "" & player4 !== "") {
      localStorage.setItem("storedNames", JSON.stringify([player1, player2, player3, player4]));
      navigate("/");
    }
    else (alert("No names can be empty."))
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
        <p className="setting-button">
        <Link className="setting-edit" to="/edit">Edit current score</Link>
        </p>
        <p className="setting-button" onClick={() => deleteLocal()}>
          Delete All
        </p>
      </div>
      <div  className="footer">      
        <p className="author">Kenny Nguyen 2022</p>
      </div>
    </div>
  );
}

export default Setting;
