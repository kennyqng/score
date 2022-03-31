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

  let names = JSON.parse(localStorage.getItem("storedNames")) || [
    "p1",
    "p2",
    "p3",
    "p4"
  ];
  let navigate = useNavigate();

  const [query, setQuery] = useState([]);

  const [row, setRow] = useState([]);

  function addQuery (index1, index2, value) {
    if(!isNaN(value)) {
      setRow(arr => [...arr, index1]);
      setQuery(arr => [...arr, [index1, index2, value]])
      console.log(query);
    }
  };
  function updateLocal([i1, i2, val]) {
    local[i1][i2] = parseInt(val);
    // setRow(arr => [...arr, i1]);
    // console.log("row " + i1);
  }
  function checkRowSum() {
    let pass = true;
    row.map(row =>{
      const sum = local[row][0] + local[row][1] + local[row][2] + local[row][3];
      console.log("row" + local[row][0] + " " + local[row][1] + " " + local[row][2] + " " + local[row][3])
      if (sum !== 0) {
        pass = false;
        alert("sum does not add up at " + local[row][0] + " " + local[row][1] + " "  + local[row][2] + " "  + local[row][3])
      }
    });
    return pass;
  }
  function handleSubmit () {
    if(query.length > 0) {
      query.map(param => {
        updateLocal(param);
      });
      if(checkRowSum()) {
        console.log(local);
        localStorage.setItem("scoreData", JSON.stringify(local));
        navigate("/");
      }
    } else alert("no changes to submit!")
  }
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
