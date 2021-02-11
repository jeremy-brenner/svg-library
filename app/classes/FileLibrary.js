const chokidar = require('chokidar');
import fileCacheStore from '../stores/FileCacheStore';

class FileLibrary {
  constructor(path) {
    this.path = path;
    this.files = [];
    this.watch();
  }
  watch() {
    const startTime = Date.now();
    this.watcher = chokidar.watch(this.path + '/**/*.svg',{ignored: /__MACOSX/})
      .on('add', f => this.addFile(f))
      .on('change', f => this.updateFile(f))
      .on('unlink', f => this.removeFile(f))
      .on('ready', () => {
        const totalTime = Date.now() - startTime;
        console.log(`Done in ${totalTime/1000} seconds.`)
      });
  }
  stop() {
    return this.watcher.close().then(() => {
      this.files.forEach(filePath => {
        removeFile(filePath);
      })
    });
  }
  addFile(filePath) {
    this.files.push(filePath);
    fileCacheStore.update(filePath);
  }
  updateFile(filePath) {
    fileCacheStore.update(filePath);
  }
  removeFile(filePath) {
    const i = this.files.indexOf(filePath);
    if(i>-1) {
      this.files.splice(i,1);
    }
    fileCacheStore.remove(filePath);
  }
}


export default FileLibrary