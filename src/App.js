import {useState} from "react";
import "./App.css";
import Home from "./components/Home";
import FormDialog from "./components/FormDialog";
function App() {

  const [isLogged, setIsLogged] = useState(false);
  const password = "vanand";

  const checkPass = (pass) => {
    return pass === password;
  }

  return (
    <div className="App">
      <FormDialog isLogged = {isLogged} checkPass={checkPass}></FormDialog>

      <Home></Home>
    </div>
  );
}

export default App;
