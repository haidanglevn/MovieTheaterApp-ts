import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import "./App.css";
import Home from "./components/Home";
import MovieSingle from "./components/MovieSingle";
import Profile from "./components/Profile";
import TestNew from "./components/TestNew";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<TestNew />} />
              <Route path="/test/:single/*" element={<MovieSingle />} />
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
