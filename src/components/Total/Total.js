import React from "react";
import "./Total.css";

function Total (props) {
    function total() {
        let player1 = 0;
        let player2 = 0;
        let player3 = 0;
        let player4 = 0;
        props.arr.map(item => {
          player1 += item[0];
          player2 += item[1];
          player3 += item[2];
          player4 += item[3];
        });
        const playerTotal = [player1, player2, player3, player4];
        return playerTotal;
      }
      let names = JSON.parse(localStorage.getItem("storedNames")) || [
        "p1",
        "p2",
        "p3",
        "p4"
      ];

    return (
        <div className="Total">
            <tr className="header-names">
            {names.map(name => {
              return <td className="player-name">{name}</td>;
            })}
          </tr>
          <tr className="header-total">
            {total().map(item => {
              return <td className= {item < 0 ? 'red-column-header' : 'column-header'} >{item}</td>;
            })}
          </tr>
        </div>
    );
}

export default Total;