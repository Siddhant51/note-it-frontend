import { Outlet, Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const Layout = () => {
    return token ? <Outlet /> : <Navigate to="/login" replace={true} />;
  };

  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Home token={token} setToken={setToken} />}
          />
          <Route
            path="/notes/:type"
            element={<Home token={token} setToken={setToken} />}
          />
        </Route>
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
