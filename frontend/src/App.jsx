import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [empId, setEmpId] = useState("");
  const [reqTime, setReqTime] = useState("");
  const [accessLvl, setAccessLvl] = useState("");
  const [room, setRoom] = useState("");
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    fetch("/employees.json")
      .then((emp) => emp.json())
      .then((res) => {
        setEmployees(res);
      });

    console.log(employees);
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
                    <tr key={idx}>
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
            <div>
              <button
                onClick={() => setDisplay(true)}
                className={`${
                  !display
                    ? "text-center w-full border py-1 cursor-pointer"
                    : "hidden"
                }`}
              >
                Add Employee Data
              </button>
              <div
                className={`${
                  display
                    ? "flex flex-col items-center gap-2 py-2 border"
                    : "hidden"
                }`}
              >
                <label className="flex" htmlFor="">
                  <p className="w-26">Employee ID:</p>{" "}
                  <input
                    className="border"
                    type="text"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                    name=""
                    id=""
                  />
                </label>
                <label className="flex" htmlFor="">
                  <p className="w-26">Access Level:</p>{" "}
                  <input
                    className="border"
                    type="text"
                    value={accessLvl}
                    onChange={(e) => setAccessLvl(e.target.value)}
                    name=""
                    id=""
                  />
                </label>
                <label className="flex" htmlFor="">
                  <p className="w-26">Request Time:</p>{" "}
                  <input
                    className="border"
                    type="text"
                    value={reqTime}
                    onChange={(e) => setReqTime(e.target.value)}
                    name=""
                    id=""
                  />
                </label>
                <label className="flex" htmlFor="">
                  <p className="w-26">Room:</p>{" "}
                  <input
                    className="border"
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    name=""
                    id=""
                  />
                </label>
                <button
                  className="border rounded px-3 py-1"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
