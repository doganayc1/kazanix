import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const advertisements = await prisma.advertisement.findMany({
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

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const id = String(body.id || "");
    const status = String(body.status || "");

    if (!id || !["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Geçersiz işlem." },
        { status: 400 }
      );
    }

    const advertisement = await prisma.advertisement.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(advertisement);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Reklam güncellenemedi." },
      { status: 500 }
    );
  }
}
