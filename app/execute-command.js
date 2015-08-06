/**
 * @author R4c00n <marcel.kempf93@gmail.com>
 * @version 1.0.0
 * @license MIT
 */
'use strict';

var exec = require('child_process').exec,
    executeCommand;

/**
 * Execute a command using the NodeJS 'child_process' module.
 *
 * @param {string} cmd - Command to execute
 * @param {object} execOptions - Options to pass to 'exec' funtion
 * @param {function} [cb] - Callback function when command was
 * executed successfully.
 * @return {void}
 */
executeCommand = module.exports = function(cmd, execOptions, cb) {
  console.log('Running "' + cmd + '"...');
  exec(cmd, execOptions, function(error, stdout, stderr) {
    if (error) {
      console.log('"' + cmd + '" failed', error);
      return console.log(stdout);
    }
    console.log('Finished "' + cmd + '"');
    
    if (typeof(cb) === 'function') {
      cb();
    }
  });
};