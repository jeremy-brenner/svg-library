import FileLibrary from '../classes/FileLibrary.js';
const settings = require('electron-settings');

const libraryDirs = [];
const libraries = {};

settings.get('libraries').then( libs => {
  if(libs) {
    libs.forEach( dir => libraries[dir] = new FileLibrary(dir));
    libraryDirs.push(...libs);
  }
});

function addLibrary(dir) {
  libraries[dir] = new FileLibrary(dir);
  libraryDirs.push(dir);
  settings.set('libraries',libraryDirs);
}

function removeLibrary(dir) {
  const lib = libraries[dir];
  lib.stop().then( () => {
    delete libraries[dir];
    const i = libraryDirs.indexOf(dir);
    if(i>-1) {
      libraryDirs.splice(i,1);
    }
    settings.set('libraries',libraryDirs);
  });
}

function getLibraries() {
  return libraryDirs;
}

export default { addLibrary, removeLibrary, getLibraries }