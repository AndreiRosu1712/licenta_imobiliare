import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddListingPage from "./pages/AddListingPage";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adauga-anunt" element={<AddListingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;