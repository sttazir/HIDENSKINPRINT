const fs = require('fs');
const PDFNet = require('@pdftron/pdfnet-node').PDFNet;
PDFNet.initialize();
const doc = require('./generate-docproduct');
const path = require('path');
var conf = require('../config/config.json').DEV;

function getpdfdocproduct(data)
{
    return new Promise((resolve, reject) => {

        ///  HELLO WORLD
        doc.getworddocproduct(data).then((buf) => {
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
       await PDFNet.Convert.toPdf(pdfDoc, path.join(__dirname, conf.FS.OutputDocxproduct));
        
        pdfDoc.save(path.join(__dirname, conf.FS.OutputPdfproduct), 
        PDFNet.SDFDoc.SaveOptions.e_linearized).then(() => {
           fs.readFile(path.join(__dirname, conf.FS.OutputPdfproduct), (err, data) => {
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

module.exports.getpdfdocproduct = getpdfdocproduct;
