import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { useEffect } from "react";
import { DataContext } from "./Context/DataContextProvider";
import { useContext } from "react";

function App() {
  const { AppDevice, setAppDevice, innerWidth, setInnerWidth } = useContext(DataContext);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setAppDevice(1);
      } else {
        setAppDevice(0);
      }
      setInnerWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
