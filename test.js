const userRoutes = require('./src/routes/userRoutes');
const crmRoutes = require('./src/routes/crmRoutes');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://jana:OkxJD6oe4J2RLGd2@cluster0.2pnqd.mongodb.net/BCDdb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

userRoutes(app);
crmRoutes(app);
app.get('/', (req, res) => {
    res.send(`Node and express server running on port ${PORT}`)
});

app.listen(PORT, () => {
    console.log(`Node and express server running on port ${PORT}`)
});

// test 
var gridfs = require('gridfs-stream');
var fs = require('fs');

var db_filename = "test.tif";
var local_file = "is003.tif";
gridfs.mongo = mongoose.mongo;

var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {

    var gfs = gridfs(connection.db);

    app.get('/', function (req, res) {
        res.send('Demo of MongoDB – GridFS by niralar.com');
    });

    //Writing a file from local to MongoDB
    app.get('/write', function (req, res) {
        var writestream = gfs.createWriteStream({ filename: db_filename });
        fs.createReadStream(local_file).pipe(writestream);
        writestream.on('close', function (file) {
            res.send('File Created : ' + file.filename);
            console.log("writing")
        });
    });
    app.get('/read', function (req, res) {
        // Check file exist on MongoDB
        gfs.exist({ filename: db_filename }, function (err, file) {
            if (err || !file) {
                res.send('File Not Found');
            } else {
                var readstream = gfs.createReadStream({ filename: db_filename });
                readstream.pipe(res);
            }
            console.log(reaading)
        });
    });
    app.get('/delete', function (req, res) {
        gfs.exist({ filename: db_filename }, function (err, file) {
            if (err || !file) {
                res.send('File Not Found');
            } else {
                gfs.remove({ filename: db_filename }, function (err) {
                    if (err) res.send(err);
                    res.send('File Deleted');
                });
            }
        });
    });
     // Get file information(File Meta Data) from MongoDB
     app.get('/meta', function (req, res) {
        gfs.exist({ filename: db_filename }, function (err, file) {
            if (err || !file) {
                res.send('File Not Found');
            } else {
                gfs.files.find({ filename: db_filename }).toArray(function (err, files) {
                    if (err) res.send(err);
                    res.send(files);
                });
            }
        });
    });
});