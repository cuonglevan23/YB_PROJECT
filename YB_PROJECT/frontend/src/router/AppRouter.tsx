import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/Layout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import AiChatPage from "../pages/AiChatPage";
import LearnPageNew from "../pages/LearnPageNew";
import CreatePage from "../pages/CreatePage";
import DashboardPage from "../pages/DashboardPage";
import ResearchPageNew from "../pages/ResearchPageNew";
import OptimizePage from "../pages/OptimizePage";
import KeywordsPage from "../pages/KeywordsPage";
import CompetitorsPage from "../pages/CompetitorsPage";
import OutliersPage from "../pages/OutliersPage";
import ProtectedRoute from "../components/ProtectedRoute";

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
        element: <OptimizePage />,
      },
      {
        path: "keywords",
        element: <KeywordsPage />,
      },
      {
        path: "competitors",
        element: <CompetitorsPage />,
      },
      {
        path: "research",
        element: <ResearchPageNew />,
      },
      {
        path: "research/outliers",
        element: <OutliersPage />,
      },
      {
        path: "research/keywords",
        element: <KeywordsPage />,
      },
      {
        path: "research/competitors",
        element: <CompetitorsPage />,
      },
      {
        path: "research/subscribers",
        element: <ResearchPageNew />,
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
        element: <AiChatPage />,
      },
      {
        path: "upgrade",
        element: <About />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
