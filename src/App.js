import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./css/App.css";
import Footer from "./components/Footer";
import Customer from "./pages/Customer";
import Owner from "./pages/Owner";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="owner" element={<Owner />} />
        <Route path="*" element={<Customer />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
