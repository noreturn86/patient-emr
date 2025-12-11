import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function PatientLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const patient = useSelector((state) => state.auth.patient);
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="w-full">
      <div className="border flex items-center justify-end gap-4 p-3 relative">
        <h1 className="text-blue-400 text-2xl font-semibold">
          {patient ? `${patient.firstName} ${patient.lastName}` : 'Loading...'}
        </h1>

        <i
          className="fa-solid fa-bars text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        ></i>

        {menuOpen && (
          <div className="absolute right-3 top-16 bg-white border shadow rounded w-32">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
              Log out
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
