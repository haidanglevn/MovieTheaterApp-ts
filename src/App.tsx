import { BrowserRouter, Route, Routes } from "react-router-dom";
import Theater from "./components/Theater";
import Layout from "./pages/Layout";
import "./App.css";
import Home from "./components/Home";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Home/>}/>
              <Route path="/theater" element={<Theater />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
