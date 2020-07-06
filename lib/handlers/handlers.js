// request handler
let handlers = {};

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
