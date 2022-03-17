import React, { useEffect, useState } from "react";
import "./Log.css";

function Log (props) { 
  function total () {
    let player1 = 0;
    let player2 = 0;
    let player3 = 0;
    let player4 = 0;
    props.arr.map((item) => {
      player1 += item[0];
      player2 += item[1];
      player3 += item[2];
      player4 += item[3];
    })
    const playerTotal = [player1,player2,player3,player4];
    return playerTotal;
  }

    return (
        <div>
      <table>
        <tbody>
          <tr className="header">{total().map((item) =>{
            return (
              <td className="column-header">{item}</td>
            )
          })}</tr>
          <div></div>
          {props.arr.slice(0).reverse().map((item, ) => {
            return (
              <tr className="table">
                <td className="column">{item[0]}</td>
                <td className="column">{item[1]}</td>
                <td className="column">{item[2]}</td>
                <td className="column">{item[3]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
        </div>
    );
}

export default Log;