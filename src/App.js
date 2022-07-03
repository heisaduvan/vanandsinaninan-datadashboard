import {useState} from "react";
import "./App.css";
import Home from "./components/Home";
import FormDialog from "./components/FormDialog";
function App() {
  const password = "Hockey1425";

  const checkPass = (pass) => {
    return pass === password;
  }

  return (
    <div className="App">
      <FormDialog isLogged = {false} checkPass={checkPass}></FormDialog>

      <Home></Home>
    </div>
  );
}

export default App;
