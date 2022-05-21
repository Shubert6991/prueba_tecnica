import "./App.css";
import "./components/Registro";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Registro from "./components/Registro";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="row my-4 justify-content-center ">
          <Routes>
            <Route path="/prueba_tecnica" element={<Profile />} />
            <Route path="/prueba_tecnica/register" element={<Registro />} />
            <Route path="/prueba_tecnica/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
