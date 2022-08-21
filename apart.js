
const child_process = require('child_process');
const fs = require('fs');


const files = fs.readdirSync('./mbtiles');

let dListStr = " ";

files.forEach( file => {
  dListStr  += ` ./mbtiles/${file}`;
});

const tilejoin = `tile-join`
           + " -e" + ` ./tile`
           + ` ${dListStr}`
           + ' --force'
           + ' --no-tile-size-limit'
           + ' --no-tile-compression';

console.log(tilejoin);
child_process.execSync(`${tilejoin}`);


