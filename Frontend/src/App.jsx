import { lazy, useState } from "react";
import Navbar from "./Components/NavBar/Navbar";
import { createBrowserRouter, Route, Routes } from "react-router-dom";
import CheckAuth from "./Contexts/CheckAuth";

const Home = lazy(() => import("./Pages/HomePage/Homepage"))
const Forum = lazy(() => import("./Pages/Forumpage/Forumpage"))
const Teams = lazy(() => import("./Pages/TeamPage/Teamspage"))
const Rules = lazy(() => import("./Pages/RulesPage/Rulespage"))
const Games = lazy(() => import("./Pages/GamesPage/Gamespage"))
const Login = lazy(() => import("./Pages/Authentication/LoginPage"))
const Register = lazy(() => import("./Pages/Authentication/Registerpage"))
const RedirectAuth = lazy(() => import("./Contexts/RedirectAuth")); 

function App() {
  return (
      <Routes>
        <Route element={<CheckAuth />}>
          <Route element={<Navbar />}>
            <Route>
              <Route path='/' element={<Home />} />
              <Route path="/teams" element={<Teams />} />  
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
