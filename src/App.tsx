import { BrowserRouter, Route, Routes } from "react-router-dom";
import SeatMap from "./components/SeatMap";
import Layout from "./pages/Layout";
import "./App.css";
import Home from "./components/Home";
import MovieSingle from "./components/MovieSingle";
interface Props {
  name: string;
  id: number;
}

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/:single" element={<MovieSingle />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
