const fs = require('fs');
const path = require('path');
const md5 = require('md5');
import SVGFile from '../classes/SVGFile.js';

const app = require('electron').remote.app;

const appDir = app.getPath('userData');
const cacheDir = 'FileCache'
const cachePath = path.join(appDir,cacheDir)

const fileCache = [];

fs.mkdirSync(cachePath,{recursive:true});

fs.readdir(cachePath, (e,l) => {
  l.map( f => require(path.join(cachePath,f)) )
    .forEach( f => {
      const svg = new SVGFile(f.path,f.data) ;
      fileCache.push(svg);
    
    })
  
});

function update(filePath) {
  const md5name = md5(filePath);
  fs.readFile(filePath, (e,f) => {
    if(e) {
      console.log(e)
    }
    const fileName = path.join(cachePath, `${md5name}.json`);
    const fileData = JSON.stringify({
      path: filePath,
      data: `data:image/svg+xml;base64,${f.toString("base64")}`
    });
    fs.writeFile(fileName, fileData, () => {})
  });
}

function remove(filePath) {
  console.log('remove', filePath)
}

function get() {
    return fileCache;
}
  
export default { update, remove, get }