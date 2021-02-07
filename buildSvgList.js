var glob = require("glob")
 
// options is optional
const files = glob.sync("**/*.svg", { cwd: './public/svgs'});

console.log(JSON.stringify(files));