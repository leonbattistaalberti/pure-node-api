const fs = require("fs");
const path = require("path");
const helpers = require("./helpers");

let lib = {};

// get base directory
lib.baseDir = path.join(__dirname, "/../data/");

//Create and write file
lib.create = (dir, file, data, callback) => {
  // create file path
  const filePath = `${lib.baseDir}${dir}/${file}.json`;

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
  const filePath = `${lib.baseDir}${dir}/${file}.json`;
  fs.readFile(filePath, "utf-8", (err, data) => {
    // check if no error and data exists
    if (!err && data) {
      let parsedData = helpers.parseJsonToObject(data);
      callback(false, parsedData);
    } else {
      callback(err, data);
    }
  });
};

// Update file
lib.update = (dir, file, data, callback) => {
  const filePath = `${lib.baseDir}${dir}/${file}.json`;
  fs.open(filePath, "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      let dataToUpdate = JSON.stringify(data);
      fs.ftruncate(fileDescriptor, (err) => {
        // write data to file
        fs.writeFile(fileDescriptor, dataToUpdate, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                // TODO: figure out why callback function was not working in the line below
                console.log(`File updated`);
              } else {
                callback(`Error opening the file ${err}`);
              }
            });
          } else {
            callback(`Error writing the file: ${err}`);
          }
        });
      });
    }
  });
};

// Delete file
lib.delete = (dir, file, callback) => {
  const filePath = `${lib.baseDir}${dir}/${file}.json`;
  fs.unlink(filePath, (err) => {
    if (!err) {
      callback(`File delete successful`);
    } else {
      callback(`File not found`);
    }
  });
};

module.exports = lib;
