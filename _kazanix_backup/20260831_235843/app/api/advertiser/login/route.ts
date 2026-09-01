import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  ADVERTISER_COOKIE_NAME,
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
          error:
            "E-posta ve sifre gereklidir.",
        },
        {
          status: 400,
        }
      );
    }

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (
      !user ||
      user.password !== password ||
      user.role !== "BUSINESS"
    ) {
      return NextResponse.json(
        {
          error:
            "E-posta veya sifre hatali.",
        },
        {
          status: 401,
        }
      );
    }

    const sessionData = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const sessionValue =
      Buffer.from(
        JSON.stringify(sessionData)
      ).toString("base64url");

    const response =
      NextResponse.json({
        success: true,
        user: sessionData,
      });

    response.cookies.set({
      name: ADVERTISER_COOKIE_NAME,
      value: sessionValue,
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/",
      maxAge:
        60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Giris yapilamadi.",
      },
      {
        status: 500,
      }
    );
  }
}