// Imported Route Files

// const FAQRouter = require('./src/routes/FAQRoutes');
const userRouter = require('./src/routes/userRoute');
const tumorRouter = require('./src/routes/tumorRoutes');
const pageRouter = require('./src/routes/pagesRoutes');
const pathologistRouter = require('./src/routes/pathologistRoutes');
const imageRouter = require('./src/routes/imageRouts');
const reportRouter = require('./src/routes/reportRoutes');



// Database 

const { url, mongoose, con } = require("./src/db")


// Express / Middleware / Port
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');




const app = express();
const PORT = 4000;

//mongoose connection
mongoose.Promise = global.Promise;

// Session 
app.use(session({
  secret: 'soktom boktom', saveUninitialized: false, resave: true, cookie: {
    sameSite: true,
    secure: false,
    expires: false
  }
}));
//bodyParser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.locals.siteName = 'BCD';






const viewsPath = path.join(__dirname, 'src/view');
const partialsPath = path.join(__dirname, 'src/view/partials');



//defining the engine and changing path from views to src/view
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)
app.use(express.static(path.join(__dirname, 'src/view')))
app.use(express.json())

//our main page 
app.get('/', (req, res) => {
  res.render('index')
});

app.use(userRouter);
app.use(tumorRouter);
app.use(pageRouter);
app.use(pathologistRouter);
// app.use(FAQRouter);
app.use(imageRouter);
app.use(reportRouter);

/////////////////////////////////GRIDFS////////////////////////////////////////////
const imagecont = require('./src/controllers/imageController');
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const fs = require('fs');
const mongo = require("mongodb")
const conn = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// init gfsdb
let gfsdb;
let Ifilename;
let Ipatient;
let Ipathologist;
conn.once("open", () => {
  // init stream

  gfsdb = new mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});

// Storage
const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        Ipatient = req.body.patient;
        Ipathologist = req.body.pathologist;
        Ifilename = filename;
        const fileInfo = {
          filename: filename,
          metadata: { 'pathologistID': req.body.pathologist, 'patientId': req.body.patient },
          bucketName: "uploads"
        };
        resolve(fileInfo);

      });
    });
  }

});

const upload = multer({
  storage
});


app.post("/upload", upload.single('file'), (req, res) => {

  //ADD IMAGE FUNCTION
  this.downloadImage();
  imagecont.addImage(Ifilename, Ipatient, Ipathologist);
  return res.render("diagnosing");


});



exports.downloadImage = async () => {
  console.log("DIR" + __dirname)
  var fsstreamwrite = fs.createWriteStream(
    path.join(__dirname, "src\\models\\DiagnosisImages\\" + Ifilename)
  );

  var readstream = await gfsdb.createReadStream({
    filename: Ifilename
  });
  readstream.pipe(fsstreamwrite);
  readstream.on("close", function (file) {
    console.log("File Read successfully from database");
  });
}


// // files/del/:id
// // Delete chunks from the db
// app.post("/files/del/:id", (req, res) => {
//   gfsdb.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
//     if (err) return res.status(404).json({ err: err.message });
//     res.redirect("/");
//   });
// });


/////////////////////////////////////////////////////////////////////////////

//Handling 404 page not found
app.get('*', (req, res) => {
  res.render('404')
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Node and express server running on port ${process.env.PORT || PORT}`)
});