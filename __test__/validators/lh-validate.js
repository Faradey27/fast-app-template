const { spawn } = require('child_process');

const exec = require('../utils/exec');
const log = require('../utils/log');

const prepareCategories = () => {
  const lhr = require('../../tmp/_lh-report.json');

  return Object.keys(lhr.categories).reduce((acc, categoryName) => {
    const category = lhr.categories[categoryName];
    acc[category.id] = Math.round(category.score * 100);
    return acc;
  }, {});
};

const prepareLighthouseReport = () => exec('npm run lh');

const run = async () => {
  await prepareLighthouseReport();
  const scores = prepareCategories();
  Object.keys(scores).forEach((name) => {
    if (scores[name] !== 100) {
      log.error(`REGRESSION: ${name}. RESULT: ${scores[name]}`);
      process.exit(1);
    }
  });
  log.success('PWA 100% rate - PASSED');
  process.exit(0);
};

run();
