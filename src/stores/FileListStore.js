const fileList = [];
const filteredList = [];

fetch('svgList.json')
  .then(response => response.json())
  .then(data => {
    fileList.push(...data);
    filteredList.push(...data);
  });


function get() {
  return filteredList
}

function filter(search){
  const searchTerms = search
    .split(/\s+/)
    .filter(s => s !== '')
    .map(s => s.toLowerCase());

  filteredList.splice(0);
  fileList.forEach( file => {
    if(searchTerms.length == 0 || fileMatches(file,searchTerms)){
      filteredList.push(file);
    }
  });
}

function fileMatches(file, searchTerms) {
  const fLower = file.toLowerCase();
  return searchTerms.reduce( (m,s) => m && fLower.includes(s), true )
}


export default { get, filter }