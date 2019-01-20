# node-file-json
Read JSON from a file and work on it dynamically. You can even use the JSON file as a small database. If file does not exist, one will be created for you.

**Usage:**

Load JSON file, if it does not exist, it will be created automatically.
```
var fileJson = require("node-file-json");
var json = new fileJson();
json.load("product.json");
```

Modify JSON data
```
json.data.property1 = "First property";
json.data.property2 = {name: "Product name", details: "These are some details."};
```

Save JSON data

```
json.save();
```

Data will be saved in the file as defined in .load() to be read any time.<br/>
If any errors occur during loading/creating JSON file, check console log.
JSON in file is saved properly with indents. To modify indent value, add it to options, example:
```
json.load("product.json", {indent: 4});
```