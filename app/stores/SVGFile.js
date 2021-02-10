const fs = require('fs');

class SVGFile {
  constructor(path) {
    this.path = path;
    this.urlData = '';
    this.load();
  }
  load() {
    fs.readFile(this.path, (e,f) => {
        if(e) {
          console.log(e)
        }
        this.urlData = `data:image/svg+xml;base64,${f.toString("base64")}`;
    });
  }
}

export default SVGFile;