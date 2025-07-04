import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import LogoDemo from "../pages/LogoDemo";
import SupportDemo from "../pages/SupportDemo";
import AiChatPage from "../pages/AiChatPage";
import LearnPage from "../pages/LearnPage";
import CreatePage from "../pages/CreatePage";
import TestPage from "../pages/TestPage";
import ProtectedRoute from "../components/ProtectedRoute";

// Cấu hình routes cho ứng dụng
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <TestPage />,
      },
      {
        path: "optimize",
        element: <About />,
      },
      {
        path: "research",
        element: <About />,
      },
      {
        path: "create",
        element: <CreatePage />,
      },
      {
        path: "create/thumbnail",
        element: <CreatePage />,
      },
      {
        path: "create/ideas",
        element: <CreatePage />,
      },
      {
        path: "create/script",
        element: <CreatePage />,
      },
      {
        path: "create/optimize",
        element: <CreatePage />,
      },
      {
        path: "coach/ai-chat",
        element: <AiChatPage />,
      },
      {
        path: "coach/learn",
        element: <LearnPage />,
      },
      {
        path: "coach",
        element: <AiChatPage />, // Default redirect
      },
      {
        path: "upgrade",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "logo-demo",
        element: <LogoDemo />,
      },
      {
        path: "support-demo",
        element: <SupportDemo />,
      },
    ],
  },
]);

// Component Router chính
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
