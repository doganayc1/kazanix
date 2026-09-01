"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Advertisement = {
  id: string;
  title: string;
  description: string;
  package: string;
  packagePrice: number;
  status: string;
};

export default function AdvertisementsPage() {
  const [ads, setAds] =
    useState<Advertisement[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetch("/api/advertiser/advertisements", {
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAds(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="kazanix-user-dark" className="advertiser-panel">
      <div className="advertiser-container">

        <header className="panel-header">
          <div>
            <span className="panel-eyebrow">
              KAZANIX
            </span>

            <h1>Reklamlarım</h1>

            <p>
              Reklamlarınızı yönetin.
            </p>
          </div>

          <Link
            href="/reklam-veren"
            className="panel-secondary"
          >
            ← Dashboard
          </Link>
        </header>

        <div className="section-title">
          <h2>Reklamlar</h2>

          <Link
            href="/reklam-veren/reklamlar/yeni"
            className="panel-button"
          >
            + Yeni Reklam
          </Link>
        </div>

        {loading ? (
          <div className="empty-panel">
            Reklamlar yükleniyor...
          </div>
        ) : ads.length === 0 ? (
          <div className="empty-panel">
            <h3>Henüz reklamınız yok.</h3>

            <p>
              İlk reklamınızı oluşturarak başlayın.
            </p>

            <Link
              href="/reklam-veren/reklamlar/yeni"
              className="panel-button"
            >
              Reklam Oluştur →
            </Link>
          </div>
        ) : (
          <div className="ad-list">

            {ads.map((ad) => (
              <Link
                key={ad.id}
                href={`/reklam-veren/reklamlar/${ad.id}`}
                className="ad-list-card"
              >
                <div>
                  <span className="panel-eyebrow">
                    {ad.package}
                  </span>

                  <h3>{ad.title}</h3>

                  <p>
                    {ad.description}
                  </p>
                </div>

                <div className="ad-list-meta">
                  <strong>
                    {ad.packagePrice} TL
                  </strong>

                  <b className="status">
                    {ad.status}
                  </b>
                </div>
              </Link>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}