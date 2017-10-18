/* global require */
const age = require('./browser-age');

const commandline = process.argv.slice(2).join(' ');
console.log(age.since(commandline));
