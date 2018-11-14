import * as fs from 'fs';
import * as path from 'path';

const byAsset = (fileName) =>
  fileName !== 'a.js' && fileName !== 'b.js' && (fileName.indexOf('.js') !== -1 || fileName.indexOf('.css') !== -1);

export const readChunkFiles = (rootPath: string) => {
  const subPath = 'static/chunks';
  return fs
    .readdirSync(path.join(rootPath, subPath))
    .filter(byAsset)
    .map((name) => {
      const pathToFile = path.join(rootPath, subPath, name);
      return {
        data: fs.readFileSync(pathToFile),
        name,
        path: pathToFile,
        route: `/_next/${subPath}/${name}`,
        routeName: `/${name.replace('.js', '')}`,
        type: 'chunk',
      };
    });
};

export const readRuntimeFiles = (rootPath: string) => {
  const subPath = 'static/runtime';
  return fs
    .readdirSync(path.join(rootPath, subPath))
    .filter(byAsset)
    .map((name) => {
      const pathToFile = path.join(rootPath, subPath, name);
      return {
        data: fs.readFileSync(pathToFile),
        name,
        path: pathToFile,
        route: `/_next/${subPath}/${name}`,
        routeName: `/${name.replace('.js', '')}`,
        type: 'runtime',
      };
    });
};

export const readPagesFiles = (rootPath: string, buildId: string) => {
  const subPath = `static/${buildId}/pages`;
  return fs
    .readdirSync(path.join(rootPath, subPath))
    .filter(byAsset)
    .map((name) => {
      const pathToFile = path.join(rootPath, subPath, name);
      return {
        data: fs.readFileSync(pathToFile),
        name,
        path: pathToFile,
        route: `/_next/${subPath}/${name}`,
        routeName: name === 'index.js' ? '/' : `/${name.replace('.js', '')}`,
        type: name === '_app.js' || name === '_error.js' ? '_page' : 'page',
      };
    });
};

export const readStatics = ({ rootPath, buildId }: { rootPath: string; buildId: string }) => {
  const chunkFiles = readChunkFiles(rootPath);
  const runtimeFiles = readRuntimeFiles(rootPath);
  const pagesFiles = readPagesFiles(rootPath, buildId);

  return [...chunkFiles, ...runtimeFiles, ...pagesFiles];
};
