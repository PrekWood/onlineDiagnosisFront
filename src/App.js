import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Authentication from "./Pages/Authentication/Authentication";

import "./App.css"

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path='/' element={< Authentication/>}> </Route>
        </Routes>
      </Router>
  );
}

export default App;
