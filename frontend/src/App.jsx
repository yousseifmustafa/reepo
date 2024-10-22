import { useContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Shop from "./Components/Shop/Shop";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { Toaster } from "react-hot-toast";

import Tokencontext, {
  TokenAuthContext,
} from "./Components/Context/Tokencontext";
import ProtectedRoutes from "./Components/ProtectingRoutes/ProtectedRoutes";



import Cart from "./Components/Cart/Cart";
import Error from "./Components/Error/Error";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Cartcontext from "./Components/Context/Cartcontext";
import Congratulations from "./Components/Congratulations/Congratulations";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "Shop",
          element: (
            <ProtectedRoutes>
              <Shop />
            </ProtectedRoutes>
          ),
        },
        { path: "Login", element: <Login /> },
        { path: "Register", element: <Register /> },
        {
          path: "Cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "ProductDetails",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {path:"ProductDetails/:id" , element:  
        <ProtectedRoutes>
         <ProductDetails/>
        </ProtectedRoutes>},
        
        {path:"About",element:<About/>},
        {path:"Contact",element:<Contact/>},
        {path:"Congratulations",element:<ProtectedRoutes>
          <Congratulations/>
         </ProtectedRoutes>},
      { path: "*", element: <Error /> },
      ],
    },
  ]);
  return (
    <>
      <Tokencontext>
        <Cartcontext>
          <RouterProvider router={router} />
          <Toaster />
        </Cartcontext>
      </Tokencontext>
    </>
  );
}

export default App;
