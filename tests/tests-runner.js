require('@babel/register');

const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

// Instantiate a Mocha instance.
const mocha = new Mocha({
    ui: 'bdd',
    reporter: 'list',
    timeout: 120000
});

let testDir = path.join(__dirname, 'spec');

// Add each .test.js file to the mocha instance
fs.readdirSync(testDir)
    .filter(file => (file.substr(-8) === '.test.js'))
    .forEach(file => mocha.addFile(path.join(testDir, file)));

mocha.run(failures => process.on('exit', () => {
    process.exit(failures);
}));
