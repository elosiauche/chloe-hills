import { createBrowserRouter } from "react-router-dom";
import { SiteLayout } from "./layouts/SiteLayout";
import { HomePage } from "./pages/HomePage";
import { ComingSoonPage } from "./pages/ComingSoonPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ComingSoonPage title="The Collection" /> },
      { path: "product/:slug", element: <ComingSoonPage title="Product Detail" /> },
      { path: "cart", element: <ComingSoonPage title="Your Cart" /> },
      { path: "wishlist", element: <ComingSoonPage title="Your Wishlist" /> },
      { path: "account", element: <ComingSoonPage title="Your Account" /> },
      { path: "sign-in", element: <ComingSoonPage title="Sign In" /> },
      { path: "requests", element: <ComingSoonPage title="Request a Luxury Item" /> },
      { path: "concierge", element: <ComingSoonPage title="Concierge" /> },
      { path: "*", element: <ComingSoonPage title="Page Not Found" /> },
    ],
  },
]);
