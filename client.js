const net = require("net");
const fs = require("fs");
const path = process.argv[2];
const destination = process.argv[3];
// establishes a connection with the game server
const connect = function(file) {
  const conn = net.createConnection({
    host: "localhost", // IP address here,
    port: 3000, // PORT number here,
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");
  conn.on("connect", () => {
    console.log("Successfully connected to file server");
    conn.write(file);
  });
  conn.on("data", (data) => {
    if (data.trimRight() === "File done") {
      process.exit();
    }
    fs.writeFile(destination, data, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  });
  conn.on("disconnect", () => process.exit());
  return conn;
};

connect(path);
