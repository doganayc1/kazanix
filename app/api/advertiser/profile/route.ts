import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdvertiser, unauthorized } from "../auth";

export async function GET() {
  try {
    const user = await getAdvertiser();

    if (!user) {
      return unauthorized();
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },

      business: user.business,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Profil alınamadı.",
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
    const user = await getAdvertiser();

    if (!user) {
      return unauthorized();
    }

    const body = await request.json();

    const companyName =
      body.companyName !== undefined
        ? String(body.companyName).trim()
        : user.business?.companyName ||
          user.name;

    if (!companyName) {
      return NextResponse.json(
        {
          error:
            "Firma adı boş olamaz.",
        },
        {
          status: 400,
        }
      );
    }

    const business =
      user.business
        ? await prisma.businessProfile.update({
            where: {
              id: user.business.id,
            },

            data: {
              companyName,

              description:
                body.description !== undefined
                  ? String(
                      body.description
                    ).trim() || null
                  : user.business.description,

              phone:
                body.phone !== undefined
                  ? String(
                      body.phone
                    ).trim() || null
                  : user.business.phone,

              address:
                body.address !== undefined
                  ? String(
                      body.address
                    ).trim() || null
                  : user.business.address,
            },
          })

        : await prisma.businessProfile.create({
            data: {
              userId: user.id,

              companyName,

              description:
                body.description
                  ? String(
                      body.description
                    ).trim()
                  : null,

              phone:
                body.phone
                  ? String(
                      body.phone
                    ).trim()
                  : null,

              address:
                body.address
                  ? String(
                      body.address
                    ).trim()
                  : null,
            },
          });

    return NextResponse.json(business);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Profil güncellenemedi.",
      },
      {
        status: 500,
      }
    );
  }
}