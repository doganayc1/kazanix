import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {

  const password = await bcrypt.hash("123456", 10);


  const businessUser = await prisma.user.create({
    data: {
      name: "KAZANIX Test Firma",
      email: "firma@test.com",
      password,
      role: Role.BUSINESS,
    },
  });


  const business = await prisma.businessProfile.create({
    data: {
      userId: businessUser.id,
      companyName: "KAZANIX Market",
      description: "Test kampanya firması",
    },
  });


  const category = await prisma.category.create({
    data: {
      name: "Market İndirimleri",
      slug: "market-indirimleri",
    },
  });


  await prisma.campaign.create({
    data: {
      title: "500 TL Üzeri 100 TL İndirim",
      description:
        "KAZANIX Market alışverişlerinde geçerli özel fırsat.",
      categoryId: category.id,
      businessId: business.id,
    },
  });


  console.log("Test kampanyası oluşturuldu");
}


main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });