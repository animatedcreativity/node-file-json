var fs = require("fs");
var sanitize = require("node-sanitize-options");
var loadedFile;
var options = {};
exports.data = {};
exports.load = function(file, _options) {
  options = sanitize.options(_options, {indent: 2});
  if (!fs.existsSync(file)) {
    exports.data = {};
    exports.save(file);
  }
  if (fs.existsSync(file)) {
    try {
      exports.data = JSON.parse(fs.readFileSync(file, "utf-8"));
      loadedFile = file;
    } catch(error) {
      console.log(error);
    }
  } else {
    console.log("Could not load the JSON file: " + file);
  }
};
exports.save = function(file) {
  if (typeof file === "undefined") file = loadedFile;
  if (typeof file === "undefined") {
    console.log("No JSON file loaded. Please use .load() first.");
    return false;
  }
  var stream = fs.createWriteStream(file);
  stream.write(JSON.stringify(exports.data, null, options.indent));
  stream.end();
};