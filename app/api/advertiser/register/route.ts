import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const password = String(body.password || "");

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Ad, e-posta ve şifre zorunludur.",
        },
        {
          status: 400,
        }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          error: "Geçerli bir e-posta adresi girin.",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          error: "Şifre en az 6 karakter olmalıdır.",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "Bu e-posta adresi ile zaten bir hesap bulunmaktadır.",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "BUSINESS",

        business: {
          create: {
            companyName: name,
          },
        },
      },

      include: {
        business: true,
      },
    });

    return NextResponse.json(
      {
        success: true,

        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },

        business: user.business,
      },
      {
        status: 201,
      }
    );

  } catch (error) {
    console.error("Advertiser register error:", error);

    return NextResponse.json(
      {
        error:
          "Kayıt işlemi sırasında bir hata oluştu.",
      },
      {
        status: 500,
      }
    );
  }
}