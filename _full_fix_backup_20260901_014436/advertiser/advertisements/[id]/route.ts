import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdvertiser, unauthorized } from "../../auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const user = await getAdvertiser();

    if (!user) {
      return unauthorized();
    }

    const { id } = await params;

    const advertisement =
      await prisma.advertisement.findFirst({
        where: {
          id,
          email: user.email,
        },
      });

    if (!advertisement) {
      return NextResponse.json(
        { error: "Reklam bulunamadı." },
        { status: 404 }
      );
    }

    return NextResponse.json(advertisement);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Reklam alınamadı." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: Params
) {
  try {
    const user = await getAdvertiser();

    if (!user) {
      return unauthorized();
    }

    const { id } = await params;
    const body = await request.json();

    const existing =
      await prisma.advertisement.findFirst({
        where: {
          id,
          email: user.email,
        },
      });

    if (!existing) {
      return NextResponse.json(
        { error: "Reklam bulunamadı." },
        { status: 404 }
      );
    }

    const advertisement =
      await prisma.advertisement.update({
        where: { id },
        data: {
          title:
            body.title !== undefined
              ? body.title.toString().trim()
              : existing.title,

          description:
            body.description !== undefined
              ? body.description.toString().trim()
              : existing.description,

          company:
            body.company !== undefined
              ? body.company.toString().trim()
              : existing.company,

          image:
            body.image !== undefined
              ? body.image
              : existing.image,

          status: "PENDING",
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

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    const user = await getAdvertiser();

    if (!user) {
      return unauthorized();
    }

    const { id } = await params;

    const existing =
      await prisma.advertisement.findFirst({
        where: {
          id,
          email: user.email,
        },
      });

    if (!existing) {
      return NextResponse.json(
        { error: "Reklam bulunamadı." },
        { status: 404 }
      );
    }

    await prisma.advertisement.delete({
      where: { id },
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