import { prisma } from "../src/utils/prisma.js";
import bcrypt from "bcryptjs";
import { generateTokens } from "../src/utils/constants.js";

async function main() {
  console.log("entering");

  // const superAdminRole = await prisma.role.create({
  //   data: {
  //     role_name: "super_admin",
  //   },
  // });
  const adminRole = await prisma.role.create({
    data: {
      role_name: "admin",
    },
  });

  await prisma.role.create({
    data: {
      role_name: "user",
    },
  });

  const hashedPassword = await bcrypt.hash("Admin@123", 10);
  const admin = {
    email: "admin@gmail.com",
    password: hashedPassword,
    userName: "admin",
    first_name: "Admin",
    last_name: "A",
    gender: "male",
    mobile_number: "9876543210",
    otp: 5334,
    UserRole: {
      create: {
        role_id: adminRole.role_id,
      },
    },
  };

  const { accessToken } = generateTokens(admin);
  console.log(accessToken);

  await prisma.user.create({
    data: {
      ...admin,
      token: accessToken,
    },
  });
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
