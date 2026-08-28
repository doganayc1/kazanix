import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const advertisements = await prisma.advertisement.findMany({
      where: {
        status: "APPROVED",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(advertisements);
  } catch {
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

    const advertisement = await prisma.advertisement.create({
      data: {
        company,
        email,
        title,
        description,
        image: image || null,
        link: link || null,
        package: selectedPackage,
        status: "PENDING",
      },
    });

    return NextResponse.json(advertisement, {
      status: 201,
    });
  } catch (error) {
    console.error("Reklam oluşturma hatası:", error);

    return NextResponse.json(
      { error: "Reklam oluşturulamadı." },
      { status: 500 }
    );
  }
}
