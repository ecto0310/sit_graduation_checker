import Checker from "./Components/Checker";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Checker />
      </BrowserRouter>
    </div>
  );
}

export default App;
