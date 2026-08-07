import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();

    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          message: "Giriş yapmanız gerekiyor.",
        },
        {
          status: 401,
        }
      );
    }

    const business = await prisma.businessProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!business) {
      return NextResponse.json(
        {
          message: "İşletme profili bulunamadı.",
        },
        {
          status: 404,
        }
      );
    }

    const {
      title,
      description,
      categoryId,
    } = await req.json();

    if (!title || !description || !categoryId) {
      return NextResponse.json(
        {
          message: "Tüm alanları doldurun.",
        },
        {
          status: 400,
        }
      );
    }

    const campaign = await prisma.campaign.create({
      data: {
        title,
        description,
        categoryId,
        businessId: business.id,
      },
    });

    return NextResponse.json(campaign);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Kampanya oluşturulamadı.",
      },
      {
        status: 500,
      }
    );
  }
}