import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  ADMIN_COOKIE_NAME,
  isAdminAuthenticated,
} from "@/lib/admin-auth";
import { AdvertisementStatus } from "@prisma/client";

const packageDays: Record<string, number> = {
  BASLANGIC: 7,
  STANDART: 30,
  ONE_CIKAN: 30,
};

async function checkAdmin() {
  const cookieStore = await cookies();

  return isAdminAuthenticated(
    cookieStore.get(ADMIN_COOKIE_NAME)?.value
  );
}

export async function GET() {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json(
        { error: "Yetkisiz erişim." },
        { status: 401 }
      );
    }

    const advertisements =
      await prisma.advertisement.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(advertisements);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Reklamlar alınamadı." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json(
        { error: "Yetkisiz erişim." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const id = body.id;
    const status =
      body.status as AdvertisementStatus;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Reklam ID ve durum gereklidir." },
        { status: 400 }
      );
    }

    const validStatuses =
      Object.values(AdvertisementStatus);

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Geçersiz reklam durumu." },
        { status: 400 }
      );
    }

    const data: {
      status: AdvertisementStatus;
      startsAt?: Date | null;
      expiresAt?: Date | null;
    } = {
      status,
    };

    if (
      status === AdvertisementStatus.APPROVED
    ) {
      const existingAdvertisement =
        await prisma.advertisement.findUnique({
          where: {
            id,
          },
        });

      if (!existingAdvertisement) {
        return NextResponse.json(
          { error: "Reklam bulunamadı." },
          { status: 404 }
        );
      }

      const now = new Date();

      const days =
        packageDays[
          existingAdvertisement.package
        ] || 7;

      const expiresAt = new Date(
        now.getTime() +
          days * 24 * 60 * 60 * 1000
      );

      data.startsAt = now;
      data.expiresAt = expiresAt;
    }

    if (
      status === AdvertisementStatus.PENDING
    ) {
      data.startsAt = null;
      data.expiresAt = null;
    }

    const advertisement =
      await prisma.advertisement.update({
        where: {
          id,
        },
        data,
      });

    return NextResponse.json(
      advertisement
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Reklam güncellenemedi." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest
) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json(
        { error: "Yetkisiz erişim." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const id = body.id;

    if (!id) {
      return NextResponse.json(
        { error: "Reklam ID gereklidir." },
        { status: 400 }
      );
    }

    await prisma.advertisement.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Reklam silinemedi." },
      { status: 500 }
    );
  }
}