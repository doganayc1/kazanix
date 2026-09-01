import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  _request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Reklam ID gerekli." },
        { status: 400 }
      );
    }

    const advertisement =
      await prisma.advertisement.findFirst({
        where: {
          id,
          status: "APPROVED",
        },
        select: {
          link: true,
        },
      });

    if (!advertisement) {
      return NextResponse.json(
        {
          error: "Reklam bulunamadi.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.advertisement.update({
      where: {
        id,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      link: advertisement.link || null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Tiklama kaydedilemedi.",
      },
      {
        status: 500,
      }
    );
  }
}