// Imported Route Files

const userRoutes = require('./src/routes/userRoutes');
const crmRoutes = require('./src/routes/crmRoutes');
const {router} = require('./src/routes/imageRouts');


// Database 

const {url, mongoose, con} = require("./src/db")

// Express / Middleware / Port
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

//mongoose connection
mongoose.Promise = global.Promise;

//bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
userRoutes(app);
crmRoutes(app);
app.use('/img', router);

app.get('/', (req, res) => {
    res.send(`Node and express server running on port ${PORT}`)
});

app.listen(PORT, () => {
    console.log(`Node and express server running on port ${PORT}`)
});


