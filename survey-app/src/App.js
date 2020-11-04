import "./App.css";
import Login from "./components/Login";
import Form from "./components/Form";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/form">
          {localStorage.getItem("success") === "true" ? (
            <Form />
          ) : (
            <Redirect to={"/"} />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
