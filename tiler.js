
const child_process = require('child_process');
const fs = require('fs');


const files = fs.readdirSync('./dat');

let dListStr = " ";

files.forEach( file => {
  dListStr  += ` ./dat/${file}`;
  const tipp = `tippecanoe -l muni`
             + ` ./dat/${file}`
             + " -o" + ` ./mbtiles/${file}.mbtiles`
             + ' --force'
             + " --coalesce" + " --reorder" + " --hilbert"
             + " --no-simplification-of-shared-nodes"
             + ' --no-tile-size-limit' 
             + ' --no-tile-compression'
             + ' --no-feature-limit'
             + ' --full-detail=11'
             + ' --low-detail=11'
             //+ ' --minimum-detail=12'
             + ' --minimum-zoom=6'
             + ' --maximum-zoom=6'
             + ' --base-zoom=6'
             
             + ' --no-tiny-polygon-reduction'
             + ' --no-line-simplification';
             
             //+ ' --simplification=4';  
             

  console.log(tipp);
  child_process.execSync(`${tipp}`);


});


/*
const tipp = `tippecanoe -l muni`
           + " -e" + ` ./tile`
           + `${dListStr}`
           + ' --force'
           + " --coalesce" + " --reorder" + " --hilbert"
           + " --no-simplification-of-shared-nodes"
           + ' --no-tile-size-limit' 
           + ' --no-tile-compression'
           + ' --no-feature-limit'
           + ' --minimum-zoom=6'
           + ' --maximum-zoom=8'
           + ' --base-zoom=6'
           + ' --simplification=2';  
           

console.log(tipp);
child_process.execSync(`${tipp}`);
*/

