
const child_process = require('child_process');
const fs = require('fs');


fs.readdir('./dl', (err, files) => {
  if (err) { console.log(err); return;}
  
  files.forEach( file => {
  
    console.log(file);
    
    const path = './dl/' + file;
    
    child_process.execSync(`unzip "${path}"`);
    // => 出力は直下にされるみたい
    
  });
 
});





