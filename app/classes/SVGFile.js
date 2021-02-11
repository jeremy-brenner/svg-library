//const fs = require('fs');

class SVGFile {
  constructor(path,urlData) {
    this.path = path;
    this.visible = true;
    this.urlData = urlData;
   // this.load();
  }
  // load() {
  //   fs.readFile(this.path, (e,f) => {
  //       if(e) {
  //         console.log(e)
  //       }
  //       this.urlData = `data:image/svg+xml;base64,${f.toString("base64")}`;
  //   });
  // }
  setVisible(v) {
    this.visible = v;
  }
}

export default SVGFile;