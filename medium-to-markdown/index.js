const { argv } = require('process');
const mediumToMarkdown = require('medium-to-markdown');
const args = argv.slice(2);

console.log(args)

mediumToMarkdown.convertFromUrl(args[0])
    .then(function (markdown) {
        console.log(markdown); //=> Markdown content of medium post
    });