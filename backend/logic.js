function parseTimeToMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function simulateAccess(employees) {
  let lastAccess = {};
  const results = [];

  const rooms = {
    ServerRoom: {
      min_access_lvl: 2,
      open_time: parseTimeToMinutes("09:00"),
      close_time: parseTimeToMinutes("11:00"),
      cooldown: 15,
    },
    Vault: {
      min_access_lvl: 3,
      open_time: parseTimeToMinutes("09:00"),
      close_time: parseTimeToMinutes("10:00"),
      cooldown: 30,
    },
    "R&D Lab": {
      min_access_lvl: 1,
      open_time: parseTimeToMinutes("08:00"),
      close_time: parseTimeToMinutes("12:00"),
      cooldown: 10,
    },
  };

  // Sort by request time
  employees = employees.sort(
    (a, b) =>
      parseTimeToMinutes(a.request_time) - parseTimeToMinutes(b.request_time)
  );

  for (let i = 0; i < employees.length; i++) {
    let reqTime = parseTimeToMinutes(employees[i].request_time);
    let reqRoom = employees[i].room;
    let accessLvl = employees[i].access_level;
    let empId = employees[i].id;

    let status, reason;

    const room = rooms[reqRoom];
    if (!room) {
      status = "Denied";
      reason = "Unknown Room";
    } else if (accessLvl < room.min_access_lvl) {
      status = "Denied";
      reason = `Below required level (needs ${room.min_access_lvl})`;
    } else if (reqTime < room.open_time || reqTime > room.close_time) {
      status = "Denied";
      reason = `Room closed (open ${room.open_time}–${room.close_time})`;
    } else {
      const key = `${empId}|${reqRoom}`;
      if (lastAccess.hasOwnProperty(key)) {
        if (reqTime < lastAccess[key] + room.cooldown) {
          status = "Denied";
          reason = `Cooldown active, wait ${
            room.cooldown - (reqTime - lastAccess[key])
          } more min`;
        } else {
          status = "Granted";
          reason = `Access granted to ${reqRoom}`;
          lastAccess[key] = reqTime;
        }
      } else {
        status = "Granted";
        reason = `Access granted to ${reqRoom}`;
        lastAccess[key] = reqTime;
      }
    }

    results.push({
      id: empId,
      access_level: accessLvl,
      request_time: employees[i].request_time,
      room: reqRoom,
      status,
      reason,
    });
  }

  return results;
}

module.exports = { simulateAccess };
