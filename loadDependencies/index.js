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

/**
 * Check for updates.
 */
notifier.notify();
if (notifier.update) {
  console.log(notifier.update);
}

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
  executeCommand('bundle install', function () {
    executeCommand('npm install', function () {
      executeCommand('bower install', function () {
        var execOptions = {
          cwd: 'src'
        };
        executeCommand('composer install', execOptions, function () {
          console.log('Bambee WordPress Theme dependencies installed successfully!');
        });
      });
    });
  });
};