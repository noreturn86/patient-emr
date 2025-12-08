import { Link } from "react-router-dom";

export default function PatientMain() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <Link
          to="/book"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Book an appointment
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-3">Upcoming appointments</h2>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">Appointment</th>
            <th className="border px-3 py-2 text-left">Provider</th>
            <th className="border px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3" className="border px-3 py-3 text-center text-gray-500">
              No upcoming appointments
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
