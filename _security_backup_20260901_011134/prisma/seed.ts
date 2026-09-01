import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("KAZANIX seed baslatiliyor...");

  const password = await bcrypt.hash("123456", 10);

  const businessUser = await prisma.user.upsert({
    where: {
      email: "firma@test.com",
    },
    update: {
      name: "KAZANIX Test Firma",
      role: Role.BUSINESS,
    },
    create: {
      name: "KAZANIX Test Firma",
      email: "firma@test.com",
      password,
      role: Role.BUSINESS,
    },
  });

  const business = await prisma.businessProfile.upsert({
    where: {
      userId: businessUser.id,
    },
    update: {
      companyName: "KAZANIX Market",
      description: "KAZANIX test isletmesi",
    },
    create: {
      userId: businessUser.id,
      companyName: "KAZANIX Market",
      description: "KAZANIX test isletmesi",
    },
  });

  const category = await prisma.category.upsert({
    where: {
      slug: "market-indirimleri",
    },
    update: {
      name: "Market Indirimleri",
    },
    create: {
      name: "Market Indirimleri",
      slug: "market-indirimleri",
    },
  });

  const existingCampaign = await prisma.campaign.findFirst({
    where: {
      title: "500 TL Uzeri 100 TL Indirim",
      businessId: business.id,
    },
  });

  if (!existingCampaign) {
    await prisma.campaign.create({
      data: {
        title: "500 TL Uzeri 100 TL Indirim",
        description: "KAZANIX Market alisverislerinde gecerli ozel firsat.",
        categoryId: category.id,
        businessId: business.id,
      },
    });

    console.log("Kampanya olusturuldu.");
  } else {
    console.log("Kampanya zaten mevcut.");
  }

  const campaignCount = await prisma.campaign.count();

  console.log("KAZANIX seed tamamlandi.");
  console.log("Toplam kampanya: " + campaignCount);
}

main()
  .catch((error) => {
    console.error("Seed hatasi:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
