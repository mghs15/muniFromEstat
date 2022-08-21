
const child_process = require('child_process');
const fs = require('fs');


for(let i=1; i < 48; i++){
  
  let pc;
  if(i < 10){
    pc = "0" + i;
  }else{
    pc = ""  + i;
  }
  
  const url = `https://www.e-stat.go.jp/gis/statmap-search/data?dlserveyId=A002005212020&code=${pc}&coordSys=1&format=gml&downloadType=5&datum=2000`;
  console.log(url);
  child_process.execSync(`curl "${url}" > ./dl/${pc}.zip`);
  
} 




