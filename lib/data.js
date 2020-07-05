const fs = require("fs");
const path = require("path");

let lib = {};

// get base directory
lib.baseDir = path.join(__dirname, "/../data/");

//Create and write file
lib.create = (dir, file, data, callback) => {
  // create file path
  const filePath = `${lib.baseDir}${dir}/file.json`;

  fs.open(filePath, "wx", (err, fileDescriptor) => {
    // if there is no error and there is a file descriptor:
    // create and write the file
    if (!err && fileDescriptor) {
      let dataToWrite = JSON.stringify(data);
      // write to file
      fs.writeFile(fileDescriptor, dataToWrite, (err) => {
        if (!err) {
          fs.close(fileDescriptor, (err) => {
            if (!err) {
              callback(false);
            } else {
              callback(`Error encountered while closing the file`);
            }
          });
        }
      });
    }
  });
};

// Read file
lib.read = (dir, file, callback) => {
  const filePath = `data/${dir}/${file}.json`;
  fs.readFile(filePath, "utf-8", (err, data) => {
    callback(err, data);
  });
};

module.exports = lib;
