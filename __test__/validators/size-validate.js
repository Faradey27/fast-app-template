const fs = require('fs');
const path = require('path');
const colors = require('colors');
const inquirer = require('inquirer');

const exec = require('../utils/exec');
const log = require('../utils/log');

const MAX_SIZE_DIFF = 3000;

const questions = [
  {
    type: 'list',
    name: 'approve',
    message: 'Bundle size increased, approve?',
    choices: ['yes', 'no'],
  },
];

const prepareBundleSizes = () => {
  const lhr = require('../../tmp/_lh-report.json');
  const items = lhr.audits['network-requests'].details.items;

  return Object.keys(items).reduce((acc, name) => {
    const item = items[name];
    acc[item.url] = {
      size: items[name].transferSize,
    };
    return acc;
  }, {});
};

const prepareLighthouseReport = () => exec('npm run lh');

const run = async () => {
  await prepareLighthouseReport();
  const sizes = prepareBundleSizes();
  const pathToFileWithSize = path.join(__dirname, '.prev-size');
  const prevTotalSize = fs.existsSync(pathToFileWithSize) ? Number(fs.readFileSync(pathToFileWithSize)) : 0;
  const totalSize = Object.keys(sizes).reduce((acc, name) => acc + sizes[name].size, 0);
  if (!totalSize) {
    log.error(`NO BUNDLE OR ZERO SIZE`);
    process.exit(1);
  } else if (prevTotalSize && totalSize) {
    const sizeDiff = totalSize - prevTotalSize;
    if (sizeDiff > MAX_SIZE_DIFF) {
      log.error(`BUNDLE SIZE INCREASED: ${totalSize - prevTotalSize}`);

      const answer = await inquirer.prompt(questions);
      if (answer.approve === 'no') {
        process.exit(1);
      } else {
        fs.writeFileSync(path.join(__dirname, '.prev-size'), totalSize);
      }
    } else if (sizeDiff < 0) {
      log.success(`BUNDLE SIZE DECREASED: ${-sizeDiff}`);
      fs.writeFileSync(path.join(__dirname, '.prev-size'), totalSize);
    } else {
      log.info('BUNDLE SIZE THE SAME');
    }
  }
  log.success(`DONE: ${totalSize}`);
  process.exit(0);
};

run();
