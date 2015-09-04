/**
 * @name generator-bambee
 * @author R4c00n <marcel.kempf93@gmail.com>
 * @version 1.0.5
 * @license MIT
 * @description
 *   Yeoman generator for downloading the Bambee WordPress Theme from GitHub,
 *   replacing strings to customize it and running installation commands.
 * @example
 *   Usage:
 *     yo bambee
 */
'use strict';

var yeoman = require('yeoman-generator'),
  updateNotifier = require('update-notifier'),
  pkg = require('../package.json'),
  notifier = updateNotifier({pkg: pkg}),
  util = require('util'),
  _ = require('underscore.string'),
  yosay = require('yosay'),
  fs = require('fs'),
  request = require('request'),
  admzip = require('adm-zip'),
  rmdir = require('rimraf'),
  Replacer = require('./replacer'),
  executeCommand = require('./execute-command.js'),
  BambeeGenerator;


notifier.notify();
if (notifier.update) {
  console.log(notifier.update);
}

/**
 * @class
 * @constructor
 * @augments yeoman.generators.Base
 * @since 1.0.0
 */
BambeeGenerator = module.exports = function BambeeGenerator(args, options) {
  var self = this;

  yeoman.generators.Base.apply(this, arguments);
  console.log(yosay('Hello and welcome to the Bambee WordPress theme generator'));

  this.on('end', function () {
    var key = null,
      execOptions;

    // Replace strings in files
    for (key in self.files) {
      if (self.files.hasOwnProperty(key)) {
        self.files[key].replace();
      }
    }

    // Execute installation commands
    execOptions = {
      cwd: self.siteSlug
    };
    executeCommand('bundle install', execOptions, function () {
      executeCommand('npm install', execOptions, function () {
        executeCommand('bower install', execOptions, function () {
          execOptions.cwd = self.siteSlug + '/src';
          executeCommand('composer install', execOptions, function () {
            console.log('Bambee WordPress Theme installed successfully!');
          });
        });
      });
    });
  });
};
util.inherits(BambeeGenerator, yeoman.generators.Base);

/**
 * Ask for configuration properties.
 *
 * @since 1.0.0
 * @return {void}
 */
BambeeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [
    {
      type: 'input',
      name: 'siteName',
      message: 'What\'s the name of the site you\'re creating the theme for?',
      default: 'My Theme Name'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter a description for your theme',
      default: 'Custom WordPress Theme'
    },
    {
      type: 'input',
      name: 'authorName',
      message: 'Author Name',
      default: 'MBV-Media'
    },
    {
      type: 'input',
      name: 'authorEmail',
      message: 'Author E-Mail',
      default: 'info@mbv-media.com'
    },
    {
      type: 'input',
      name: 'license',
      message: 'License',
      default: 'MIT'
    },
    {
      type: 'input',
      name: 'repositoryType',
      message: 'Repository type',
      default: 'git'
    },
    {
      type: 'input',
      name: 'repositoryUrl',
      message: 'Repository url',
      default: 'https://github.com/MBV-Media/Bambee-WordPress-Theme'
    },
    {
      type: 'input',
      name: 'themeUrl',
      message: 'Theme url',
      default: 'https://github.com/MBV-Media/Bambee-WordPress-Theme'
    },
    {
      type: 'input',
      name: 'authorUrl',
      message: 'Author url',
      default: 'http://mbv-media.com/'
    }
  ];

  this.prompt(prompts, function (props) {
    this.siteName = props.siteName;
    this.siteSlug = _.camelize(_.slugify(_.humanize(this.siteName)));
    this.description = props.description;
    this.author = props.authorName + ' <' + props.authorEmail + '>';
    this.license = props.license;
    this.repositoryType = props.repositoryType;
    this.repositoryUrl = props.repositoryUrl;
    this.themeUrl = props.themeUrl;
    this.authorUrl = props.authorUrl;

    this.files = {
      package: new Replacer(this.siteSlug + '/package.json', this),
      styleSCSS: new Replacer(this.siteSlug + '/src/style.scss', this)
    };
    cb();
  }.bind(this));
};

/**
 * Download and unzip the Bambee WordPress theme from GitHub.
 *
 * @since 1.0.0
 * @return {void}
 */
BambeeGenerator.prototype.download = function download() {
  var cb = this.async(),
    self = this;

  console.log('Downloading the Bambee WordPress Theme...');
  request('https://github.com/MBV-Media/Bambee-WordPress-Theme/archive/master.zip')
    .pipe(fs.createWriteStream('plugin.zip'))
    .on('close', function () {
      var zip = new admzip('./plugin.zip');

      console.log('File downloaded!');
      zip.extractAllTo('theme_temp', true);
      fs.rename('./theme_temp/Bambee-WordPress-Theme-master/', './' + self.siteSlug, function () {
        rmdir('theme_temp', function (error) {
          if (error) {
            console.log(error);
          }
          cb();
        });
      });
      fs.unlink('plugin.zip');
    });
};

/**
 * Replace strings inside the package.json file.
 *
 * @since 1.0.0
 * @return {void}
 */
BambeeGenerator.prototype.setPackage = function setPackage() {
  var packageJSON = this.files.package;

  packageJSON.add(
    /\"name\"\: \"Bambee\"/,
    '"name": "' + this.siteSlug + '"'
  );
  packageJSON.add(
    /\"description\"\: \"Boilerplate for WordPress theme developement.\"/,
    '"description": "' + this.description + '"'
  );
  packageJSON.add(
    /\"type\"\: \"git\"/,
    '"type": "' + this.repositoryType + '"'
  );
  packageJSON.add(
    /\"url\"\: \"https:\/\/github.com\/MBV-Media\/Bambee\-WordPress\-Theme\"/,
    '"url": "' + this.repositoryUrl + '"'
  );
  packageJSON.add(
    /\"author\"\: \"MBV-Media <info@mbv-media.com>\"/,
    '"author": "' + this.author + '"'
  );
  packageJSON.add(
    /\"license\"\: \"MIT\"/,
    '"license": "' + this.license + '"'
  );
};

/**
 * Replace strings inside the style.scss file.
 *
 * @since 1.0.0
 * @return {void}
 */
BambeeGenerator.prototype.setStyleSCSS = function setStyleSCSS() {
  var packageJSON = this.files.styleSCSS;

  packageJSON.add(
    /Theme URI\: https\:\/\/github.com\/MBV-Media\/Bambee\-WordPress\-Theme/,
    'Theme URI: ' + this.themeUrl
  );
  packageJSON.add(
    /Author URI\: http:\/\/mbv\-media.com\//,
    'Author URI: ' + this.authorUrl
  );
};