const helpers = require("./helpers");

// request handler
let handlers = {};

// user handler
handlers.user = (data, callback) => {
  // acceptable request methods
  let acceptableMethods = ["get", "post", "put", "delete"];

  if (acceptableMethods.indexOf(data.method) > -1) {
    // if the method exists call the function related to that method
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

// _users object
handlers._users = {};

// _users post method
// data: firstName, lastName, phoneNumber, password, tosAgreement
handlers._users.post = (data, callback) => {
  let firstName =
    typeof data.payload.firstName == "string" &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;

  let lastName =
    typeof data.payload.lastName == "string" &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;

  let phoneNumber =
    typeof data.payload.phoneNumber == "string" &&
    data.payload.phoneNumber.trim().length == 10
      ? data.payload.phoneNumber.trim()
      : false;

  let password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;

  let tosAgreement =
    typeof data.payload.tosAgreement == "boolean" &&
    data.payload.tosAgreement == true
      ? data.payload.tosAgreement
      : false;

  //check if all the required fields are filled
  if (firstName && lastName && phoneNumber && password && tosAgreement) {
    // check if the user exists
    _data.read("users", phone, (err, data) => {
      if (err) {
        // hash password
        // takes the password sent in the payload
        let hashedPassword = helpers.hash(password);

        // check if the password was hashed successfully
        if (hashedPassword) {
          // create the user object
          let userObject = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            password: hashedPassword,
            tosAgreement: true,
          };
          // store the user
          _data.create("users", phone, userObject, (err) => {
            if (err) {
              console.log(err);
              callback(500, { error: `Failed to create the user` });
            } else {
              callback(200);
            }
          });
        } else {
          callback(500, { error: "Could not hash the password" });
        }
      } else {
        callback(400, { error: `User already exists` });
      }
    });
  }
};

// _users get method
handlers._users.get = (data, callback) => {};

// _users put method
handlers._users.put = (data, callback) => {};

// _users delete method
handlers._users.delete = (data, callback) => {};

// ping route handler
handlers.ping = (data, callback) => {
  //callback http status and the payload if there is one
  callback(200);
};

// films route handler
handlers.films = (data, callback) => {
  callback(406, {
    films: ["blue velvet", "twin peaks"],
  });
};

module.exports = handlers;
