import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const company = String(body.company || "").trim();
    const email = String(body.email || "").trim();
    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const packageName = String(body.package || "").trim();

    if (!company || !email || !title || !description || !packageName) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur." },
        { status: 400 }
      );
    }

    const advertisement = await prisma.advertisement.create({
      data: {
        company,
        email,
        title,
        description,
        package: packageName,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      advertisement,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Reklam başvurusu oluşturulamadı." },
      { status: 500 }
    );
  }
}
