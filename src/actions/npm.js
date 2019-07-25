const fs = require('fs');
const path = require('path');
const {getMonorepoDir} = require("../helpers/utilities");
const {yaml} = require('../helpers/parser');
const spawn = require('../helpers/spawn');

module.exports = (projectName, otherProject) => {
  const projects = [projectName, ...otherProject].map(item => {
    const setup = item.split(':');
    return {
      name: setup[0],
      script: setup[1],
    };
  });
  projects.forEach(project => {
    const cwd = path.join(process.cwd(), project.name);
    if (fs.existsSync(cwd)) {
      spawn(project.name, 'yarn', [project.script || 'dev'], {cwd});
    } else {
      throw Error(`project ${project.name} not found!`)
    }
  });
}