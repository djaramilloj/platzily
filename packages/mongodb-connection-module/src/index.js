const mongoose = require('mongoose');

const config = require('../config/database');
const logger = require('./utils/logger');

mongoose.Promise = global.Promise;

const db = mongoose.createConnection(config.mongodb.uri, {
    useNewUrlParser: true,
    auth: {
        user: config.mongodb.user,
        password: config.mongodb.password
    }
});

// todo es un evento en nodejs
db.on('error', (err) => {
    logger.error(`[pl-mongo-db-connection-module]: Connection error event: ${err.message}`);
    process.exit(1); // todo lo que no sea codigo 0 es porque un error ocurrio
});
// cuando la db arranque
db.once('open', () => {
    logger.info(`[pl-mongo-db-connection-module]: Connection opened with the DB`);
});
// ver cada vez que alguien se conecte a la db
db.on('connected', () => logger.info(`[pl-mongo-db-connection-module]: Mongoose connection is openes to ${config.mongodb.uri}`));
// desconección
db.on('disconnected', () => logger.info(`[pl-mongo-db-connection-module]: Mongoose connection is closed`));

process.on('SIGINT', () => {
    db.close(() => {
        logger.info(`[pl-mongo-db-connection-module]: Mongo connection has been disconnected due to application termination`);
        process.exit(1);
    });
})