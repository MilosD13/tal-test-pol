import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import CreatePoll from "./pages/CreatePoll";
import ViewPoll from "./pages/ViewPoll.jsx";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <GlobalStyles />

      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="create-poll" element={<CreatePoll />} />
              <Route path="login" element={<Login />} />
              <Route path="poll/:id" element={<ViewPoll />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
