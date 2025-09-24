// function App() {
//   const [employees, setEmployees] = useState([]);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetch("/employees.json")
//       .then((r) => r.json())
//       .then(setEmployees)
//       .catch((err) => console.error(err));
//   }, []);

//   async function handleSimulate() {
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:3000/simulate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(employees),
//       });
//       const json = await res.json();
//       setResults(json.results || []);
//     } catch (err) {
//       console.error(err);
//       alert("Simulation failed. See console.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Employee Requests</h2>
//       <table border="1" cellPadding="6">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Level</th>
//             <th>Time</th>
//             <th>Room</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((e, i) => (
//             <tr key={i}>
//               <td>{e.id}</td>
//               <td>{e.access_level}</td>
//               <td>{e.request_time}</td>
//               <td>{e.room}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button
//         onClick={handleSimulate}
//         disabled={loading}
//         style={{ marginTop: 12 }}
//       >
//         {loading ? "Simulating..." : "Simulate Access"}
//       </button>

//       <h2>Results</h2>
//       <table border="1" cellPadding="6">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Time</th>
//             <th>Room</th>
//             <th>Status</th>
//             <th>Reason</th>
//           </tr>
//         </thead>
//         <tbody>
//           {results.map((r, i) => (
//             <tr key={i}>
//               <td>{r.id}</td>
//               <td>{r.request_time}</td>
//               <td>{r.room}</td>
//               <td>{r.status}</td>
//               <td>{r.reason}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("/employees.json")
      .then((emp) => emp.json())
      .then((res) => setEmployees(res));
  }, []);

  return (
    <>
      <div className="flex flex-col gap-10">
        <h1 className="text-center text-4xl font-bold py-4">
          Simulate Employee Access
        </h1>
        <div className="flex flex-col justify-center items-center">
          <div>
            <table className="border-1 ">
              <thead>
                <tr>
                  <th className="border-1 px-2">Employee Id</th>
                  <th className="border-1 px-2">Access Level</th>
                  <th className="border-1 px-2">Request Time</th>
                  <th className="border-1 px-10">Room</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, idx) => {
                  return (
                    <tr>
                      <td className="border-1 text-center">{emp.id}</td>
                      <td className="border-1 text-center">
                        {emp.access_level}
                      </td>
                      <td className="border-1 text-center">
                        {emp.request_time}
                      </td>
                      <td className="border-1 text-center">{emp.room}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="">
              <button className="text-center w-full border py-1 cursor-pointer">
                Add Employee Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
