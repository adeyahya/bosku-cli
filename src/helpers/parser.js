const fs = require("fs");
const path = require("path");
const YAML = require("yaml");

const yaml = path => {
  if (!fs.existsSync(path)) return null;

  const text = fs.readFileSync(path, 'utf8');
  return YAML.parse(text);
}

module.exports = {
  yaml,
};