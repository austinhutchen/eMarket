import type { Express, Request, Response, NextFunction } from 'express';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import type { Type } from '@angular/core';
import AppServerModule from './main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): Express {
  const server: Express = express();
  const serverDistFolder: string = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder: string = resolve(serverDistFolder, '../browser');
  const indexHtml: string = join(serverDistFolder, 'index.server.html');

  const commonEngine: CommonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req: Request, res: Response) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req: Request, res: Response, next: NextFunction) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule as Type<{}>,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then(html => res.send(html))
      .catch(next);
  });

  return server;
}