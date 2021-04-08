// Imported Route Files

const { urouter, routes } = require('./src/routes/userRoutes');
const crmRoutes = require('./src/routes/crmRoutes');
const { router } = require('./src/routes/imageRouts');
const FAQRoutes = require('./src/routes/FAQRoutes');


// Database 

const { url, mongoose, con } = require("./src/db")

// Express / Middleware / Port
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4000;

//mongoose connection
mongoose.Promise = global.Promise;

//bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
routes(app);
FAQRoutes(app);
crmRoutes(app);
app.use('/img', router);
app.use(urouter);

// app.get('/', (req, res) => {
//     res.send(`Node and express server running on port ${PORT}`)
// });
app.use(express.static(path.join(__dirname, 'src/view')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/view'));
});

app.listen(PORT, () => {
    console.log(`Node and express server running on port ${PORT}`)
});


