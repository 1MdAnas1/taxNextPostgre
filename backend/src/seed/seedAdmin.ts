import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';

export const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || 'admin@tax.com';
  const password = process.env.ADMIN_PASSWORD || 'Admin@123';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('✅ Admin already exists');
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name: 'Admin',
      email,
      password: hashed,
      role: 'admin',
    },
  });
  console.log(`✅ Admin created: ${email} / ${password}`);
};
