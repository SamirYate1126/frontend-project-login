import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageAdmin from "./pages/PageAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import PageTeacher from "./pages/PageTeacher";
import PageStudent from "./pages/PageStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute/>}>
          <Route path="/admin" element={<PageAdmin />} />
          <Route path="/student" element={<PageStudent />} />
          <Route path="/teacher" element={<PageTeacher/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
