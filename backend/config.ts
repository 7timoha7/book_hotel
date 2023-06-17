import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://localhost/booking',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  mail: 'esdpjs17@gmail.com',
  site: process.env.WEBSITE_ADDRESS || 'http://localhost:3000',
};

export default config;
