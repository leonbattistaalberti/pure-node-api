let environments = {};

environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: "staging",
  hashingSecret: "thisisasecret",
};

environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: "production",
  hashingSecret: "thisisalsoasecret",
};

// if the currenEnvironment is undefined set it to empty string
let currentEnvironment =
  typeof process.env.NODE_ENV == "undefined"
    ? ""
    : process.env.NODE_ENV.toLowerCase();

// if environment is not set then set environment to staging by default
let environmentToExport =
  typeof environments[currentEnvironment] == "object"
    ? environments[currentEnvironment]
    : environments.staging;

// export the set environment
module.exports = environmentToExport;
