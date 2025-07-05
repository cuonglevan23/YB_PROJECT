import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/Layout";
import DashboardPage from "../pages/DashboardPage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import AiChatPage from "../pages/AiChatPage";
import LearnPageNew from "../pages/LearnPageNew";
import CreatePage from "../pages/CreatePage";
import ResearchPageNew from "../pages/ResearchPageNew";
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
        element: <DashboardPage />,
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
        element: <LearnPageNew />,
      },
      {
        path: "coach",
        element: <AiChatPage />, // Default redirect
      },
      {
        path: "upgrade",
        element: <DashboardPage />,
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
        element: <About />,
      },
      {
        path: "support-demo",
        element: <About />,
      },
    ],
  },
]);

// Component Router chính
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
