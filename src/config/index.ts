import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.STAGE || 'local';

let envConfig: string;

switch (stage) {
    case "production":
        envConfig = require('./prod').default
        break;
    case "testing":
        envConfig = require('./testing').default
        break;
    case "staging":
        envConfig = require('./staging').default
        break;
    default:
        envConfig = require('./local').default
        break;
}
const defaultConfig = {
    stage,
    dbUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    logging: false,
};

export default merge(defaultConfig, envConfig)