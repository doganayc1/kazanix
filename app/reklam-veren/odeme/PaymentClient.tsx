"use client";

import {
  useEffect,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

export default function PaymentClient() {
  const params =
    useSearchParams();

  const advertisementId =
    params.get("adId");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      if (!advertisementId) {
        setError(
          "Reklam bilgisi bulunamadı."
        );

        setLoading(false);
        return;
      }

      try {
        const response =
          await fetch(
            "/api/payments/initialize",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                advertisementId,
              }),
            }
          );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.error ||
            "Ödeme başlatılamadı."
          );
        }

        const container =
          document.getElementById(
            "iyzico-checkout-form"
          );

        if (
          container &&
          result.checkoutFormContent
        ) {
          container.innerHTML =
            result.checkoutFormContent;
        }

        if (!cancelled) {
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Ödeme başlatılamadı."
          );

          setLoading(false);
        }
      }
    }

    initialize();

    return () => {
      cancelled = true;
    };
  }, [advertisementId]);

  return (
    <main className="kazanix-user-dark">
      <div className="advertiser-container">
        <div className="advertiser-form-section">

          <span className="eyebrow">
            KAZANIX
          </span>

          <h1>
            Reklam Ödemesi
          </h1>

          <p>
            Güvenli ödeme formu
          </p>

          {loading && (
            <p>
              Ödeme formu hazırlanıyor...
            </p>
          )}

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <div
            id="iyzico-checkout-form"
            style={{
              width: "100%",
              marginTop: "24px",
            }}
          />

        </div>
      </div>
    </main>
  );
}
