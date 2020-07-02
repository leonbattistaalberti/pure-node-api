let environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging'
};

environments.production = {
    port: 5000,
    envName: 'production'
};

// if the currenEnvironment is undefined set it to empty string
let currentEnvironment = typeof(process.env.NODE_ENV) == 'undefined' ? '' : process.env.NODE_ENV.toLowerCase();


// if environment is not set then set environment to staging by default
let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// export the set environment
module.exports = environmentToExport