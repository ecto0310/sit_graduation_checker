import IndexView from "./Components/IndexView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./Components/NavigationBar";
import UsageView from "./Components/UsageView";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Container>
        <Alert variant={"danger"} className="mt-1">
          使用は参考程度にしてください．万が一誤りがあった場合でも，製作者は一切責任を負いません．
        </Alert>
        <BrowserRouter>
          <Routes>
            <Route path="/usage" element={<UsageView />} />
            <Route path="/*" element={<IndexView />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
