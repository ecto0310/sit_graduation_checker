import Checker from "./Components/Checker";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from 'react-bootstrap/Container';

import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./Components/NavigationBar";
import Usage from "./Components/Usage";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/usage" element={<Usage />} />
            <Route path="/*" element={<Checker />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
