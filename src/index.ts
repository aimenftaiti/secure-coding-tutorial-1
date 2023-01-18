import { AppDataSource } from "./lib/typeorm";
import { server } from './lib/fastify'
import { FASTIFY_PORT, FASTIFY_ADDR } from './lib/dotenv';
import * as fs from 'fs';
import { compileFromFile } from 'json-schema-to-typescript'

const jsonFolderPath = './src/schemas/json/';
const typesFolderPath = './src/schemas/types/';

fs.readdir(jsonFolderPath, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    files.forEach(file => {
        compileFromFile(jsonFolderPath + file)
            .then(ts => fs.writeFileSync(typesFolderPath + file.replace(/\.[^/.]+$/, "") + '.d.ts', ts))
            .catch(console.error)
    });
});

async function run() {
    await AppDataSource().initialize();
    await server.listen({ port: FASTIFY_PORT, host: FASTIFY_ADDR })
}

run().catch(console.error)