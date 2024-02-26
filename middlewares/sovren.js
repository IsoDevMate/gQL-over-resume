const http = require('https');
const fs = require('fs');
 
var filePath = "resume.docx";
var buffer = fs.readFileSync(filePath);
var base64Doc = buffer.toString('base64');
 
var modifiedDate = (new Date(fs.statSync(filePath).mtimeMs)).toISOString().substring(0, 10);
 
//other options here (see https://sovren.com/technical-specs/latest/rest-api/resume-parser/api/)
var postData = JSON.stringify({
  'DocumentAsBase64String': base64Doc,
  'DocumentLastModified': modifiedDate
});
 
//use https://eu-rest.resumeparsing.com/v10/parser/resume if your account is in the EU data center or
//use https://au-rest.resumeparsing.com/v10/parser/resume if your account is in the AU data center
var options = {
  host: 'rest.resumeparsing.com',
  protocol: 'https:',
  path: '/v10/parser/resume',
  method: 'POST',
  headers: {
      'Sovren-AccountId': '12345678',
      'Sovren-ServiceKey': 'eumey7feY5zjeWZW397Jks6PBj2NRKSH',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
  }
};
var request = http.request(options, function (response) {
  console.log(`STATUS: ${response.statusCode}`);
  response.setEncoding('utf8');
 
  var responseAsString = '';
 
  response.on('data', (chunk) => {
    responseAsString += chunk;
  });
 
  response.on('end', () => {
    var responseAsJson = JSON.parse(responseAsString);
    console.log(responseAsJson.Info);
    var resumeData = responseAsJson.Value.ResumeData;        
    //now you can consume the resumeData
  });
});
 
request.write(postData);
request.end();