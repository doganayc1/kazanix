import {
  NextRequest,
  NextResponse,
} from "next/server";

import { prisma } from "@/lib/prisma";

import {
  getAdvertiserSession,
} from "@/lib/advertiser-auth";

const packagePrices:
  Record<string, number> = {
    BASLANGIC: 99,
    STANDART: 299,
    ONE_CIKAN: 599,
  };

export async function GET() {
  try {
    const session =
      await getAdvertiserSession();

    if (!session) {
      return NextResponse.json(
        {
          error:
            "Yetkisiz erisim.",
        },
        {
          status: 401,
        }
      );
    }

    const now = new Date();

    await prisma.advertisement.updateMany({
      where: {
        advertiserId: session.id,
        status: "APPROVED",
        expiresAt: {
          lte: now,
        },
      },
      data: {
        status: "EXPIRED",
      },
    });

    const advertisements =
      await prisma.advertisement.findMany({
        where: {
          advertiserId:
            session.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      advertisements
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Reklamlar yuklenemedi.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const session =
      await getAdvertiserSession();

    if (!session) {
      return NextResponse.json(
        {
          error:
            "Yetkisiz erisim.",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await request.json();

    const company =
      String(
        body.company || ""
      ).trim();

    const title =
      String(
        body.title || ""
      ).trim();

    const description =
      String(
        body.description || ""
      ).trim();

    const image =
      String(
        body.image || ""
      ).trim();

    const link =
      String(
        body.link || ""
      ).trim();

    const selectedPackage =
      String(
        body.package || ""
      ).trim();

    if (
      !company ||
      !title ||
      !description ||
      !selectedPackage
    ) {
      return NextResponse.json(
        {
          error:
            "Lutfen zorunlu alanlari doldurun.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !packagePrices[
        selectedPackage
      ]
    ) {
      return NextResponse.json(
        {
          error:
            "Gecersiz reklam paketi.",
        },
        {
          status: 400,
        }
      );
    }

    const advertisement =
      await prisma.advertisement.create({
        data: {
          advertiserId:
            session.id,

          company,

          email:
            session.email,

          title,

          description,

          image:
            image || null,

          link:
            link || null,

          package:
            selectedPackage,

          packagePrice:
            packagePrices[
              selectedPackage
            ],

          status:
            "PENDING",
        },
      });

    return NextResponse.json(
      advertisement,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Reklam olusturulamadi.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest
) {
  try {
    const session =
      await getAdvertiserSession();

    if (!session) {
      return NextResponse.json(
        {
          error:
            "Yetkisiz erisim.",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await request.json();

    const id =
      String(body.id || "");

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Reklam ID gereklidir.",
        },
        {
          status: 400,
        }
      );
    }

    const advertisement =
      await prisma.advertisement.findFirst({
        where: {
          id,
          advertiserId:
            session.id,
        },
      });

    if (!advertisement) {
      return NextResponse.json(
        {
          error:
            "Reklam bulunamadi.",
        },
        {
          status: 404,
        }
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
      {
        error:
          "Reklam silinemedi.",
      },
      {
        status: 500,
      }
    );
  }
}