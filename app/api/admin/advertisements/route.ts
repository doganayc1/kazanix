import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const advertisements = await prisma.advertisement.findMany({
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

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID ve durum zorunludur." },
        { status: 400 }
      );
    }

    if (
      status !== "APPROVED" &&
      status !== "REJECTED" &&
      status !== "PENDING"
    ) {
      return NextResponse.json(
        { error: "Geçersiz reklam durumu." },
        { status: 400 }
      );
    }

    const advertisement =
      await prisma.advertisement.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });

    return NextResponse.json(advertisement);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Reklam güncellenemedi." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Reklam ID zorunludur." },
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
