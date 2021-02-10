const chokidar = require('chokidar');
import settingsStore from './SettingsStore';
import SVGFile from './SVGFile.js';

const ignores = ['__MACOSX'];

const fileList = [];

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
  file.setVisible(fileMatches(file.path,searchTerms))
}

function removeFile(filePath) {
  const i = fileList.findIndex(f => f.path == filePath);
  if(i>-1) {
    fileList.splice(i1,1);
  }
}

function get() {
  return fileList
}

function filter(search){
  searchTerms = search
    .split(/\s+/)
    .filter(s => s !== '')
    .map(s => s.toLowerCase());

  fileList.forEach( file => {
    file.setVisible(fileMatches(file.path,searchTerms))
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