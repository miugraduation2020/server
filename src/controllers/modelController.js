const mongoose = require('mongoose');
const session = require('express-session');
const {PythonShell} = require('python-shell');
const { spawn } = require('child_process')
const { ModelSchema  } = require('../models/modelModel');
const Model = mongoose.model('Model', ModelSchema);

module.exports= function (imgPath){

var myPythonScript = "src\\models\\pythonModel\\FinalModel.py";
var pythonExecutable = "C:\\Users\\DELL\\AppData\\Local\\Programs\\Python\\Python38\\python.exe";
const imagePath= imgPath;
//const Path="D:\\MIU\\Graduation Project\\ICIAR2018_BACH_Challenge\\Photos\\Invasive\\iv004.tif";

    const logOutput = (name) => (message) =>{ 
      console.log(`[${name}] ${message}`);
  }

    function run() {
      return new Promise((resolve, reject) => {
        const process = spawn(pythonExecutable, [myPythonScript, imagePath]);
        const out = []
        process.stdout.on(
          'data',
          (data) => {
            out.push(data.toString());
            logOutput('stdout')(data);
          }
        );
    
        const err = []
        process.stderr.on(
          'data',
          (data) => {
            err.push(data.toString());
            logOutput('Classss')(data);
          }
        );
    
        process.on('exit', (code, signal) => {
          logOutput('exit')(`${code} (${signal})`)
          if (code !== 0) {
            reject(new Error(err.join('\n')))
            return
          }
          try {
            resolve(JSON.parse(JSON.stringify(out[0])));
          } catch(e) {
            reject(e);
          }
        });
      });
    }

 ( async () => {
        try {
          const output = await run()
          logOutput('main')(output)
          process.exit(0)
        } catch (e) {
          console.error('Error during script execution ', e.stack);
          process.exit(1);
        }
      }
  )();

    }

