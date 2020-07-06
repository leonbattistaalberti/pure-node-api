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

module.exports = helpers;
