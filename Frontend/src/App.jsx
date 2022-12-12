import { useState } from "react";
import Navbar from "./Components/NavBar/Navbar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Homepage from "./Pages/HomePage/Homepage";
import Forumpage from "./Pages/ForumPage/Forumpage";
import Teamspage from "./Pages/TeamPage/Teamspage";
import Rulespage from "./Pages/RulesPage/Rulespage";
import Gamespage from "./Pages/GamesPage/Gamespage";
import LoginPage from "./Pages/Authentication/LoginPage";
import Registerpage from "./Pages/Authentication/Registerpage";
function App() {
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
  const Layout = () => {
    return (
      <div>
        <Navbar isLogin={isUserLoggedIn} />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "forum",
          element: <Forumpage />,
        },
        {
          path: "teams",
          element: <Teamspage />,
        },
        {
          path: "rules",
          element: <Rulespage />,
        },
        {
          path: "games",
          element: <Gamespage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <Registerpage />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
