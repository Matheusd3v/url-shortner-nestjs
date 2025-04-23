import { PrismaClient } from '@root/generated/prisma/client';
import { config } from 'dotenv';
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';

config({ path: '.env.test', override: true });

jest.setTimeout(60000);

const adminPrisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL?.replace(/\/[^/]*$/, '/postgres'),
        },
    },
});

beforeAll(async () => {
    const dbName = `test_${randomUUID().replace(/-/g, '_')}`;
    await adminPrisma.$executeRawUnsafe(`CREATE DATABASE ${dbName}`);
    process.env.DATABASE_URL = process.env.DATABASE_URL?.replace(
        /\/[^/]*$/,
        `/${dbName}`,
    );

    execSync('npx prisma migrate deploy', {
        env: { ...process.env },
    });
});

afterAll(async () => {
    const dbName = process.env.DATABASE_URL?.split('/').pop();
    await adminPrisma.$executeRawUnsafe(`
      SELECT pg_terminate_backend(pid) 
      FROM pg_stat_activity 
      WHERE datname = '${dbName}'
    `);
    await adminPrisma.$executeRawUnsafe(`DROP DATABASE IF EXISTS ${dbName}`);
    await adminPrisma.$disconnect();
});
