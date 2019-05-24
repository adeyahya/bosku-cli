const path = require('path');
const {getMonorepoDir} = require("../helpers/utilities");
const {yaml} = require('../helpers/parser');
const spawn = require('../helpers/spawn');

module.exports = projectName => {
  const monorepoDir = getMonorepoDir();
  if (monorepoDir) {
    const configPath = path.join(monorepoDir, projectName, 'service.yaml');
    const config = yaml(configPath);
    if (config) {
      spawn(projectName, 'yarn', ['dev'], {cwd: path.join(monorepoDir, projectName)});
      if (Array.isArray(config.dependencies)) {
        config.dependencies.forEach(item => {
          spawn(item, 'yarn', ['dev'], {cwd: path.join(monorepoDir, item)});
        });
      }
    } else {
      // handle missing monorepo
    }
  }
}