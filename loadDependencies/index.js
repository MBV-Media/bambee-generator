/**
 * @name BambeeLoadDependenciesGenerator
 * @author R4c00n <marcel.kempf93@gmail.com>
 * @license MIT
 * @since 1.0.4
 * @description
 *   Yeoman generator for downloading the dependencies.
 * @example
 *   Usage:
 *     yo bambee:loadDependencies
 */
'use strict';

var yeoman = require('yeoman-generator'),
    updateNotifier = require('update-notifier'),
    pkg = require('../package.json'),
    notifier = updateNotifier({pkg: pkg}),
    util = require('util'),
    executeCommand = require('../app/execute-command.js'),
    BambeeLoadDependenciesGenerator;

notifier.notify();
console.log(notifier.update);

/**
 * @class
 * @constructor
 * @augments yeoman.generators.Base
 * @since 1.0.4
 */
BambeeLoadDependenciesGenerator = module.exports = function BambeeLoadDependenciesGenerator(args, options) {  
  yeoman.generators.Base.apply(this, arguments);
};
util.inherits(BambeeLoadDependenciesGenerator, yeoman.generators.Base);

/**
 * Download the dependencies.
 *
 * @since 1.0.4
 * @return {void}
 */
BambeeLoadDependenciesGenerator.prototype.download = function download() {
  var self = this,
      execOptions;
  
  // Execute installation commands
  execOptions = {};
  executeCommand('bundle install', execOptions, function() {
    executeCommand('npm install', execOptions, function() {
      executeCommand('bower install', execOptions, function() {
        execOptions.cwd = 'src';
        executeCommand('composer install', execOptions, function() {
          console.log('All done!');
          });          
        });
      });
    });
};