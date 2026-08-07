import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: {
        category: true,
        business: true,
        favorites: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Kampanyalar alınamadı.",
      },
      {
        status: 500,
      }
    );
  }
}