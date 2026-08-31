import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams
      .get("email")
      ?.trim()
      .toLowerCase();

    if (!email) {
      return NextResponse.json(
        {
          error: "E-posta adresi gereklidir.",
        },
        {
          status: 400,
        }
      );
    }

    const advertisements =
      await prisma.advertisement.findMany({
        where: {
          email,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    const statistics = {
      total: advertisements.length,
      pending: advertisements.filter(
        (advertisement) =>
          advertisement.status === "PENDING"
      ).length,

      approved: advertisements.filter(
        (advertisement) =>
          advertisement.status === "APPROVED"
      ).length,

      rejected: advertisements.filter(
        (advertisement) =>
          advertisement.status === "REJECTED"
      ).length,

      expired: advertisements.filter(
        (advertisement) =>
          advertisement.status === "EXPIRED"
      ).length,

      totalSpent: advertisements.reduce(
        (total, advertisement) =>
          total + (advertisement.packagePrice || 0),
        0
      ),
    };

    return NextResponse.json({
      advertisements,
      statistics,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Reklamveren bilgileri alınırken bir hata oluştu.",
      },
      {
        status: 500,
      }
    );
  }
}