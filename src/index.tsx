import React from "react";
import ReactDOM from "react-dom";
import { Container } from "./Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import reportWebVitals from "./reportWebVitals";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
