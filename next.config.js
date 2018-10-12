const withTypescript = require('@zeit/next-typescript');
const withPreact = require('@zeit/next-preact');

module.exports = withTypescript(withPreact());
