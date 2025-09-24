
import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [empId, setEmpId] = useState("");
  const [reqTime, setReqTime] = useState("");
  const [accessLvl, setAccessLvl] = useState("");
  const [room, setRoom] = useState("");
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  async function handleSimulate() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employees),
      });
      const json = await res.json();
      setResults(json.results || []);
    } catch (err) {
      console.error(err);
      alert("Simulation failed. See console.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch("/employees.json")
      .then((emp) => emp.json())
      .then((res) => {
        setEmployees(res);
      });
  }, []);

  function addEmployee(emp) {
    setEmployees((prev) => [...prev, emp]);
    setEmpId("");
    setReqTime("");
    setRoom("");
    setAccessLvl("");
    setDisplay(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">
        Employee Access Simulator
      </h1>

      {/* Employee Table */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Employee Requests</h2>
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-2 border">Employee ID</th>
              <th className="p-2 border">Access Level</th>
              <th className="p-2 border">Request Time</th>
              <th className="p-2 border">Room</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-2 border text-center">{emp.id}</td>
                <td className="p-2 border text-center">{emp.access_level}</td>
                <td className="p-2 border text-center">{emp.request_time}</td>
                <td className="p-2 border text-center">{emp.room}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Employee Button & Form */}
        <div className="mt-4">
          {!display && (
            <button
              onClick={() => setDisplay(true)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Employee Data
            </button>
          )}
          {display && (
            <div className="mt-4 border rounded-lg p-4 flex flex-col gap-3 bg-gray-50">
              <label className="flex flex-col">
                <span className="font-medium">Employee ID</span>
                <input
                  className="border rounded px-2 py-1"
                  type="text"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Access Level</span>
                <input
                  className="border rounded px-2 py-1"
                  type="text"
                  value={accessLvl}
                  onChange={(e) => setAccessLvl(e.target.value)}
                />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Request Time</span>
                <input
                  className="border rounded px-2 py-1"
                  type="text"
                  value={reqTime}
                  onChange={(e) => setReqTime(e.target.value)}
                />
              </label>
              <label className="flex flex-col">
                <span className="font-medium">Room</span>
                <input
                  className="border rounded px-2 py-1"
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
              </label>
              <button
                className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                onClick={() =>
                  addEmployee({
                    id: empId,
                    access_level: accessLvl,
                    request_time: reqTime,
                    room: room,
                  })
                }
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Simulate Button */}
      <button
        onClick={handleSimulate}
        disabled={loading}
        className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700 transition mb-6"
      >
        {loading ? "Simulating..." : "Simulate Access"}
      </button>

      {/* Results Table */}
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Results</h2>
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
          <thead className="bg-green-100">
            <tr>
              <th className="p-2 border">Employee ID</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Room</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Reason</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr
                key={i}
                className={`hover:bg-gray-50 ${
                  r.status === "Granted" ? "text-green-700" : "text-red-700"
                }`}
              >
                <td className="p-2 border text-center">{r.id}</td>
                <td className="p-2 border text-center">{r.request_time}</td>
                <td className="p-2 border text-center">{r.room}</td>
                <td className="p-2 border text-center font-semibold">
                  {r.status}
                </td>
                <td className="p-2 border text-center">{r.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
