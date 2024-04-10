import express from 'express';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
 res.send('Hello, world!');
});

app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
const bootstrap = async () => {
 const app = await platformBrowserDynamic().bootstrapModule(AppModule);
};

bootstrap().catch((err) => console.error(err));