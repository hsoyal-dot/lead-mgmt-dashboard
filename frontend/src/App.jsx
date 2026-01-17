import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Leads from "./pages/Lead";
import LeadDetails from "./pages/LeadDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/leads/:id" element={<LeadDetails />} />
      </Routes>
    </BrowserRouter>
  );
}