const settings = require('electron-settings');

const libraries = [];
const callbacks = {
    addLibrary: [],
    removeLibrary: []
}
settings.get('libraries').then( libs => libs && libs.forEach( lib => _addLibrary(lib) ) )

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

export default { addLibrary, removeLibrary, getLibraries, on }