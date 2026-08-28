import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { error: "Yetkisiz erisim." },
      { status: 401 }
    );
  }

  try {
    const advertisements = await prisma.advertisement.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(advertisements);
  } catch {
    return NextResponse.json(
      { error: "Reklamlar alinamadi." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { error: "Yetkisiz erisim." },
      { status: 401 }
    );
  }

  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Eksik bilgi." },
        { status: 400 }
      );
    }

    if (
      status !== "PENDING" &&
      status !== "APPROVED" &&
      status !== "REJECTED"
    ) {
      return NextResponse.json(
        { error: "Gecersiz reklam durumu." },
        { status: 400 }
      );
    }

    const advertisement = await prisma.advertisement.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(advertisement);
  } catch {
    return NextResponse.json(
      { error: "Reklam guncellenemedi." },
      { status: 500 }
    );
  }
}
