import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Seed roles in the UserRole table
  const adminRole = await prisma.userRole.upsert({
    where: { role: 'admin' },
    create: { role: 'admin' },
    update: {},
  });

  const studentRole = await prisma.userRole.upsert({
    where: { role: 'student' },
    create: { role: 'student' },
    update: {},
  });

  await prisma.userRole.upsert({
    where: { role: 'staff' },
    create: { role: 'staff' },
    update: {},
  });
  console.log('Roles seeded.');

  // Create or update an admin user
  const hashedAdminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
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
      userRole: {
        connect: { role_id: adminRole.role_id },
      },
    },
  });
  console.log({ admin });

  // Create or update a student user
  const hashedStudentPassword = await hash('student123', 10);
  const student = await prisma.user.upsert({
    where: { username: 'student' },
    update: {},
    create: {
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
      userRole: {
        connect: { role_id: studentRole.role_id },
      },
    },
  });
  console.log({ student });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
