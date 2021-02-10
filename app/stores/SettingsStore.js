const settings = require('electron-settings');

const libraries = [];
let svgSize;

const callbacks = {
    addLibrary: [],
    removeLibrary: [],
    svgSize: []
}
settings.get('libraries').then( libs => libs && libs.forEach( lib => _addLibrary(lib) ) )
settings.get('svgSize').then( size => setSvgSize(size ? size : 50) );

function _addLibrary(dir) {
    libraries.push(dir);
    callbacks['addLibrary'].forEach( cb => cb(dir))
}

function _removeLibrary(dir) {
    const i = libraries.indexOf(dir);
    if(i > -1) {
      libraries.splice(i,1);
    }
    callbacks['removeLibrary'].forEach( cb => cb(dir))
}

function getLibraries() {
    return libraries;
}

function addLibrary(dir) {
    _addLibrary(dir);
    settings.set('libraries',libraries);
}

function removeLibrary(dir) {
    _removeLibrary(dir);
    settings.set('libraries',libraries);
}

function on(type,cb) {
  callbacks[type].push(cb);
}

function getSvgSize() {
  return svgSize;
}

function setSvgSize(size) {
  svgSize = size;
  settings.set('svgSize', size);
  callbacks['svgSize'].forEach( cb => cb(size))
}

export default { addLibrary, removeLibrary, getLibraries, getSvgSize, setSvgSize, on }