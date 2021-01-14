const fs = require('fs');
const PDFNet = require('@pdftron/pdfnet-node').PDFNet;
PDFNet.initialize();
const doc = require('./generate-docstock');
const path = require('path');
var conf = require('../config/config.json').DEV;

function getpdfdocstock(data)
{
    return new Promise((resolve, reject) => {

        ///  HELLO WORLD
        doc.getworddocstock(data).then((buf) => {
            convertDocxToPdf((err, result) => {
                if(err) reject(err);
                if(result && err === undefined)
                resolve(result);
            });
        }, (err) => {
            reject(err);
        });
    });
}

async function convertDocxToPdf(callback)
{
    try
    {

       const pdfDoc = await PDFNet.PDFDoc.create();
       await pdfDoc.initSecurityHandler();
       await PDFNet.Convert.toPdf(pdfDoc, path.join(__dirname, conf.FS.OutputDocxstock));
        
        pdfDoc.save(path.join(__dirname, conf.FS.OutputPdfstock), 
        PDFNet.SDFDoc.SaveOptions.e_linearized).then(() => {
           fs.readFile(path.join(__dirname, conf.FS.OutputPdfstock), (err, data) => {
            if(err){
                console.log(err);
            }
            
               console.log('data is'+JSON.stringify(data));
               callback(undefined,data);

           })
        })   
         
    

    }
    catch(error)
    {
        console.log(error);
        callback(error);
    }
}

module.exports.getpdfdocstock = getpdfdocstock;
