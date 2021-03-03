var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
var fs = require('fs');
var path = require('path');
var conf = require('../config/config.json').DEV;

function getworddocproductreq(data)
{
    return new Promise((resolve, reject) => {        
       
        //console.log("data is"+ JSON.stringify(data));

         //////// editing ///
        var content = fs.readFileSync(path.join(__dirname, conf.FS.InputTemplatepreq), 'binary');

        var zip = new PizZip(content);
            var doc;
            try {
                doc = new Docxtemplater(zip);
            } catch(error) {
                reject(error);
            }

            doc.setData(data);
            
            try {
                doc.render()
            }
            catch (error) {
                reject(error);
            }

            var buf = doc.getZip().generate({type: 'nodebuffer'});
             //////// editing ///
            fs.writeFile(path.join(__dirname, conf.FS.OutputDocxpreq), buf, {}, (err) => {
                resolve(buf);
            });
    });
}

 //////// editing ///
module.exports.getworddocproductreq = getworddocproductreq;