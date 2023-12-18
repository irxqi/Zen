#!/usr/bin/env node

var placeholder = require('./App'),
options = require('minimist')(process.argv.slice(2));
(async () => {
placeholder(options.t || options.text,options.font || options.f,options.s || options.size)
})();
