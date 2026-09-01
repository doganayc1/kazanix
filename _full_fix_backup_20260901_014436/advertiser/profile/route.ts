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
      { error: "Profil alınamadı." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getAdvertiser();

    if (!user) {
      return unauthorized();
    }

    if (!user.business) {
      return NextResponse.json(
        { error: "Firma profili bulunamadı." },
        { status: 404 }
      );
    }

    const body = await request.json();

    const business =
      await prisma.businessProfile.update({
        where: {
          id: user.business.id,
        },
        data: {
          companyName:
            body.companyName !== undefined
              ? body.companyName.toString().trim()
              : user.business.companyName,

          description:
            body.description !== undefined
              ? body.description.toString().trim()
              : user.business.description,

          phone:
            body.phone !== undefined
              ? body.phone.toString().trim()
              : user.business.phone,

          address:
            body.address !== undefined
              ? body.address.toString().trim()
              : user.business.address,
        },
      });

    return NextResponse.json(business);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Profil güncellenemedi." },
      { status: 500 }
    );
  }
}