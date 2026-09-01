import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import {
  ADVERTISER_COOKIE_NAME,
  createAdvertiserSession,
} from "@/lib/advertiser-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "E-posta ve sifre gereklidir.",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || user.role !== "BUSINESS") {
      return NextResponse.json(
        {
          error: "E-posta veya sifre hatali.",
        },
        {
          status: 401,
        }
      );
    }

    let passwordValid = false;

    const looksHashed =
      user.password.startsWith("$2a$") ||
      user.password.startsWith("$2b$") ||
      user.password.startsWith("$2y$");

    if (looksHashed) {
      passwordValid = await bcrypt.compare(
        password,
        user.password
      );
    } else {
      // Eski sistemdeki duz sifreleri bir kereye mahsus
      // dogrula ve hemen bcrypt hash'e gecir.
      passwordValid = password === user.password;

      if (passwordValid) {
        const hashed = await bcrypt.hash(password, 12);

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            password: hashed,
          },
        });
      }
    }

    if (!passwordValid) {
      return NextResponse.json(
        {
          error: "E-posta veya sifre hatali.",
        },
        {
          status: 401,
        }
      );
    }

    const session = createAdvertiserSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: "BUSINESS",
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });

    response.cookies.set({
      name: ADVERTISER_COOKIE_NAME,
      value: session,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Giris yapilamadi.",
      },
      {
        status: 500,
      }
    );
  }
}