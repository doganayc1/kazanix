import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdvertiser, unauthorized } from "../../auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

function ownershipWhere(
  id: string,
  user: {
    id: string;
    email: string;
  }
) {
  return {
    id,
    OR: [
      {
        advertiserId: user.id,
      },
      {
        advertiserId: null,
        email: user.email,
      },
    ],
  };
}

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
        where: ownershipWhere(id, user),
      });

    if (!advertisement) {
      return NextResponse.json(
        {
          error: "Reklam bulunamadı.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(advertisement);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Reklam alınamadı.",
      },
      {
        status: 500,
      }
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
        where: ownershipWhere(id, user),
      });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Reklam bulunamadı.",
        },
        {
          status: 404,
        }
      );
    }

    const advertisement =
      await prisma.advertisement.update({
        where: {
          id,
        },

        data: {

          advertiserId:
            existing.advertiserId ||
            user.id,

          title:
            body.title !== undefined
              ? String(body.title).trim()
              : existing.title,

          description:
            body.description !== undefined
              ? String(body.description).trim()
              : existing.description,

          company:
            body.company !== undefined
              ? String(body.company).trim()
              : existing.company,

          image:
            body.image !== undefined
              ? (
                  body.image
                    ? String(body.image).trim()
                    : null
                )
              : existing.image,

          link:
            body.link !== undefined
              ? (
                  body.link
                    ? String(body.link).trim()
                    : null
                )
              : existing.link,

          status: "PENDING",
        },
      });

    return NextResponse.json(advertisement);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Reklam güncellenemedi.",
      },
      {
        status: 500,
      }
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
        where: ownershipWhere(id, user),
      });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Reklam bulunamadı.",
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