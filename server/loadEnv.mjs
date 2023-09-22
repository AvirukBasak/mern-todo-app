import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = path.dirname(__filename);

global.PATHS = {};
global.PATHS.build = path.join(__dirname, '..', 'static');
global.PATHS.app = path.join(__dirname, '..', 'app');
global.PATHS.server = path.join(__dirname);
global.PATHS.appDependencies = path.join(PATHS.app, 'node_modules');
global.PATHS.serverDependencies = path.join(PATHS.server, 'node_modules');

import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: path.join(__dirname, '.env.local'), override: true });

if (!process.env.MONGODB_URI) {
    console.error('ERROR: '
        + 'couldn\'t find MONGODB_URI enviroment variable\n'
        + `  add MONGODB_URI to '${path.join(__dirname, '.env.local')}'`
    );
    process.exit(1);
}
