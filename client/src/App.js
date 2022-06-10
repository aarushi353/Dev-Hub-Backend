import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/navbar";
import Landing from "./components/layout/landing";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
    <Route exact path='/' element={<Landing />} />
    </Routes>
  </BrowserRouter>
);

export default App
