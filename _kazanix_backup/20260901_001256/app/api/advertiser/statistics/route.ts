import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdvertiserSession } from "@/lib/advertiser-auth";

export async function GET() {
  try {
    const session = await getAdvertiserSession();

    if (!session) {
      return NextResponse.json(
        { error: "Oturum bulunamadi." },
        { status: 401 }
      );
    }

    const advertisements =
      await prisma.advertisement.findMany({
        where: {
          advertiserId: session.id,
        },
      });

    const total = advertisements.length;

    const pending = advertisements.filter(
      (ad) => ad.status === "PENDING"
    ).length;

    const approved = advertisements.filter(
      (ad) => ad.status === "APPROVED"
    ).length;

    const rejected = advertisements.filter(
      (ad) => ad.status === "REJECTED"
    ).length;

    const expired = advertisements.filter(
      (ad) => ad.status === "EXPIRED"
    ).length;

    const totalSpent = advertisements.reduce(
      (total, ad) => total + ad.packagePrice,
      0
    );

    return NextResponse.json({
      total,
      pending,
      approved,
      rejected,
      expired,
      totalSpent,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Istatistikler yuklenemedi." },
      { status: 500 }
    );
  }
}