import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./pages/dashboard";
import SignUp from "./components/signup";
import AuthVerify from "./components/authverify";
import ProtectedRoute from "./components/protectedroute";
import NotFound from "./pages/notfound";

function App() {
  return (
    <Router basename={"/"}>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<AuthVerify />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
