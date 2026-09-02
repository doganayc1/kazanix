import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdvertiser } from "@/app/api/advertiser/auth";
import { getAdPackage } from "@/lib/ad-packages";
import { createCheckoutForm } from "@/lib/iyzico";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

function splitName(name: string) {
  const parts = String(name || "Kullanıcı")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return {
    name: parts[0] || "Kullanıcı",
    surname:
      parts.slice(1).join(" ") || "Kullanıcı",
  };
}

export async function POST(
  request: Request
) {
  try {
    const advertiser =
      await getAdvertiser();

    if (!advertiser) {
      return NextResponse.json(
        {
          error:
            "Oturum açmanız gerekiyor.",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await request.json();

    const advertisementId =
      String(
        body.advertisementId || ""
      ).trim();

    if (!advertisementId) {
      return NextResponse.json(
        {
          error:
            "Reklam ID zorunludur.",
        },
        {
          status: 400,
        }
      );
    }

    const advertisement =
      await prisma.advertisement.findFirst({
        where: {
          id: advertisementId,
          OR: [
            {
              advertiserId:
                advertiser.id,
            },
            {
              advertiserId: null,
              email:
                advertiser.email,
            },
          ],
        },
      });

    if (!advertisement) {
      return NextResponse.json(
        {
          error:
            "Reklam bulunamadı.",
        },
        {
          status: 404,
        }
      );
    }

    if (
      advertisement.status !==
      "PENDING"
    ) {
      return NextResponse.json(
        {
          error:
            "Bu reklam için ödeme başlatılamaz.",
        },
        {
          status: 400,
        }
      );
    }

    const adPackage =
      getAdPackage(
        advertisement.package
      );

    await prisma.advertisement.update({
      where: {
        id: advertisement.id,
      },
      data: {
        packagePrice:
          adPackage.price,
      },
    });

    let payment =
      await prisma.payment.findFirst({
        where: {
          advertisementId:
            advertisement.id,
          status:
            "PENDING",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    if (!payment) {
      payment =
        await prisma.payment.create({
          data: {
            advertisementId:
              advertisement.id,
            amount:
              adPackage.price,
            currency:
              "TRY",
            status:
              "PENDING",
            conversationId:
              `KZN-${advertisement.id}-${Date.now()}`,
          },
        });
    }

    const person =
      splitName(
        advertiser.name
      );

    const businessPhone =
      advertiser.business?.phone ||
      "";

    const businessAddress =
      advertiser.business?.address ||
      "";

    /*
      Şimdilik iyzico buyer alanlarını
      mevcut kullanıcı verisiyle hazırlıyoruz.

      Mevcut kayıt sisteminde kimlik no
      toplanmadığı için sahte kimlik numarası
      kullanılmıyor.
    */

    const buyer: Record<string, unknown> = {
      id: advertiser.id,
      name: person.name,
      surname: person.surname,
      email: advertiser.email,
      registrationAddress:
        businessAddress ||
        "Türkiye",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34000",
      ip:
        request.headers.get(
          "x-forwarded-for"
        )?.split(",")[0]?.trim() ||
        "127.0.0.1",
    };

    if (businessPhone) {
      buyer.gsmNumber =
        businessPhone;
    }

    const checkoutRequest = {
      locale: "tr",
      conversationId:
        payment.conversationId,

      price:
        String(
          adPackage.price
        ),

      paidPrice:
        String(
          adPackage.price
        ),

      currency:
        "TRY",

      basketId:
        advertisement.id,

      paymentGroup:
        "PRODUCT",

      callbackUrl:
        `${siteUrl}/api/payments/callback`,

      buyer,

      shippingAddress: {
        contactName:
          advertiser.name,
        city:
          "Istanbul",
        country:
          "Turkey",
        address:
          businessAddress ||
          "Türkiye",
        zipCode:
          "34000",
      },

      billingAddress: {
        contactName:
          advertiser.name,
        city:
          "Istanbul",
        country:
          "Turkey",
        address:
          businessAddress ||
          "Türkiye",
        zipCode:
          "34000",
      },

      basketItems: [
        {
          id:
            advertisement.id,

          name:
            `${adPackage.name} Reklam Paketi`,

          category1:
            "Reklam",

          category2:
            "Kazanix",

          itemType:
            "VIRTUAL",

          price:
            String(
              adPackage.price
            ),
        },
      ],
    };

    const result =
      await createCheckoutForm(
        checkoutRequest
      );

    if (
      !result ||
      result.status !== "success" ||
      !result.token ||
      !result.checkoutFormContent
    ) {
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
              result?.errorCode ||
              "Checkout Form oluşturulamadı."
            ).slice(0, 1000),
        },
      });

      return NextResponse.json(
        {
          error:
            "İyzico ödeme formu oluşturulamadı.",
        },
        {
          status: 502,
        }
      );
    }

    await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status:
          "PENDING",
        token:
          String(
            result.token
          ),
        amount:
          adPackage.price,
      },
    });

    return NextResponse.json({
      success:
        true,

      token:
        result.token,

      checkoutFormContent:
        result.checkoutFormContent,

      packagePrice:
        adPackage.price,
    });

  } catch (error) {
    console.error(
      "Payment initialize error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "";

    if (
      message ===
      "IYZICO_ENV_MISSING"
    ) {
      return NextResponse.json(
        {
          error:
            "Ödeme sistemi yapılandırılmamış.",
        },
        {
          status: 503,
        }
      );
    }

    return NextResponse.json(
      {
        error:
          "Ödeme başlatılırken bir hata oluştu.",
      },
      {
        status: 500,
      }
    );
  }
}
