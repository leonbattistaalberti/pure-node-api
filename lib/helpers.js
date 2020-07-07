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

helpers.createRandomString = (strLen) => {
  // TODO: check for string length
  // alpha-numeric characters to use for creating random string
  const alphaNumericValues = "abcdefghijklmnopqrstuvwxyz0123456789";
  // check if string length for random string was provided
  if (strLen) {
    let randomString = "";
    // loop over alphaNumericValues and append a random char to randomAlphaNumChar
    for (let i = 1; i <= strLen; i++) {
      let randomAlphaNumChar = alphaNumericValues.charAt(
        Math.floor(Math.random() * alphaNumericValues.length)
      );
      randomString += randomAlphaNumChar;
    }
    console.log(randomString);
    return randomString;
  }
};
module.exports = helpers;
