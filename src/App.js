import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import ShopPage from "./pages/Shop";
import LoginPage from "./pages/Login";
import SingleProductPage from "./pages/SingleProduct";
import CartPage from './pages/Cart'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <ShopPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: ":productId",
          element: <SingleProductPage />
        },
        {
          path: "cart",
          element: <CartPage />
        }
      ],
    },
  ]);

  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
