import "./App.css";
import Login from "./components/login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/dashboard/DashBoard";
import PrivateRoute from "./PrivateRoute";
import PlayerList from "./components/player/PlayerList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="*" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/player" element={<PlayerList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
