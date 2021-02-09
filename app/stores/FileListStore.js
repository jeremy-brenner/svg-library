const chokidar = require('chokidar');
import settingsStore from './SettingsStore';
//const svgDir = '/Volumes/sambashare/Cricut';
//const svgDir = '../svgs';

const fileList = [];
const filteredList = [];

let searchTerms = [];

settingsStore.on('addLibrary', addLibrary);
settingsStore.on('removeLibrary', removeLibrary);

const watcher = chokidar.watch()
  .on('add', addFile)
  .on('unlink', removeFile);

function addLibrary(dir) {
  watcher.add(dir + '/**/*.svg');
  filter(searchTerms.join(' '))
}

function removeLibrary(dir) {
  watcher.unwatch(dir + '/**/*.svg');
  filter(searchTerms.join(' '))
}

function addFile(filePath) {
  fileList.push(filePath);
  if(fileMatches(filePath,searchTerms)){
    filteredList.push(filePath);
  }
}

function removeFile(filePath) {
  const i1 = fileList.indexOf(filePath);
  if(i1>-1) {
    fileList.splice(i1,1);
  }
  const i2 = filteredList.indexOf(filePath);
  if(i2>-1) {
    filteredList.splice(i2,1);
  }
}

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
  if(!fileInLibrary(file)) {
    return false
  }
  const fLower = file.toLowerCase();
  return searchTerms.length == 0 || searchTerms.reduce( (m,s) => m && fLower.includes(s), true )
}

function fileInLibrary(file) {
  const libs = settingsStore.getLibraries();
  return libs.reduce( (m,l) => m || file.startsWith(l), false );
}


export default { get, filter }