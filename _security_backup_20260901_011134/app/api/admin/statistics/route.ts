import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  ADMIN_COOKIE_NAME,
  isAdminAuthenticated,
} from "@/lib/admin-auth";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const authenticated =
      isAdminAuthenticated(
        cookieStore.get(
          ADMIN_COOKIE_NAME
        )?.value
      );

    if (!authenticated) {
      return NextResponse.json(
        { error: "Yetkisiz erişim." },
        { status: 401 }
      );
    }

    const [
      total,
      pending,
      approved,
      rejected,
      expired,
      topAdvertisements,
    ] = await Promise.all([
      prisma.advertisement.count(),

      prisma.advertisement.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.advertisement.count({
        where: {
          status: "APPROVED",
        },
      }),

      prisma.advertisement.count({
        where: {
          status: "REJECTED",
        },
      }),

      prisma.advertisement.count({
        where: {
          status: "EXPIRED",
        },
      }),

      prisma.advertisement.findMany({
        take: 5,
        orderBy: {
          packagePrice: "desc",
        },
        select: {
          id: true,
          company: true,
          title: true,
          package: true,
          packagePrice: true,
          status: true,
        },
      }),
    ]);

    const revenueResult =
      await prisma.advertisement.aggregate({
        _sum: {
          packagePrice: true,
        },
        where: {
          status: "APPROVED",
        },
      });

    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(
      sevenDaysAgo.getDate() - 7
    );

    const recentAdvertisements =
      await prisma.advertisement.count({
        where: {
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
      });

    return NextResponse.json({
      total,
      pending,
      approved,
      rejected,
      expired,

      revenue:
        revenueResult._sum.packagePrice || 0,

      recentAdvertisements,

      topAdvertisements,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "İstatistikler alınamadı.",
      },
      {
        status: 500,
      }
    );
  }
}