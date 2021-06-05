const mongoose = require('mongoose');
const session = require('express-session');
const {PythonShell} = require('python-shell');
const { spawn } = require('child_process')
const { ModelSchema  } = require('../models/modelModel');
const Model = mongoose.model('Model', ModelSchema);

module.exports= function (imgPath,callback){
var pythonExecutable = "C:\\Users\\DELL\\AppData\\Local\\Programs\\Python\\Python38\\python.exe"
var myPythonScript = "src\\models\\pythonModel\\FinalModel.py";
//var pythonExecutable = "C:\\Users\\pc\\anaconda3\\envs\\tensorflow\\python.exe";
const imagePath= imgPath;
var tumor;
//const Path="D:\\MIU\\Graduation Project\\ICIAR2018_BACH_Challenge\\Photos\\Invasive\\iv004.tif";

    const logOutput = (name) => (message) =>{ 
      console.log(`[${name}] ${message}`);
      
  }
    async function sendClass(tClass){
      return tClass
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
            console.log('1 ')
          }
        );
    
        const err = []
        process.stderr.on(
          'data',
          (data) => {
            err.push(data.toString());
            logOutput('stderr')(data);
            console.log('2 ')

          }
        );
    
        process.on('exit', (code, signal) => {
          logOutput('exit')(`${code} (${signal})`)
          if (code !== 0) {
            reject(new Error(err.join('\n')))
            
          }
          try {
            resolve(JSON.parse(JSON.stringify(out[0])));
          } catch(e) {
            reject(e);
          }  console.log('3 ')
 
        });
      });
    }

 ( async () => {
        try {
          const output = await run()
          logOutput('main')(output)
          console.log('4')
          tumor=output
          const output2= await sendClass(tumor)
          myString= output2.replace(/\s/g, "")
          if(myString=='"0"'){
          diagnosis="0"
        }
          if(myString=='"1"'){          
            diagnosis=" 1"
                }
          if(myString=='"2"'){          
          diagnosis="2"
                }
          if(myString=='"3"'){          
          diagnosis="3"
                }
          callback(diagnosis)
        } catch (e) {
          console.error('Error during script execution ', e.stack);
          process.exit(1);
        }


      }
  )();


    }

