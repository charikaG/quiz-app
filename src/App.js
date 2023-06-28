import logo from "./logo.svg";
import "./App.css";
import Login from "./component/login/login";
import LoggedIn from "./component/loggedIn";
import { Route, Router, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import QuizTest from "./component/quizTest/quizTest";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/loggedin" element={<LoggedIn/>} />
          <Route path="/quiz/:quizId" element={<QuizTest/>}/>
        </Routes>
        </BrowserRouter>
      {/* </Router> */}
    </div>
  );
}

export default App;
