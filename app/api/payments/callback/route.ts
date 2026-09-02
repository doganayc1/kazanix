import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { retrieveCheckoutForm } from "@/lib/iyzico";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

async function getToken(
  request: Request
) {
  const url =
    new URL(request.url);

  const queryToken =
    url.searchParams.get(
      "token"
    );

  if (queryToken) {
    return queryToken.trim();
  }

  const contentType =
    request.headers.get(
      "content-type"
    ) || "";

  if (
    contentType.includes(
      "application/x-www-form-urlencoded"
    ) ||
    contentType.includes(
      "multipart/form-data"
    )
  ) {
    const form =
      await request.formData();

    return String(
      form.get("token") || ""
    ).trim();
  }

  try {
    const body =
      await request.json();

    return String(
      body.token || ""
    ).trim();
  } catch {
    return "";
  }
}

function redirectStatus(
  status: string
) {
  return NextResponse.redirect(
    `${siteUrl}/reklam-veren/odeme/sonuc?status=${encodeURIComponent(status)}`
  );
}

export async function GET(
  request: Request
) {
  return handle(request);
}

export async function POST(
  request: Request
) {
  return handle(request);
}

async function handle(
  request: Request
) {
  try {
    const token =
      await getToken(request);

    if (!token) {
      return redirectStatus(
        "error"
      );
    }

    const payment =
      await prisma.payment.findUnique({
        where: {
          token,
        },
        include: {
          advertisement: true,
        },
      });

    if (!payment) {
      return redirectStatus(
        "error"
      );
    }

    const result =
      await retrieveCheckoutForm({
        locale: "tr",
        conversationId:
          payment.conversationId,
        token,
      });

    const paymentOk =
      result?.status ===
        "success" &&
      result?.paymentStatus ===
        "SUCCESS";

    if (!paymentOk) {
      await prisma.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status:
            "FAILED",

          errorMessage:
            String(
              result?.errorMessage ||
              result?.paymentStatus ||
              "Ödeme başarısız."
            ).slice(0, 1000),
        },
      });

      return redirectStatus(
        "failed"
      );
    }

    const paidPrice =
      Number(
        result.paidPrice
      );

    if (
      !Number.isFinite(
        paidPrice
      ) ||
      paidPrice !==
        payment.amount
    ) {
      await prisma.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status:
            "FAILED",

          errorMessage:
            "Ödeme tutarı doğrulanamadı.",
        },
      });

      return redirectStatus(
        "failed"
      );
    }

    await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status:
          "PAID",

        paymentId:
          result.paymentId
            ? String(
                result.paymentId
              )
            : null,

        paidAt:
          new Date(),

        errorMessage:
          null,
      },
    });

    await prisma.advertisement.update({
      where: {
        id:
          payment.advertisementId,
      },
      data: {
        packagePrice:
          payment.amount,

        status:
          "PENDING",
      },
    });

    return redirectStatus(
      "success"
    );

  } catch (error) {
    console.error(
      "Payment callback error:",
      error
    );

    return redirectStatus(
      "error"
    );
  }
}
