import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdvertiser, unauthorized } from "../auth";

export async function GET() {
  try {
    const user = await getAdvertiser();

    if (!user) {
      return unauthorized();
    }

    const advertisements =
      await prisma.advertisement.findMany({
        where: {
          OR: [
            {
              advertiserId: user.id,
            },
            {
              advertiserId: null,
              email: user.email,
            },
          ],
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    const total = advertisements.length;

    const pending =
      advertisements.filter(
        (item) =>
          item.status === "PENDING"
      ).length;

    const approved =
      advertisements.filter(
        (item) =>
          item.status === "APPROVED"
      ).length;

    const rejected =
      advertisements.filter(
        (item) =>
          item.status === "REJECTED"
      ).length;

    const revenue =
      advertisements.reduce(
        (sum, item) =>
          sum +
          Number(item.packagePrice || 0),
        0
      );

    return NextResponse.json({
      advertiser: {
        id: user.id,
        name: user.name,
        email: user.email,
        companyName:
          user.business?.companyName ||
          user.name,
      },

      statistics: {
        total,
        pending,
        approved,
        rejected,
        revenue,
      },

      advertisements,
    });

  } catch (error) {
    console.error(
      "Advertiser dashboard error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Panel verileri alınamadı.",
      },
      {
        status: 500,
      }
    );
  }
}