import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AdvertisementStatus } from "@prisma/client";

const packageDays: Record<string, number> = {
  BASLANGIC: 7,
  STANDART: 30,
  ONE_CIKAN: 30,
};

export async function GET() {
  try {
    const now = new Date();

    // Süresi dolan reklamları otomatik EXPIRED yap
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

    // Sadece aktif ve süresi dolmamış reklamları getir
    const advertisements = await prisma.advertisement.findMany({
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
        { error: "Lütfen zorunlu alanları doldurun." },
        { status: 400 }
      );
    }

    const validPackages = Object.keys(packageDays);

    if (!validPackages.includes(selectedPackage)) {
      return NextResponse.json(
        { error: "Geçersiz reklam paketi." },
        { status: 400 }
      );
    }

    // Otomatik onay ve süre hesaplama
    const now = new Date();

    const days = packageDays[selectedPackage];

    const expiresAt = new Date(
      now.getTime() + days * 24 * 60 * 60 * 1000
    );

    const advertisement = await prisma.advertisement.create({
      data: {
        company,
        email,
        title,
        description,
        image: image || null,
        link: link || null,
        package: selectedPackage,

        // Otomatik onay
        status: AdvertisementStatus.APPROVED,

        // Otomatik başlangıç
        startsAt: now,

        // Pakete göre otomatik bitiş
        expiresAt,
      },
    });

    return NextResponse.json(advertisement, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Reklam oluşturulamadı." },
      { status: 500 }
    );
  }
}