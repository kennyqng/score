import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Setting.css";

function Setting(props) {
  
  let navigate = useNavigate();

  const gradientPresets = [
    'linear-gradient(95deg, rgba(30,25,60,1) 0%, rgba(114,120,150,1) 23%, rgba(161,26,76,1) 42%, rgba(20,77,107,1) 60%, rgba(56,18,74,1) 100%)',
    'linear-gradient(124deg, rgba(101,206,232,1) 49%, rgba(128,0,255,1) 100%)',
    'linear-gradient(124deg, rgba(223,90,78,1) 33%, rgba(252,0,255,0.8211659663865546) 100%)',
    'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
    'linear-gradient(114deg, rgba(34,193,195,1) 0%, rgba(98,191,152,1) 29%, rgba(115,191,140,1) 37%, rgba(133,190,128,1) 45%, rgba(253,187,45,1) 100%)'
  ];

  const colorPreset = [
    '#0f6896',
    '#4B1980',
    '#df5a4e',
    '#94bbe9',
    '#22c1c3'
  ]
  
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
        <button className="button-save" onClick={() => saveNames()}
        style={{background: colorPreset[props.color]}}>
          Save Names
        </button>
      </div>
      <div className="setting-options">
        <ul className="select" >Select Theme:
        <li className="theme-button" onClick={() => props.changeTheme(0)} 
        style={{background: gradientPresets[0]}}>iron patriot</li>
        <li className="theme-button" onClick={() => props.changeTheme(1)}
        style={{background: gradientPresets[1]}}>original purple</li>
        <li className="theme-button" onClick={() => props.changeTheme(2)}
        style={{background: gradientPresets[2]}}>sunset</li>
        <li className="theme-button" onClick={() => props.changeTheme(3)}
        style={{background: gradientPresets[3]}}>5:30am</li>
        <li className="theme-button" onClick={() => props.changeTheme(4)}
        style={{background: gradientPresets[4]}}>pineapple</li>
        <li className="theme-button" onClick={() => props.changeTheme(5)}
        style={{background: "#1976d2"}}>just blue</li>
        </ul>
        <p className="setting-button">
        <Link className="setting-edit" to="/edit" >Edit current score</Link>
        </p>
        <p className="setting-button" onClick={() => deleteLocal()}>
          Delete All Score Data
        </p>
      </div>
      <div  className="footer">      
        <p className="author">Kenny Nguyen 2022</p>
        <p className="version">Version 2.2.1 09.21.2022</p>
      </div>
    </div>
  );
}

export default Setting;
