import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PatientLayout from "./pages/PatientLayout";
import PatientMain from "./pages/PatientMain";
import PatientBook from "./pages/PatientBook";
import PatientRegister from "./pages/PatientRegister";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientRegister />} />
        <Route element={<PatientLayout />}>
          <Route path="/main" element={<PatientMain />} />
          <Route path="/book" element={<PatientBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
