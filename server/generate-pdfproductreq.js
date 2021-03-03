const fs = require('fs');
const PDFNet = require('@pdftron/pdfnet-node').PDFNet;
PDFNet.initialize();
//////// editing ///
const doc = require('./generate-docproductreq');
const path = require('path');
var conf = require('../config/config.json').DEV;

//////// editing ///
function getpdfdocproductreq(data)
{
    return new Promise((resolve, reject) => {

        //////// editing ///
        doc.getworddocproductreq(data).then((buf) => {
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

        //////// editing ///
       await PDFNet.Convert.toPdf(pdfDoc, path.join(__dirname, conf.FS.OutputDocxpreq));
        
        //////// editing ///
        pdfDoc.save(path.join(__dirname, conf.FS.OutputPdfpreq), 
        PDFNet.SDFDoc.SaveOptions.e_linearized).then(() => {
           //////// editing ///
           fs.readFile(path.join(__dirname, conf.FS.OutputPdfpreq), (err, data) => {
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

  //////// editing ///
module.exports.getpdfdocproductreq = getpdfdocproductreq;
