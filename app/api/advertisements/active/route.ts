import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();

    const advertisements = await prisma.advertisement.findMany({
      where: {
        status: "APPROVED",
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: now } },
        ],
      },
      orderBy: [
        { package: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(advertisements);
  } catch (error) {
    console.error("ACTIVE_ADS_ERROR", error);

    return NextResponse.json(
      { error: "Reklamlar alınamadı." },
      { status: 500 }
    );
  }
}
