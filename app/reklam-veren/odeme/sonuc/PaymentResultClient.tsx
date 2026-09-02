"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentResultClient() {
  const params =
    useSearchParams();

  const status =
    params.get("status");

  if (status === "success") {
    return (
      <main className="kazanix-user-dark">
        <div className="advertiser-container">
          <div className="advertiser-form-section">

            <span className="eyebrow">
              KAZANIX
            </span>

            <h1>
              Ödeme Başarılı
            </h1>

            <p>
              Ödemeniz alındı. Reklamınız admin
              onayına gönderildi.
            </p>

            <Link
              href="/reklam-veren/reklamlar"
              className="panel-button"
            >
              Reklamlarıma Dön
            </Link>

          </div>
        </div>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main className="kazanix-user-dark">
        <div className="advertiser-container">
          <div className="advertiser-form-section">

            <span className="eyebrow">
              KAZANIX
            </span>

            <h1>
              Ödeme Başarısız
            </h1>

            <p>
              Ödeme tamamlanamadı.
            </p>

            <Link
              href="/reklam-veren/reklamlar"
              className="panel-button"
            >
              Reklamlarıma Dön
            </Link>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="kazanix-user-dark">
      <div className="advertiser-container">
        <div className="advertiser-form-section">

          <span className="eyebrow">
            KAZANIX
          </span>

          <h1>
            İşlem Hatası
          </h1>

          <p>
            Ödeme sonucu doğrulanamadı.
          </p>

          <Link
            href="/reklam-veren/reklamlar"
            className="panel-button"
          >
            Reklamlarıma Dön
          </Link>

        </div>
      </div>
    </main>
  );
}
