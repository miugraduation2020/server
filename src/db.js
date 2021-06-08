const mongoose = require('mongoose');

const MONGO_USERNAME = 'jana';
const MONGO_PASSWORD = 'OkxJD6oe4J2RLGd2';
const MONGO_HOSTNAME = 'cluster0.2pnqd.mongodb.net';
const MONGO_DB = 'BCDdb';

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?retryWrites=true&w=majority`;

const con = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
});

module.exports = {url, mongoose , con}