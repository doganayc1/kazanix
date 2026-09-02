import { Suspense } from "react";
import PaymentClient from "./PaymentClient";

export default function PaymentPage() {
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
                Reklam Ödemesi
              </h1>

              <p>
                Ödeme formu hazırlanıyor...
              </p>
            </div>
          </div>
        </main>
      }
    >
      <PaymentClient />
    </Suspense>
  );
}
