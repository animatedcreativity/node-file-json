module.exports = exports = function() {
  var fs = require("fs");
  var sanitize = require("node-sanitize-options");
  var loadedFile;
  var options = {};
  var json = {
    data: {},
    load: function(file, _options) {
      options = sanitize.options(_options, {indent: 2});
      if (!fs.existsSync(file)) {
        json.data = {};
        json.save(file);
      }
      if (fs.existsSync(file)) {
        try {
          json.data = JSON.parse(fs.readFileSync(file, "utf-8"));
          loadedFile = file;
        } catch(error) {
          console.log(error);
        }
      } else {
        console.log("Could not load the JSON file: " + file);
      }
    },
    save: function(file) {
      if (typeof file === "undefined") file = loadedFile;
      if (typeof file === "undefined") {
        console.log("No JSON file loaded. Please use .load() first.");
        return false;
      }
      fs.writeFileSync(file, JSON.stringify(json.data, null, options.indent), "utf-8");
    },
    clear: function() {
      json.data = {};
      json.save();
    }
  }
  return json;
};