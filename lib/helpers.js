const config = require("../config");
const crypto = require("crypto");
// helpers object
let helpers = {};

helpers.hash = (plainPassword) => {
  if (typeof plainPassword == "string" && plainPassword.length > 0) {
    let hash = crypto
      .createHmac("sha256", config.hashingSecret)
      .update(plainPassword)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};
// parseJsonToObject handler
helpers.parseJsonToObject = (jsonData) => {
  try {
    let obj = JSON.parse(jsonData);
    return obj;
  } catch (err) {
    return {};
  }
};
module.exports = helpers;
