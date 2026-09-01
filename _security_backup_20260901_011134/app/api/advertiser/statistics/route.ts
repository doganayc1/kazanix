import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdvertiser } from "@/lib/advertiser-auth";

export async function GET() {
  try {
    const user = await getAdvertiser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Reklam veren girisi gerekli.",
        },
        {
          status: 401,
        }
      );
    }

    const advertisements =
      await prisma.advertisement.findMany({
        where: {
          advertiserId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          company: true,
          title: true,
          package: true,
          packagePrice: true,
          status: true,
          startsAt: true,
          expiresAt: true,
          impressions: true,
          clicks: true,
          createdAt: true,
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

    const impressions =
      advertisements.reduce(
        (sum, ad) => sum + ad.impressions,
        0
      );

    const clicks =
      advertisements.reduce(
        (sum, ad) => sum + ad.clicks,
        0
      );

    const revenue =
      advertisements.reduce(
        (sum, ad) =>
          ad.status === "APPROVED"
            ? sum + ad.packagePrice
            : sum,
        0
      );

    const ctr =
      impressions > 0
        ? Number(
            ((clicks / impressions) * 100).toFixed(2)
          )
        : 0;

    return NextResponse.json({
      total,
      pending,
      approved,
      rejected,
      expired,
      impressions,
      clicks,
      ctr,
      revenue,
      advertisements,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "İstatistikler alinamadi.",
      },
      {
        status: 500,
      }
    );
  }
}