import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedAdminPassword = await hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedAdminPassword,
      email: 'vnhssslg2024@gmail.com',
      first_name: 'John',
      middle_initial: 'A',
      last_name: 'Doe',
      suffix: 'Jr',
      contact_number: '1234567890',
      year_level: 1,
      status: 'active',
    },
  });

  console.log({ admin });

  const hashedStudentPassword = await hash('student123', 10);
  const student = await prisma.user.create({
    data: {
      username: 'student',
      password: hashedStudentPassword,
      email: 'student2024@gmail.com',
      first_name: 'Jane',
      middle_initial: 'B',
      last_name: 'Smith',
      suffix: '',
      contact_number: '0987654321',
      year_level: 2,
      status: 'active',
    },
  });

  console.log({ student });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
