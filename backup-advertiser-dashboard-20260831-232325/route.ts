import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdvertiserSession } from "@/lib/advertiser-auth";
import { AdvertisementStatus } from "@prisma/client";

const packages: Record<
  string,
  {
    price: number;
    days: number;
  }
> = {
  BASLANGIC: {
    price: 499,
    days: 7,
  },

  STANDART: {
    price: 1499,
    days: 30,
  },

  ONE_CIKAN: {
    price: 2999,
    days: 30,
  },
};

export async function GET() {
  try {
    const session =
      await getAdvertiserSession();

    if (!session) {
      return NextResponse.json(
        {
          error: "Oturum bulunamadi.",
        },
        {
          status: 401,
        }
      );
    }

    const advertisements =
      await prisma.advertisement.findMany({
        where: {
          advertiserId: session.id,
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
            "Oturum bulunamadi.",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await request.json();

    const {
      company,
      title,
      description,
      image,
      link,
      package: selectedPackage,
    } = body;

    if (
      !company ||
      !title ||
      !description ||
      !selectedPackage
    ) {
      return NextResponse.json(
        {
          error:
            "Zorunlu alanlari doldurun.",
        },
        {
          status: 400,
        }
      );
    }

    const packageInfo =
      packages[selectedPackage];

    if (!packageInfo) {
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
            packageInfo.price,

          status:
            AdvertisementStatus.PENDING,

          startsAt:
            null,

          expiresAt:
            null,

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

export async function PATCH(
  request: NextRequest
) {
  try {

    const session =
      await getAdvertiserSession();

    if (!session) {
      return NextResponse.json(
        {
          error:
            "Oturum bulunamadi.",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await request.json();

    const {
      id,
      company,
      title,
      description,
      image,
      link,
      package: selectedPackage,
    } = body;

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Reklam ID gerekli.",
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

    if (
      advertisement.status ===
      AdvertisementStatus.APPROVED
    ) {
      return NextResponse.json(
        {
          error:
            "Onaylanmis reklam duzenlenemez.",
        },
        {
          status: 400,
        }
      );
    }

    const packageInfo =
      selectedPackage
        ? packages[selectedPackage]
        : null;

    if (
      selectedPackage &&
      !packageInfo
    ) {
      return NextResponse.json(
        {
          error:
            "Gecersiz paket.",
        },
        {
          status: 400,
        }
      );
    }

    const updatedAdvertisement =
      await prisma.advertisement.update({
        where: {
          id,
        },

        data: {

          company:
            company ??
            advertisement.company,

          title:
            title ??
            advertisement.title,

          description:
            description ??
            advertisement.description,

          image:
            image !== undefined
              ? image || null
              : advertisement.image,

          link:
            link !== undefined
              ? link || null
              : advertisement.link,

          package:
            selectedPackage ??
            advertisement.package,

          packagePrice:
            packageInfo
              ? packageInfo.price
              : advertisement.packagePrice,

          status:
            AdvertisementStatus.PENDING,

        },
      });

    return NextResponse.json(
      updatedAdvertisement
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Reklam guncellenemedi.",
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
            "Oturum bulunamadi.",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await request.json();

    const { id } =
      body;

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Reklam ID gerekli.",
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