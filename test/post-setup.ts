import { PrismaClient } from '@root/generated/prisma/client';
import { config } from 'dotenv';
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';

config({ path: '.env.test', override: true });

const prisma = new PrismaClient();

jest.setTimeout(60000);

function generateUniqueDatabaseURL(schemaId: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provider a DATABASE_URL environment variable');
    }

    const url = new URL(process.env.DATABASE_URL);

    url.searchParams.set('schema', schemaId);

    return url.toString();
}
const schemaId = randomUUID();

beforeAll(() => {
    const databaseURL = generateUniqueDatabaseURL(schemaId);

    process.env.DATABASE_URL = databaseURL;

    execSync('npm run migration:deploy', {
        env: {
            ...process.env,
            DATABASE_URL: process.env.DATABASE_URL,
        },
    });
}, 60000);

afterAll(async () => {
    await prisma.$executeRawUnsafe(
        `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`,
    );
    await prisma.$disconnect();
}, 60000);
