import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./Edit.css";

function Edit() {
  const [local, setLocal] = useState(() => {
    const saved = localStorage.getItem("scoreData");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  //get player names from memory, else load default
  let names = JSON.parse(localStorage.getItem("storedNames")) || ["Duy","Kenny","Venessa","Nghia"];
  //for when need to redirect back to home
  let navigate = useNavigate();
  //query of indexes and new edited values
  const [query, setQuery] = useState([]);
  //array of indexes for row that have been edited
  const [row, setRow] = useState([]);
  //function to add indexes to query, add indexes to edited 'row' array
  function addQuery (index1, index2, value) {
    //only add real numbers
    if(!isNaN(value)) {
      setQuery(arr => [...arr, [index1, index2, value]])
      //to avoid duplicate added to row array
      let duplicate = false;
      for(let i = 0; i < row.length; i++) {
        if(row[i] === index1){
          duplicate = true;
        }  
      }
      if (!duplicate) {
        //add to row if not a duplicate
        setRow(arr => [...arr, index1]);
      }
    }
  };
  //update new value in score
  function updateLocal([i1, i2, val]) {
    local[i1][i2] = parseInt(val);
  }
  //validate sum to be zero
  function checkRowSum() {
    let pass = true;
    row.map(row =>{
      const sum = local[row][0] + local[row][1] + local[row][2] + local[row][3];
      if (sum !== 0) {
        pass = false;
        alert("This row does not add up to 0:\n [" + local[row][0] + "] [" + local[row][1] + "] ["  + local[row][2] + "] ["  + local[row][3] + "]")
      }
    });
    return pass;
  }
  //on submit: update score locally, validate edited row to sum zero, only then update database
  function handleSubmit () {
    if(query.length > 0) {
      query.map(param => {
        updateLocal(param);
      });
      //validate edited row to sum to zero
      if(checkRowSum()) {
        //update database
        localStorage.setItem("scoreData", JSON.stringify(local));
        //redirect home
        navigate("/");
      }
    } else alert("no changes to submit!")
  }
  //cancel editing
  function handleCancel () {
    navigate("/");
  }

  return (
    <div className="edit">
        <button className="update-button" onClick={()=> handleSubmit()}>update</button>
        <button className="cancel-button" onClick={()=> handleCancel()}>cancel</button>
      <table>
        <tbody>
          <tr className="header-names">
            {names.map(name => {
              return <td className="log-name">{name}</td>;
            })}
          </tr>
          {local.map((item, index) => {
            return (
              <tr className="table">
                <td className={item[0] < 0 ? "red-column" : "column"}><input className="edit-input" placeholder={item[0]} onChange={(e) => addQuery(index, 0,e.target.value)} ></input>
                  
                </td>
                <td className={item[1] < 0 ? "red-column" : "column"}><input className="edit-input" placeholder={item[1]} onChange={(e) => addQuery(index, 1, e.target.value)}></input>
                </td>
                <td className={item[2] < 0 ? "red-column" : "column"}><input className="edit-input" placeholder={item[2]} onChange={(e) => addQuery(index, 2, e.target.value)}></input>
                </td>
                <td className={item[3] < 0 ? "red-column" : "column"}><input className="edit-input" placeholder={item[3]} onChange={(e) => addQuery(index, 3, e.target.value)}></input>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Edit;
