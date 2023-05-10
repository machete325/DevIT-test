import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    await prisma.user.deleteMany();
    await prisma.posts.deleteMany();

    console.log('Seeding...');

    const user1 = await prisma.user.create({
        data: {
            email: 'admin@devit.com',
            firstName: 'Super',
            lastName: 'Admin',
            password: '$2a$12$SSIBjM49avup2RCbaKSbueoh5AjkJncgOp0Ajd3lJh9cgx4EJJrn2', // password: admin
        },
    });

    console.log({ user1 });
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
