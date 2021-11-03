import React from "react";
import "../App.css";
import Result from "./Result";
export default function Loader({ result, setResult, text }) {
  return (
    <React.Fragment>
      {result.length === 0 ? (
        <React.Fragment>
          <div id="loader">
            <div id="box"></div>

            <div id="hill"></div>
          </div>
        </React.Fragment>
      ) : (
        <Result result={result} setResult={setResult} text={text}/>
      )}
    </React.Fragment>
  );
}
