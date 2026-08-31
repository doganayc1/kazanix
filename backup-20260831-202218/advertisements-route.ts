import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AdvertisementStatus } from "@prisma/client";

const packages: Record<
  string,
  {
    days: number;
    price: number;
    priority: number;
  }
> = {
  BASLANGIC: {
    days: 7,
    price: 99,
    priority: 1,
  },
  STANDART: {
    days: 30,
    price: 299,
    priority: 2,
  },
  ONE_CIKAN: {
    days: 30,
    price: 599,
    priority: 3,
  },
};

export async function GET() {
  try {
    const now = new Date();

    // Süresi dolan onaylı reklamları otomatik olarak EXPIRED yap
    await prisma.advertisement.updateMany({
      where: {
        status: AdvertisementStatus.APPROVED,
        expiresAt: {
          lte: now,
        },
      },
      data: {
        status: AdvertisementStatus.EXPIRED,
      },
    });

    // Sadece aktif reklamları getir
    const advertisements =
      await prisma.advertisement.findMany({
        where: {
          status: AdvertisementStatus.APPROVED,
          startsAt: {
            lte: now,
          },
          expiresAt: {
            gt: now,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    // Öne çıkan reklamlar her zaman önce
    advertisements.sort((a, b) => {
      const priorityA =
        packages[a.package]?.priority ?? 0;

      const priorityB =
        packages[b.package]?.priority ?? 0;

      if (priorityA !== priorityB) {
        return priorityB - priorityA;
      }

      return (
        b.createdAt.getTime() -
        a.createdAt.getTime()
      );
    });

    return NextResponse.json(advertisements);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Reklamlar alınamadı." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      company,
      email,
      title,
      description,
      image,
      link,
      package: selectedPackage,
    } = body;

    if (
      !company ||
      !email ||
      !title ||
      !description ||
      !selectedPackage
    ) {
      return NextResponse.json(
        {
          error:
            "Lütfen zorunlu alanları doldurun.",
        },
        {
          status: 400,
        }
      );
    }

    const selectedPlan =
      packages[selectedPackage];

    if (!selectedPlan) {
      return NextResponse.json(
        {
          error:
            "Geçersiz reklam paketi.",
        },
        {
          status: 400,
        }
      );
    }

    // Reklam önce admin onayı bekler
    const advertisement =
      await prisma.advertisement.create({
        data: {
          company,
          email,
          title,
          description,
          image: image || null,
          link: link || null,
          package: selectedPackage,
          packagePrice:
            selectedPlan.price,
          status:
            AdvertisementStatus.PENDING,
        },
      });

    return NextResponse.json(
      {
        success: true,
        advertisement,
        packageInfo: {
          price:
            selectedPlan.price,
          days:
            selectedPlan.days,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Reklam oluşturulamadı.",
      },
      {
        status: 500,
      }
    );
  }
}