import { readFile } from 'fs';

const renderPage = (page: string) =>
  new Promise((res, rej) => {
    return readFile(`./src/screens/${page}.html`, (err, data) =>
      err ? rej(err) : res(data),
    );
  });

export default renderPage;
