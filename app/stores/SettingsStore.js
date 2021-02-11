const settings = require('electron-settings');
let svgSize;

const callbacks = {
    svgSize: []
}

settings.get('svgSize').then( size => setSvgSize(size ? size : 50) );

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

export default { getSvgSize, setSvgSize, on }