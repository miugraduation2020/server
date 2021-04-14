// Imported Route Files

const { router } = require('./src/routes/imageRouts');
const FAQRoutes = require('./src/routes/FAQRoutes');
const userRouter = require('./src/routes/userRoute');
const pageRouter = require('./src/routes/pagesRoutes')




// Database 

const { url, mongoose, con } = require("./src/db")

// Express / Middleware / Port
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');


const app = express();
const PORT = 4000;

//mongoose connection
mongoose.Promise = global.Promise;

<<<<<<< HEAD
=======
// Session 
app.use(session({ secret: 'soktom boktom', saveUninitialized: false, resave: true }));
>>>>>>> ad76bb9c7a876060c0a38e588232d6e002adb6b4

//bodyParser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.locals.siteName = 'BCD';

// Routes
FAQRoutes(app);
app.use('/img', router);

// app.use(urouter);


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
app.use(pageRouter);
//Handling 404 page not found
app.get('*', (req, res) => {
    res.render('404')
});

app.listen(PORT, () => {
    console.log(`Node and express server running on port ${PORT}`)
});


