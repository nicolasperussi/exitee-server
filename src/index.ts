import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: {
			name: 'Rafael',
		},
	});
	console.log(user);
}

main();
