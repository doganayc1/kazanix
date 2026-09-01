import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdvertiserSession } from "@/lib/advertiser-auth";

export async function GET() {
  try {
    const session = await getAdvertiserSession();

    if (!session) {
      return NextResponse.json(
        { error: "Oturum bulunamadi." },
        { status: 401 }
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

    return NextResponse.json(advertisements);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Reklamlar yuklenemedi." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest
) {
  try {
    const session = await getAdvertiserSession();

    if (!session) {
      return NextResponse.json(
        { error: "Oturum bulunamadi." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      id,
      company,
      email,
      title,
      description,
      image,
      link,
      package: selectedPackage,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Reklam ID gereklidir." },
        { status: 400 }
      );
    }

    const advertisement =
      await prisma.advertisement.findFirst({
        where: {
          id,
          advertiserId: session.id,
        },
      });

    if (!advertisement) {
      return NextResponse.json(
        { error: "Reklam bulunamadi." },
        { status: 404 }
      );
    }

    if (advertisement.status === "APPROVED") {
      return NextResponse.json(
        {
          error:
            "Onaylanmis reklamlar duzenlenemez. Degisiklik icin yoneticiyle iletisime gecin.",
        },
        { status: 403 }
      );
    }

    const updatedAdvertisement =
      await prisma.advertisement.update({
        where: {
          id,
        },
        data: {
          company: company || advertisement.company,
          email: email || advertisement.email,
          title: title || advertisement.title,
          description:
            description || advertisement.description,
          image:
            image === undefined
              ? advertisement.image
              : image || null,
          link:
            link === undefined
              ? advertisement.link
              : link || null,
          package:
            selectedPackage ||
            advertisement.package,

          status:
            advertisement.status === "REJECTED"
              ? "PENDING"
              : advertisement.status,
        },
      });

    return NextResponse.json(
      updatedAdvertisement
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Reklam guncellenemedi." },
      { status: 500 }
    );
  }
}