// function to generate markdown for README
function generateMarkdown(data) {
  if(data.type){
  return `# ${data.title}

`;
  }
  return `## ${data.title}

  `; 
}

module.exports = generateMarkdown;
