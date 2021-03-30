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