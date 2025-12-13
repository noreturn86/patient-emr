import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PatientLayout from "./pages/PatientLayout";
import PatientMain from "./pages/PatientMain";
import PatientBook from "./pages/PatientBook";
import PatientRegister from "./pages/PatientRegister";
import PatientLogin from "./pages/PatientLogin";
import PatientAccount from "./pages/PatientAccount";

import { Provider } from 'react-redux';
import store from "./app/store";


export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PatientLogin />} />
          <Route path="/register" element={<PatientRegister />} />
          <Route element={<PatientLayout />}>
            <Route path="/main" element={<PatientMain />} />
            <Route path="/book" element={<PatientBook />} />
            <Route path="/account" element={<PatientAccount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
