import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const requestLog = new Map<string, number[]>();

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 5;

  const requests = requestLog.get(ip) || [];

  const recentRequests = requests.filter(
    (time) => now - time < windowMs
  );

  if (recentRequests.length >= maxRequests) {
    requestLog.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(ip, recentRequests);

  return false;
}

export async function GET() {
  try {
    const now = new Date();

    await prisma.advertisement.updateMany({
      where: {
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
          status: "APPROVED",
          OR: [
            {
              expiresAt: null,
            },
            {
              expiresAt: {
                gt: now,
              },
            },
          ],
        },
        orderBy: [
          {
            packagePrice: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
      });

    return NextResponse.json(advertisements);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Reklamlar alınamadı." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Çok fazla reklam gönderme denemesi yaptınız. Lütfen daha sonra tekrar deneyin.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    const {
      company,
      email,
      title,
      description,
      image,
      link,
      package: selectedPackage,
      website,
      formStartedAt,
    } = body;

    // Honeypot: gerçek kullanıcı bu alanı doldurmaz
    if (website && String(website).trim() !== "") {
      return NextResponse.json(
        { error: "Spam tespit edildi." },
        { status: 400 }
      );
    }

    // Çok hızlı gönderimleri engelle
    if (formStartedAt) {
      const startedAt = Number(formStartedAt);
      const now = Date.now();

      if (
        !Number.isNaN(startedAt) &&
        now - startedAt < 3000
      ) {
        return NextResponse.json(
          {
            error:
              "Form çok hızlı gönderildi. Lütfen formu tekrar doldurun.",
          },
          { status: 400 }
        );
      }
    }

    if (
      !company ||
      !email ||
      !title ||
      !description ||
      !selectedPackage
    ) {
      return NextResponse.json(
        { error: "Lütfen zorunlu alanları doldurun." },
        { status: 400 }
      );
    }

    if (
      company.length > 100 ||
      title.length > 150 ||
      description.length > 3000 ||
      email.length > 150
    ) {
      return NextResponse.json(
        { error: "Girilen bilgiler izin verilen sınırı aşıyor." },
        { status: 400 }
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Geçerli bir e-posta adresi girin." },
        { status: 400 }
      );
    }

    if (link) {
      try {
        new URL(link);
      } catch {
        return NextResponse.json(
          { error: "Geçerli bir bağlantı adresi girin." },
          { status: 400 }
        );
      }
    }

    if (image) {
      try {
        new URL(image);
      } catch {
        return NextResponse.json(
          { error: "Geçerli bir görsel bağlantısı girin." },
          { status: 400 }
        );
      }
    }

    const advertisement =
      await prisma.advertisement.create({
        data: {
          company: String(company).trim(),
          email: String(email).trim().toLowerCase(),
          title: String(title).trim(),
          description: String(description).trim(),
          image: image
            ? String(image).trim()
            : null,
          link: link
            ? String(link).trim()
            : null,
          package: String(selectedPackage),
          packagePrice: 0,
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
    console.error(error);

    return NextResponse.json(
      { error: "Reklam oluşturulamadı." },
      { status: 500 }
    );
  }
}