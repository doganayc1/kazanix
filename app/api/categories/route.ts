import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(categories);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Kategoriler alınamadı.",
      },
      {
        status: 500,
      }
    );
  }
}