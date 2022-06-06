import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Authentication from "./Pages/Authentication/Authentication";

import "./App.css"
import SymptomsList from "./Pages/SymptomsList/SymptomsList";
import Diagnosis from "./Pages/Diagnosis/Diagnosis";
import Settings from "./Pages/Settings/Settings";

window.API_URL = "http://localhost:8080/api";
window.BACKEND_BASE_URL = "http://localhost:8080";
window.FRONTEND_BASE_URL = "http://localhost:3000";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={< Authentication/>}> </Route>
                <Route exact path='/symptoms' element={< SymptomsList/>}> </Route>
                <Route exact path='/diagnosis' element={< Diagnosis/>}> </Route>
                <Route exact path='/settings' element={< Settings/>}> </Route>
            </Routes>
        </Router>
    );
}

export default App;
