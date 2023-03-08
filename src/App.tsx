import { BrowserRouter, Route, Routes } from "react-router-dom";
import SeatMap from "./components/SeatMap";
import Layout from "./pages/Layout";
import "./App.css";
import Home from "./components/Home";
import MovieSingle from "./components/MovieSingle";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Home/>}/>
              <Route path="/home/:single" element={<MovieSingle/>}/>
              <Route path="/seatmap" element={<SeatMap />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
