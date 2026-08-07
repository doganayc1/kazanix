import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ campaignId: string }>;
  }
) {
  const { campaignId } = await params;

  try {
    const cookieStore = await cookies();

    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          message: "Giris yapmaniz gerekiyor.",
        },
        {
          status: 401,
        }
      );
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        campaignId,
      },
    });

    return NextResponse.json(favorite);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Favori eklenemedi.",
      },
      {
        status: 500,
      }
    );
  }
}
