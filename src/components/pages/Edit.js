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
  const [query, setQuery] = useState([]);
  let navigate = useNavigate();

  function addQuery (index1, index2, value) {
    if(!isNaN(value)) {
      setQuery(arr => [...arr, [index1, index2, value]])
      console.log(query);
    }
  };
  function updateLocal([i1, i2, val]) {
    local[i1][i2] = parseInt(val);
    localStorage.setItem("scoreData", JSON.stringify(local));
  }
  function handleSubmit () {
    if(query != null) {
      query.map(param => {
        updateLocal(param);
      });
      navigate("/");
      console.log(local);
    }
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
