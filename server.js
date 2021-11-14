const net = require("net");
const fs = require("fs");

const server = net.createServer();

server.on("connection", (client) => {
  console.log("New client connected!");
  client.write("Hello there!");
  client.setEncoding("utf8"); // interpret data as text
  client.on("data", (data) => {
    readFromFile(data, (data) => {
      client.write(data);
      client.end();
    });
  });
  client.on("end", () => {
    console.log("client closed connection");
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000!");
});


const readFromFile = function(path, callback) {
  fs.readFile(path, "utf8", (error, data) => {
    if (error) {
      return callback();
    }
    console.log("Sending file: " + path);
    return callback(data.trimRight());
  });
};

