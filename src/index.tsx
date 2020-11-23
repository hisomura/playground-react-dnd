import React from "react";
import ReactDOM from "react-dom";
// import { Container } from "./list/Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend as DndBackend } from "react-dnd-html5-backend";
import reportWebVitals from "./reportWebVitals";
// import { Example } from "./box/Example";
import { Example } from "./box-draglayer/Example";

function App() {
  return (
    <div className="App">
      <DndProvider backend={DndBackend} options={{ enableMouseEvents: true }}>
        {/*<Container />*/}
        <Example />
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
