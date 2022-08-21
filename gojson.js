
const child_process = require('child_process');
const fs = require('fs');

const removeTag = (str) => {
  const arr = str.split(/(<|>)/g);
  // "0" < "・1・" > "・・2・・" < "・3・" > "4" 
  
  return arr[4];
  
}

const files = fs.readdirSync('./gml');

files.forEach( file => {

  if(!file.match(".gml$")) return;
  
  let res = "";
  console.log(file);
  
  const path = './gml/' + file;
  
  const gmlraw = fs.readFileSync(path, 'utf8');
  const lines = gmlraw.split("\n");
  
  let f;
  
  let exteriorCount;
  let interiorFlag = false;
  let interiorCount;
  let pcode;
  let mcode
  let isSuijou = false;
  
  lines.forEach( line => {
    if(line.match("<gml:featureMember>")){
      
      exteriorCount = 0;
      interiorCount = 0;
      
      pcode = "";
      mcode = "";
      
      isSuijou = false;
      
      f = {
          "type": "Feature",
          "properties": {
            
          },
          "geometry": { 
            "type": "Polygon",
            "coordinates": [[]]
          }
      };
      
    }else if(line.match("</gml:featureMember>")){
      
      //f.properties.exteriorCount = exteriorCount;
      //f.properties.interiorCount = interiorCount;
      
      if(exteriorCount > 1) {
        console.log(f);
      }
      
      try {
        //if(!isSuijou){
          res += JSON.stringify(f) + "\n";
        //}
      } catch (error) {
        console.error(error);
        console.log(f);
      }
      
      exteriorCount = 0;
      interiorCount = 0;
      pcode = "";
      mcode = "";
      isSuijou = false;
      f = {};
      
    }else if(line.match("<fme:PREF_NAME>")){
      f.properties.prefName = removeTag(line);
    }else if(line.match("<fme:CITY_NAME>")){
      f.properties.cityName = removeTag(line);
    }else if(line.match("<fme:S_NAME>")){
      //f.properties.sName = removeTag(line);
    }else if(line.match("<fme:PREF>")){
      pcode = removeTag(line);
    }else if(line.match("<fme:CITY>")){
      mcode = removeTag(line);
    }else if(line.match("<fme:HCODE>")){
      const hcode = removeTag(line);
      if(hcode == "8154") isSuijou = true;
    }else if(line.match("<gml:posList>")){
      
      
      const posStr = removeTag(line);
      const posArr = posStr.split(" ");
      
      const n = posArr.length;
      for( let ip = 0; ip < n/2; ip++){
        const pos = [+posArr[ip * 2 + 1], +posArr[ip * 2]] ;
      
        if(!interiorFlag){
          f.geometry.coordinates[0].push(pos);
        }else{
          /*
          if(!f.geometry.coordinates[interiorCount]) f.geometry.coordinates[interiorCount] = [];
          f.geometry.coordinates[interiorCount].push(pos);
          */
        }
        
      }
      
    }else if(line.match("<gml:exterior>")){
      exteriorCount += 1;
    }else if(line.match("<gml:interior>")){
      interiorCount += 1;
      interiorFlag = true;
    }else if(line.match("</gml:interior>")){
      interiorFlag = false;
    }
    
  });
  
  fs.writeFileSync(`./dat/${file}.ndjson`, res);

});

