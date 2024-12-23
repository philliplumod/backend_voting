import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'john_doe',
      password: 'securepassword123',
      email: 'john.doe@example.com',
      first_name: 'John',
      middle_initial: 'A',
      last_name: 'Doe',
      suffix: 'Jr',
      year_level: 3,
      contact_number: '1234567890',
      status: 'ACTIVE',
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
