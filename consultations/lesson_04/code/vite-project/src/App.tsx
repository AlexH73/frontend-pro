import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Alcohol from "./components/Alcohol/Alcohol";
import CityPage from "./components/CityPage/CityPage";
import type { JSX } from "react";

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/alcohol" element={<Alcohol />} />
          <Route path="/citypage" element={<CityPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
