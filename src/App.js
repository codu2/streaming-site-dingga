import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Homepage from "./pages/Homepage";
import Layout from "./components/Layout";
import Detail from "./components/detail/Detail";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:id" element={<Detail />} />
        <Route path="/tv/:id" element={<Detail />} />
      </Route>
    </Routes>
  );
}

export default App;
