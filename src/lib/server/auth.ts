// src/lib/server/auth.ts
import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { prisma } from './prisma';

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
	}
}
