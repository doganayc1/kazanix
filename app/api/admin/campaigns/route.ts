import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

async function checkAdmin() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return user;
}

export async function DELETE(req: Request) {
  try {
    const admin = await checkAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          message: "Yetkisiz erişim.",
        },
        {
          status: 403,
        }
      );
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          message: "Kampanya ID gerekli.",
        },
        {
          status: 400,
        }
      );
    }

    const campaign = await prisma.campaign.findUnique({
      where: {
        id,
      },
    });

    if (!campaign) {
      return NextResponse.json(
        {
          message: "Kampanya bulunamadı.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.favorite.deleteMany({
      where: {
        campaignId: id,
      },
    });

    await prisma.comment.deleteMany({
      where: {
        campaignId: id,
      },
    });

    await prisma.campaign.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Kampanya başarıyla silindi.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Kampanya silinemedi.",
      },
      {
        status: 500,
      }
    );
  }
}