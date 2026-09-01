import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdvertiser, unauthorized } from "../auth";

export async function GET() {
  try {
    const user = await getAdvertiser();

    if (!user) {
      return unauthorized();
    }

    const advertisements = await prisma.advertisement.findMany({
      where: {
        email: user.email,
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

export async function POST(request: NextRequest) {
  try {
    const user = await getAdvertiser();

    if (!user) {
      return unauthorized();
    }

    if (!user.business) {
      return NextResponse.json(
        { error: "Önce firma profilinizi oluşturun." },
        { status: 400 }
      );
    }

    const body = await request.json();

    const title = body.title?.toString().trim();
    const description = body.description?.toString().trim();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Reklam başlığı ve açıklaması zorunludur." },
        { status: 400 }
      );
    }

    const advertisement = await prisma.advertisement.create({
      data: {
        company:
          body.company?.toString().trim() ||
          user.business.companyName,

        email: user.email,

        title,

        description,

        package:
          body.package?.toString().trim() ||
          "BASLANGIC",

        packagePrice:
          Number(body.packagePrice || 0),

        status: "PENDING",
      },
    });

    return NextResponse.json(advertisement, {
      status: 201,
    });
  } catch (error) {
    console.error("Advertisement create error:", error);

    return NextResponse.json(
      { error: "Reklam oluşturulamadı." },
      { status: 500 }
    );
  }
}