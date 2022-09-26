import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Setting.css";

function Setting(props) {
  
  let navigate = useNavigate();
  let names = JSON.parse(localStorage.getItem("storedNames")) || [
    "Duy",
    "Kenny",
    "Vennesa",
    "Nghia"
  ];

  const gradientPresets = [
    'linear-gradient(95deg, rgba(30,25,60,1) 0%, rgba(114,120,150,1) 23%, rgba(161,26,76,1) 42%, rgba(20,77,107,1) 60%, rgba(56,18,74,1) 100%)',
    'linear-gradient(124deg, rgba(101,206,232,1) 49%, rgba(128,0,255,1) 100%)',
    'linear-gradient(54deg, rgba(139,61,121,1) 0%, rgba(255,82,48,1) 28%, rgba(254,184,98,1) 51%, rgba(223,90,117,1) 71%, rgba(59,49,124,1) 100%)',
    'linear-gradient(328deg, rgba(254,230,0,1) 0%, rgba(246,165,186,1) 27%, rgba(78,215,255,1) 59%, rgba(255,59,201,1) 100%)',
    'linear-gradient(114deg, rgba(34,193,195,1) 0%, rgba(98,191,152,1) 29%, rgba(115,191,140,1) 37%, rgba(133,190,128,1) 45%, rgba(253,187,45,1) 100%)'
  ];

  const colorPreset = ['#0f6896','#4B1980','#df5a4e','#4ea0ff','#22c1c3'];
  
  function deleteLocal() {
    if (window.confirm("Delete all data?\nWARNING: Cannot undo.") === true) {
      localStorage.removeItem("scoreData");
      localStorage.removeItem("dealerPosition");
      localStorage.removeItem("roundNumber");
      navigate("/");
    }
  }
  
  const [player1, setPlayer1] = useState(names[0]);
  const [player2, setPlayer2] = useState(names[1]);
  const [player3, setPlayer3] = useState(names[2]);
  const [player4, setPlayer4] = useState(names[3]);
  
  function saveNames() {
    //check no empty name and no special characters
    const letters = /^[\w\-\s]+$/;
    if(player1 !== "" & player2 !== "" & player3 !== "" & player4 !== "") {
      const arr = [player1, player2, player3, player4];
      let allAlpha = true;
      for(let i = 0; i < 4; i++) {
        if(!arr[i].match(letters)) {
          allAlpha= false;
        }
      };
      if(allAlpha){
        localStorage.setItem("storedNames", JSON.stringify(arr));
        navigate("/");
      } else (alert("Names cannot contain special characters or numbers!"));
    }
    else (alert("No names can be empty."))
  }

  return (
    <div className="setting">      
      <div>
        <p className="instruction">Enter new names here:</p>
        <input className="input" placeholder={player1} onChange={e => setPlayer1(e.target.value)}></input>
        <input className="input" placeholder={player2} onChange={e => setPlayer2(e.target.value)}></input>
        <input className="input" placeholder={player3} onChange={e => setPlayer3(e.target.value)}></input>
        <input className="input" placeholder={player4} onChange={e => setPlayer4(e.target.value)}></input>
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
        style={{background: gradientPresets[3]}}>unicorn</li>
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
        <p className="author">Kenny Nguyen | version 2.2.3 | 09.25.2022</p>
      </div>
    </div>
  );
}

export default Setting;
