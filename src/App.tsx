import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageAdmin from "./pages/PageAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import PageTeacher from "./pages/PageTeacher";
import PageStudent from "./pages/PageStudent";
import Recovery from "./pages/Recovery";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute/>}>
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<PageAdmin />} />
          <Route path="/student" element={<PageStudent />} />
          <Route path="/teacher" element={<PageTeacher/>} />
        </Route>
        <Route path="/recovery-password" element={<Recovery/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
