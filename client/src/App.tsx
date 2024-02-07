import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Product from "./Pages/Product";
import Invoice from "./Pages/Invoice";

// all routes
const routes = [
  {
    name: "Register",
    link: "/register",
    element: <Register />,
  },
  {
    name: "Login",
    link: "/login",
    element: <Login />,
  },
  {
    name: "Products",
    link: "/",
    element: <Product />,
  },
  {
    name: "Invoice",
    link: "/invoice/:_id",
    element: <Invoice />
  }
]

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.link} path={route.link} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
