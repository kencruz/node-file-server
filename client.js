const net = require("net");
const path = process.argv[2];
// establishes a connection with the game server
const connect = function(file) {
  const conn = net.createConnection({
    host: "localhost", // IP address here,
    port: 3000, // PORT number here,
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");
  conn.on("connect", () => {
    console.log("Successfully connected to game server");
    conn.write(file);
  });
  conn.on("data", (data) => {
    if (data.trimRight() === "File done") {
      process.exit();
    }
    console.log("Server says: ", data);
  });
  return conn;
};

connect(path);
