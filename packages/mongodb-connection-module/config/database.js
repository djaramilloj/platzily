const prefix = require('./environment');

module.exports = {
    mongodb: {
        uri: process.env[`${prefix}MONGODB_URI`] || '',
        user: process.env[`${prefix}MONGODB_USER`] || '',
        password: process.env[`${prefix}MONGODB_PASSWORD`] || ''
    }
}