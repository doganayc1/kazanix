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

    const result =
      await prisma.advertisement.updateMany({
        where: {
          id,
          status: "APPROVED",
        },
        data: {
          impressions: {
            increment: 1,
          },
        },
      });

    return NextResponse.json({
      success: result.count > 0,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Goruntulenme kaydedilemedi.",
      },
      {
        status: 500,
      }
    );
  }
}