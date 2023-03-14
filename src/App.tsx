import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import "./App.css";
import New from "./components/New";
import MovieSingle from "./components/MovieSingle";
import Profile from "./components/Profile";
import Popular from "./components/Popular";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<New />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/popular/:single/*" element={<MovieSingle />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/:single/*" element={<MovieSingle />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
