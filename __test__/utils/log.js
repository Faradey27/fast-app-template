const colors = require('colors');

module.exports = {
  error: (message) => console.error(colors.red(message)),
  warn: (message) => console.warn(colors.orange(message)),
  success: (message) => console.info(colors.green(message)),
  info: (message) => console.info(colors.cyan(message)),
};
