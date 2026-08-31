"use client";

import Link from "next/link";
import { useState } from "react";

type Advertisement = {
  id: string;
  company: string;
  email: string;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  package: string;
  packagePrice: number;
  status: string;
  startsAt: string | null;
  expiresAt: string | null;
  createdAt: string;
};

type Statistics = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  expired: number;
  totalSpent: number;
};

type ApiResponse = {
  advertisements: Advertisement[];
  statistics: Statistics;
};

export default function AdvertiserPage() {
  const [email, setEmail] = useState("");
  const [data, setData] =
    useState<ApiResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchAdvertisements(
    event: React.FormEvent
  ) {
    event.preventDefault();

    const cleanEmail =
      email.trim().toLowerCase();

    if (!cleanEmail) {
      setError(
        "Lütfen e-posta adresinizi girin."
      );

      return;
    }

    try {
      setLoading(true);
      setError("");
      setData(null);

      const response = await fetch(
        `/api/advertiser/advertisements?email=${encodeURIComponent(
          cleanEmail
        )}`
      );

      const result =
        await response.json();

      if (!response.ok) {
        setError(
          result.error ||
            "Bilgiler alınamadı."
        );

        return;
      }

      setData(result);
    } catch (error) {
      console.error(error);

      setError(
        "Sunucuya bağlanırken bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat(
      "tr-TR",
      {
        style: "currency",
        currency: "TRY",
        maximumFractionDigits: 0,
      }
    ).format(price || 0);
  }

  function formatDate(
    date: string | null
  ) {
    if (!date) {
      return "-";
    }

    return new Intl.DateTimeFormat(
      "tr-TR",
      {
        dateStyle: "medium",
      }
    ).format(new Date(date));
  }

  function statusText(status: string) {
    const statuses: Record<
      string,
      string
    > = {
      PENDING: "Beklemede",
      APPROVED: "Aktif",
      REJECTED: "Reddedildi",
      EXPIRED: "Süresi Doldu",
    };

    return statuses[status] || status;
  }

  return (
    <main className="advertiser-page">

      <div className="advertiser-container">

        <div className="advertiser-hero">

          <Link
            href="/"
            className="back-home"
          >
            ← Ana Sayfa
          </Link>

          <span className="eyebrow">
            REKLAMVEREN PANELİ
          </span>

          <h1>
            Reklamlarınızı Yönetin
          </h1>

          <p>
            E-posta adresinizi girerek
            verdiğiniz reklamların durumunu
            ve istatistiklerini görüntüleyin.
          </p>

        </div>

        <section className="advertiser-search-card">

          <form
            onSubmit={searchAdvertisements}
            className="advertiser-search-form"
          >

            <input
              type="email"
              placeholder="Reklam verirken kullandığınız e-posta"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Aranıyor..."
                : "Reklamlarımı Gör"}
            </button>

          </form>

          {error && (
            <div className="advertiser-error">
              {error}
            </div>
          )}

        </section>

        {data && (

          <>
            <section className="advertiser-stats">

              <article className="advertiser-stat-card">
                <span>📊</span>
                <p>Toplam Reklam</p>
                <strong>
                  {data.statistics.total}
                </strong>
              </article>

              <article className="advertiser-stat-card">
                <span>⏳</span>
                <p>Bekleyen</p>
                <strong>
                  {data.statistics.pending}
                </strong>
              </article>

              <article className="advertiser-stat-card">
                <span>✅</span>
                <p>Aktif Reklam</p>
                <strong>
                  {data.statistics.approved}
                </strong>
              </article>

              <article className="advertiser-stat-card">
                <span>⌛</span>
                <p>Süresi Dolan</p>
                <strong>
                  {data.statistics.expired}
                </strong>
              </article>

              <article className="advertiser-stat-card">
                <span>❌</span>
                <p>Reddedilen</p>
                <strong>
                  {data.statistics.rejected}
                </strong>
              </article>

              <article className="advertiser-stat-card advertiser-money">
                <span>💰</span>
                <p>Toplam Paket Tutarı</p>
                <strong>
                  {formatPrice(
                    data.statistics.totalSpent
                  )}
                </strong>
              </article>

            </section>

            <section className="advertiser-list-section">

              <div className="advertiser-section-header">

                <div>

                  <span className="eyebrow">
                    REKLAMLARIM
                  </span>

                  <h2>
                    Reklam Geçmişiniz
                  </h2>

                </div>

                <Link
                  href="/reklam-ver"
                  className="new-ad-button"
                >
                  + Yeni Reklam Ver
                </Link>

              </div>

              {data.advertisements.length === 0 ? (

                <div className="advertiser-empty">

                  <h3>
                    Henüz reklam bulunamadı
                  </h3>

                  <p>
                    Bu e-posta adresi ile
                    oluşturulmuş bir reklam
                    bulunmuyor.
                  </p>

                  <Link
                    href="/reklam-ver"
                    className="new-ad-button"
                  >
                    İlk Reklamını Ver
                  </Link>

                </div>

              ) : (

                <div className="advertiser-ad-grid">

                  {data.advertisements.map(
                    (advertisement) => (

                      <article
                        key={advertisement.id}
                        className="advertiser-ad-card"
                      >

                        <div className="advertiser-ad-top">

                          <span
                            className={
                              "advertiser-status status-" +
                              advertisement.status.toLowerCase()
                            }
                          >
                            {statusText(
                              advertisement.status
                            )}
                          </span>

                          <span>
                            {advertisement.company}
                          </span>

                        </div>

                        <h3>
                          {advertisement.title}
                        </h3>

                        <p>
                          {advertisement.description}
                        </p>

                        <div className="advertiser-package">

                          <span>
                            Paket
                          </span>

                          <strong>
                            {advertisement.package}
                          </strong>

                        </div>

                        <div className="advertiser-details">

                          <div>
                            <span>
                              Paket Tutarı
                            </span>

                            <strong>
                              {formatPrice(
                                advertisement.packagePrice
                              )}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Başlangıç
                            </span>

                            <strong>
                              {formatDate(
                                advertisement.startsAt
                              )}
                            </strong>
                          </div>

                          <div>
                            <span>
                              Bitiş
                            </span>

                            <strong>
                              {formatDate(
                                advertisement.expiresAt
                              )}
                            </strong>
                          </div>

                        </div>

                      </article>

                    )
                  )}

                </div>

              )}

            </section>
          </>

        )}

      </div>

    </main>
  );
}