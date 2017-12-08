const fs = require('fs');
const path = require('path');

function splitLine(line) {
  // Split into 3 parts from the back
  const res = [];
  const p2 = line.lastIndexOf(',');
  res[2] = line.substr(p2 + 1);
  const p1 = line.lastIndexOf(',', p2 - 1);
  res[1] = line.substr(p1 + 1, p2);
  res[0] = line.substr(0, p1);
  return res;
}

export default function csv2json(filename) {
  const csvFile = path.resolve(__dirname, filename);
  const csv = fs.readFileSync(csvFile).toString();

  const data = csv.split('\r\n').map((line) => {
    const [party, votes, seats] = splitLine(line);
    return {
      party,
      votes: parseFloat(votes),
      seats: parseFloat(seats),
    };
  });

  return data;
}