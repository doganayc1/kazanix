import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

async function isAdmin() {
  const cookieStore = await cookies();

  const possibleNames = [
    "session",
    "auth",
    "token",
    "auth_token",
    "session_token",
  ];

  let value = "";

  for (const name of possibleNames) {
    const found = cookieStore.get(name)?.value;

    if (found) {
      value = found;
      break;
    }
  }

  if (!value) {
    return false;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: value,
      },
      select: {
        role: true,
      },
    });

    return user?.role === "ADMIN";
  } catch {
    return false;
  }
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { error: "Yetkisiz." },
      { status: 401 }
    );
  }

  const advertisements = await prisma.advertisement.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(advertisements);
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { error: "Yetkisiz." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const id = String(body.id || "");
    const status = String(body.status || "");

    if (!id) {
      return NextResponse.json(
        { error: "ID gerekli." },
        { status: 400 }
      );
    }

    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Geçersiz durum." },
        { status: 400 }
      );
    }

    let startsAt: Date | null = null;
    let expiresAt: Date | null = null;

    if (status === "APPROVED") {
      const ad = await prisma.advertisement.findUnique({
        where: { id },
      });

      if (!ad) {
        return NextResponse.json(
          { error: "Reklam bulunamadı." },
          { status: 404 }
        );
      }

      const days =
        ad.package === "premium"
          ? 30
          : ad.package === "popular"
            ? 15
            : 7;

      startsAt = new Date();
      expiresAt = new Date();

      expiresAt.setDate(expiresAt.getDate() + days);
    }

    if (status === "REJECTED") {
      startsAt = null;
      expiresAt = null;
    }

    const advertisement = await prisma.advertisement.update({
      where: { id },
      data: {
        status,
        startsAt,
        expiresAt,
      },
    });

    return NextResponse.json(advertisement);
  } catch (error) {
    console.error("ADMIN_AD_UPDATE_ERROR", error);

    return NextResponse.json(
      { error: "Reklam güncellenemedi." },
      { status: 500 }
    );
  }
}
