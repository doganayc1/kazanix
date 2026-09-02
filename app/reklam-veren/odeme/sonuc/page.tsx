import { Suspense } from "react";
import PaymentResultClient from "./PaymentResultClient";

export default function PaymentResultPage() {
  return (
    <Suspense
      fallback={
        <main className="kazanix-user-dark">
          <div className="advertiser-container">
            <div className="advertiser-form-section">
              <span className="eyebrow">
                KAZANIX
              </span>

              <h1>
                Ödeme Sonucu
              </h1>

              <p>
                Sonuç kontrol ediliyor...
              </p>
            </div>
          </div>
        </main>
      }
    >
      <PaymentResultClient />
    </Suspense>
  );
}
