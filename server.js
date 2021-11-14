const fs = require("fs");

const readFromFile = function(path, callback) {
  fs.readFile(path, "utf8", (error, data) => {
    if (error) {
      return callback();
    }
    return callback(data.trimRight());
  });
};

