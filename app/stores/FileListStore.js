const chokidar = require('chokidar');
import settingsStore from './SettingsStore';
import SVGFile from './SVGFile.js';

const ignores = ['__MACOSX'];

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
  const file = new SVGFile(filePath);
  fileList.push(file);
  if(fileMatches(file.path,searchTerms)){
    filteredList.push(file);
  }
}

function removeFile(filePath) {
  const i1 = fileList.findIndex(f => f.path == filePath);
  if(i1>-1) {
    fileList.splice(i1,1);
  }
  const i2 = filteredList.findIndex(f => f.path == filePath);
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
    if(fileMatches(file.path,searchTerms)){
      filteredList.push(file);
    }
  });
}

function fileMatches(file, searchTerms) {
  if(fileIgnored(file)) {
    return false;
  }
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

function fileIgnored(file) {
  return ignores.reduce( (m,l) => m || file.includes(l), false );
}

export default { get, filter }