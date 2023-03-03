import {WEBAPP_URL} from '@env';
import RNFS from 'react-native-fs';

async function isOnline() {
  try {
    await fetch(`${WEBAPP_URL}/index.html`);
    return true;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.toString());
    }
    return false;
  }
}

export async function downloadSources() {
  const webappIsOnline = await isOnline();
  if (!webappIsOnline) {
    return;
  }

  const data = await (await fetch(`${WEBAPP_URL}/index.html`)).text();

  const filesToDownload = data.match(/(?<=href="|src=").*?(?=")/gm);

  if (!filesToDownload) {
    throw new Error('No file to download');
  }

  await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/www');
  await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/www/assets');

  for (let path of filesToDownload) {
    const file = await fetch(`${WEBAPP_URL}${path}`);

    let likedFiles = [path];

    if (path.includes('.js')) {
      const fileStr = await file.text();

      const svgFiles = fileStr
        .match(/(?="\/).*?(?=svg")/gm)
        ?.map(filePath => filePath.replace('"', '') + 'svg');
      const cssFiles = fileStr
        .match(/(?="\/).*?(?=css")/gm)
        ?.map(filePath => filePath.replace('"', '') + 'css');
      const jsFiles = fileStr
        .match(/(?="\/).*?(?=js")/gm)
        ?.map(filePath => filePath.replace('"', '') + 'js');
      const pngFiles = fileStr
        .match(/(?="\/).*?(?=png")/gm)
        ?.map(filePath => filePath.replace('"', '') + 'png');

      likedFiles = [
        ...likedFiles,
        ...(svgFiles || []),
        ...(cssFiles || []),
        ...(jsFiles || []),
        ...(pngFiles || []),
      ];
    }

    await Promise.all(
      likedFiles.map(
        async fileToDownload =>
          await RNFS.downloadFile({
            fromUrl: `${WEBAPP_URL}${fileToDownload}`,
            toFile: RNFS.DocumentDirectoryPath + '/www' + fileToDownload,
            begin: res =>
              console.log(
                'Begin Download file',
                fileToDownload,
                res.statusCode,
              ),
          }),
      ),
    );
  }

  await RNFS.downloadFile({
    fromUrl: `${WEBAPP_URL}/index.html`,
    toFile: RNFS.DocumentDirectoryPath + '/www/index.html',
    begin: res =>
      console.log('Begin Download file', 'index.html', res.statusCode),
  });
}
