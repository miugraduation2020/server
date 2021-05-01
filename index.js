// Imported Route Files

const FAQRouter = require('./src/routes/FAQRoutes');
const userRouter = require('./src/routes/userRoute');
const tumorRouter = require('./src/routes/tumorRoutes');
const pageRouter = require('./src/routes/pagesRoutes');
const pathologistRouter = require('./src/routes/pathologistRoutes');
const imageRouter = require('./src/routes/imageRouts');



// Database 

const { url, mongoose, con } = require("./src/db")

// Express / Middleware / Port
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const app = express();
const PORT = 4000;

//mongoose connection
mongoose.Promise = global.Promise;

// Session 
app.use(session({ secret: 'soktom boktom', saveUninitialized: false, resave: true ,  cookie: {
    sameSite: true,
    secure: false,
    expires: false
  } }));
//bodyParser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.locals.siteName = 'BCD';






const viewsPath = path.join(__dirname, 'src/view');
const partialsPath = path.join(__dirname, 'src/view');



//defining the engine and changing path from views to src/view

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)
app.use(express.static(path.join(__dirname, 'src/view')))

//our main page 
app.get('/', (req, res) => {
    res.render('index')
});

app.use(userRouter);
app.use(tumorRouter);
app.use(pageRouter);
app.use(pathologistRouter);
app.use(FAQRouter);
app.use(imageRouter);

//Handling 404 page not found
app.get('*', (req, res) => {
    res.render('404')
});

app.listen(PORT, () => {
    console.log(`Node and express server running on port ${PORT}`)
});
