import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const packages: Record<string, number> = {
  starter: 7,
  popular: 15,
  premium: 30,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const company = String(body.company || "").trim();
    const email = String(body.email || "").trim();
    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const image = String(body.image || "").trim();
    const link = String(body.link || "").trim();
    const packageName = String(body.package || "").trim();

    if (!company || !email || !title || !description || !packageName) {
      return NextResponse.json(
        { error: "Zorunlu alanlar eksik." },
        { status: 400 }
      );
    }

    if (!packages[packageName]) {
      return NextResponse.json(
        { error: "Geçersiz reklam paketi." },
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
        package: packageName,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      advertisement,
    });
  } catch (error) {
    console.error("ADVERTISEMENT_POST_ERROR", error);

    return NextResponse.json(
      { error: "Reklam başvurusu oluşturulamadı." },
      { status: 500 }
    );
  }
}
