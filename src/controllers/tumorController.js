const mongoose = require('mongoose');
const { TumorSchema } = require('../models/tumorModel');
const Tumor = mongoose.model('Tumor', TumorSchema);
const hbs = require('hbs');

exports.addTumor = async (req, res) => {

    const tumorName = req.body.tname;
    const tumorDescription = req.body.tdescription;
    var tumorClassNumber;
    const errors = 'Tumor record already exists';

    const t = await Tumor.findOne({ tumorName });

    if (tumorName == 'Invasive' || tumorName == 'Invasive Carcinoma' || tumorName == 'invasive carcinoma' || tumorName == 'invasive') {
        tumorClassNumber = 2;
    } else {
        if (tumorName == 'In Situ' || tumorName == 'Carcinoma In Situ' || tumorName == 'carcinoma in situ' || tumorName == 'in situ' || tumorName == 'In-Situ' || tumorName == 'Carcinoma In-Situ' || tumorName == 'in-situ' || tumorName == 'carcinoma in-situ') {
            tumorClassNumber = 1;
        } else {
            if (tumorName == 'Benign' || tumorName == 'benign') {
                tumorClassNumber = 0;
            } else {
                tumorClassNumber = 3;
            }
        }

    }



    if (t) {
        return res.render('addTumor', {
            errors: errors,
            inputTumorName: tumorName,
            inputTumorDescription: tumorDescription,
            inputTumorClassNumber: tumorClassNumber,
        });

    }


    const tumor = new Tumor({
        tumorName, tumorDescription, tumorClassNumber
    });

    await tumor.save().then(tumor => {
        console.log('The tumor with id ' + tumor._id + ' has been added.')

    })
    const all = await Tumor.find();
    console.log(all[0].tumorName);


   return res.render("adminTumor", {html:all});


}

exports.getAllTumor = async (req, res) => {
    const all = await Tumor.find();
    console.log(all[0].tumorName);

  const html = all.forEach(element => {
      ` <tr>
       <td>{{${element.tumorClassNumber}}}</td>
       <td>{{${element.tumorName}}}</td>
       <td>{{${element.tumorDescription}}}</td>
       <td style="text-align:center;" >  <i  class=" far fa-edit
           "></i> </td>
       <td style="text-align:center;" >  <i  class=" far fa-trash-alt
           "></i> </td>
   </tr>`
        
    });
    console.log(html)

}

