import { lazy, useState } from "react";
import Navbar from "./Components/Navbar";
import { createBrowserRouter, Route, Routes } from "react-router-dom";
import CheckAuth from "./Contexts/CheckAuth";
import Footer from "./Components/Footer";
const Home = lazy(() => import("./Pages/Homepage"))
const Forum = lazy(() => import("./Pages/Forumpage"))
const Rules = lazy(() => import("./Pages/Rulespage"))
const Games = lazy(() => import("./Pages/Gamespage"))
const Login = lazy(() => import("./Pages/Authentication/LoginPage"))
const Register = lazy(() => import("./Pages/Authentication/Registerpage"))
const Dashboard = lazy(() => import("./Pages/Dashboard")); 

function App() {
  return (
      <Routes>
        <Route element={<CheckAuth />}>
          {/* TODO: Add adminOnly middlewear */}
          <Route path="/dashboard"> 
            <Route element={<Dashboard />} path="" />
          </Route>

          <Route element={<Navbar />}>
            <Route element={<Footer />}>
              <Route path='/' element={<Home />} />
              <Route path="/rules" element={<Rules />} />  
              <Route path="/games" element={<Games />} />  
              <Route path="/forum" element={<Forum />} />  
            </Route>

            <Route element={<RedirectAuth />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
