
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import AllStudents from "./components/AllStudents";
import Profile from "./components/Profile";
import PayFees from "./components/PayFees";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/students" element={<AllStudents />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pay-fees" element={<PayFees />} />
      </Routes>
    </Router>
  );
}

export default App;
