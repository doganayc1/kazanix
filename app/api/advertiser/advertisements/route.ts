import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdvertiser, unauthorized } from "../auth";
import { getAdPackage } from "@/lib/ad-packages";

export async function GET() {
  try {
    const user = await getAdvertiser();

    if (!user) {
      return unauthorized();
    }

    const advertisements =
      await prisma.advertisement.findMany({
        where: {
          OR: [
            {
              advertiserId: user.id,
            },
            {
              advertiserId: null,
              email: user.email,
            },
          ],
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(advertisements);

  } catch (error) {
    console.error("Advertiser advertisements GET error:", error);

    return NextResponse.json(
      {
        error: "Reklamlar alınamadı.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAdvertiser();

    if (!user) {
      return unauthorized();
    }

    if (!user.business) {
      return NextResponse.json(
        {
          error:
            "Firma profiliniz bulunamadı.",
        },
        {
          status: 400,
        }
      );
    }

    const body = await request.json();

    const title =
      String(body.title || "").trim();

    const description =
      String(body.description || "").trim();

    if (!title || !description) {
      return NextResponse.json(
        {
          error:
            "Reklam başlığı ve açıklaması zorunludur.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      body.link &&
      typeof body.link === "string"
    ) {
      try {
        const url = new URL(body.link);

        if (
          url.protocol !== "http:" &&
          url.protocol !== "https:"
        ) {
          throw new Error();
        }

      } catch {
        return NextResponse.json(
          {
            error:
              "Geçerli bir bağlantı adresi girin.",
          },
          {
            status: 400,
          }
        );
      }
    }

    const advertisement =
      await prisma.advertisement.create({
        data: {

          advertiserId: user.id,

          company:
            String(
              body.company ||
              user.business.companyName
            ).trim(),

          email: user.email,

          title,

          description,

          image:
            typeof body.image === "string" &&
            body.image.trim()
              ? body.image.trim()
              : null,

          link:
            typeof body.link === "string" &&
            body.link.trim()
              ? body.link.trim()
              : null,

          package:
            String(
              body.package || "BASLANGIC"
            ).trim(),

          packagePrice: getAdPackage(String(body.package || "BASLANGIC").trim()).price,

          status: "PENDING",
        },
      });

    return NextResponse.json(
      advertisement,
      {
        status: 201,
      }
    );

  } catch (error) {
    console.error(
      "Advertisement create error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Reklam oluşturulamadı.",
      },
      {
        status: 500,
      }
    );
  }
}