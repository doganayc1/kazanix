import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.update({
    where: {
      id: "cmsk3mmxw0000l7045r262mwj",
    },
    data: {
      role: Role.ADMIN,
    },
  });

  console.log("ADMIN yapıldı:", {
    name: user.name,
    email: user.email,
    role: user.role,
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });