const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const svgDir = '/Volumes/sambashare/Cricut';

const fileList = [];
const filteredList = [];

let searchTerms = [];


 

chokidar.watch(svgDir + '/**/*.svg').on('all', (event, filePath) => {
  const svgFile = path.relative(svgDir,filePath);
    console.log(event, svgFile);
    fileList.push(svgFile);
    if(fileMatches(svgFile,searchTerms)){
      filteredList.push(svgFile);
    }
});

//findSvgsIn(svgDir);


// function findSvgsIn(dir) {
//   fs.readdir(dir, (e,files) => {
//     files.forEach(file => {
//       const filePath = path.join(dir,file);
//       fs.stat(filePath, (e,stat) => {
//         if(filePath,stat.isDirectory()) {
//           findSvgsIn(filePath);
//         }else if( filePath.endsWith('.svg') ){
//           const svgFile = path.relative(svgDir,filePath);
//           fileList.push(svgFile);
//           if(fileMatches(svgFile,searchTerms)){
//             filteredList.push(svgFile);
//           }
//         }
//       });
//     });
//   })
// }

function get() {
  return filteredList
}

function filter(search){
  searchTerms = search
    .split(/\s+/)
    .filter(s => s !== '')
    .map(s => s.toLowerCase());

  filteredList.splice(0);
  fileList.forEach( file => {
    if(fileMatches(file,searchTerms)){
      filteredList.push(file);
    }
  });
}

function fileMatches(file, searchTerms) {
  const fLower = file.toLowerCase();
  return searchTerms.length == 0 || searchTerms.reduce( (m,s) => m && fLower.includes(s), true )
}


export default { get, filter }