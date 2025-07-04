import { Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ErrorBoundary from "./components/ErrorBoundary";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LanguageProvider>
          <Suspense
            fallback={
              <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
              </div>
            }
          >
            <AppRouter />
          </Suspense>
        </LanguageProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
