const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const {yaml} = require('./parser');
const MONOREPO_NAME = "kumpul-dev-monorepo";

const getMonorepoDir = (attemp = 10, dir = "/") => {
  if (attemp === 0) {
    console.log(chalk.red("please run inside monorepo directory!"));
    return;
  }
  if (attemp === 10) {
    dir = process.cwd();
  }
  const boskuConfigPath = path.join(dir, '.bosku.config.yaml');
  if (fs.existsSync(boskuConfigPath)) {
    const boskuConfig = yaml(boskuConfigPath);
    if (boskuConfig.root) {
      return dir;
    } else {
      return getMonorepoDir(attemp - 1, path.join(dir, '..'));
    }
  } else {
    return getMonorepoDir(attemp - 1, path.join(dir, '..'));
  }
}

module.exports = {
  getMonorepoDir,
};