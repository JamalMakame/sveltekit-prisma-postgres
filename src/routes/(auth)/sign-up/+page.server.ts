// routes/signup/+page.server.ts
import { lucia } from '$lib/server/auth';
import { prisma } from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';

import type { Actions } from './$types';
import { isValidPhone } from '$lib/utils/helpers';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;

		const phone = formData.get('phone') as string;

		const password = formData.get('password') as string;

		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
		if (typeof name !== 'string' || name.length < 3) {
			return fail(400, {
				message: 'Invalid Name Format'
			});
		}

		if (!phone || typeof phone !== 'string' || !isValidPhone(phone)) {
			return fail(400, {
				message: 'Invalid WhatsApp Format,\nPlease include the Country code eg. +255...'
			});
		}

		if (!password || typeof password !== 'string' || password.length < 6) {
			return fail(400, {
				message: 'Invalid Password Format. The password must be at least 6 characters long.'
			});
		}

		console.log('Passed All checks');

		const hashedPassword = await new Argon2id().hash(password);

		try {
			// check if username is already used
			const isUserExist = await prisma.user.findUnique({
				where: {
					phone
				}
			});

			if (isUserExist) return fail(403, { message: 'User already Exists' });

			const newUser = await prisma.user.create({
				data: {
					hashedPassword,
					name,
					phone
				}
			});

			const session = await lucia.createSession(newUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} catch (err) {
			console.log(err);
			return fail(402, { message: 'Failed to Create A new User' });
		}

		redirect(302, '/dashboard');
	}
};
