const locateChrome = require('locate-chrome');
const exec = require('../__test__/utils/exec');

const waiter = (delay = 400) =>
  new Promise((resolve) => setTimeout(() => resolve(), delay));
const run = async () => {
  try {
    const pathToChrome = await locateChrome();
    await exec(`export CHROME_PATH=${pathToChrome}`)
    await exec('npm run lint');
    await exec('npm run tslint:check');
    await exec('npm run test:unit');
    await exec('npm run build');
    exec('npm run start');
    await waiter(1000);
    await exec('npm run size:ci');
    await exec('npm run lh:ci');
    await exec('SKIP_SERVER_START=true npm run test:e2e');
    process.exit(0);
  } catch (e) {
    process.exit(1);
  }
}

run();

