import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/auth/auth";
import { RequireAuth } from "./components/auth/requireAuth";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import WeekList from "./pages/WeekList";
import MyList from "./pages/MyList";
import { Navbar } from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<Login />} />

              <Route
                path="/weeklist"
                element={
                  <RequireAuth>
                    <WeekList />
                  </RequireAuth>
                }
              />
              <Route
                path="/mylist"
                element={
                  <RequireAuth>
                    <MyList />
                  </RequireAuth>
                }
              />

              <Route path="/register" element={<Register />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
