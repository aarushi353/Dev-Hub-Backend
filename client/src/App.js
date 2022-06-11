import React from "react";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import Login from "./components/auth/login";
import Register from "./components/auth/register";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
    <Route exact path='/' element={<Landing />} />
    <Route exact path='/register' element={<Register />} />
    <Route exact path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App
