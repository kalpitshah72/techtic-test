import "./App.css";
import Login from "./components/Login";
import Form from "./components/Form";
function App() {
  return (
    <div>
      {localStorage.getItem("success") === "true" ? <Form /> : <Login />}
    </div>
  );
}

export default App;
