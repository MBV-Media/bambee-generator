'use strict';

var fs = require('fs');

var Replacer = module.exports = function Replacer(file, options) {
  var module = {},
    searches = [];

  module.add = function (search, replace) {
    searches.push({search: search, replace: replace});
  };

  module.rm = function (search) {
    searches.push({search: search, replace: ''});
  };

  module.file = file;
  module.replace = function () {
    fs.readFile(file, 'utf8', function (err, data) {
      var i, total;
      if (err) {
        return console.log(err);
      }

      total = searches.length;
      for (i = 0; i < total; i += 1) {
        data = data.replace(searches[i].search, searches[i].replace);
      }

      fs.writeFile(file, data, 'utf8', function (err) {
        if (err) {
          return console.log(err);
        }
      });
    });
  };

  return module;
};