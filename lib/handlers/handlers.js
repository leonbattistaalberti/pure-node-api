// request handler
let handlers = {};

// user handler

handlers.user = (data, callback) => {
  // acceptable request methods
  let acceptableMethods = ["get", "post", "put", "delete"];

  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  }
};

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
