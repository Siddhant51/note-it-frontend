import { Outlet, Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useState } from "react";
import Create from "./components/Create";

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
          <Route path="/create" element={<Create token={token} />} />
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
