"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type DashboardData = {
  advertiser: {
    name: string;
    email: string;
    companyName: string;
  };
  statistics: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    revenue: number;
  };
};

function money(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AdvertiserPanel() {
  const [data, setData] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetch("/api/advertiser/dashboard", {
      cache: "no-store",
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Panel yÃƒÂ¼klenemedi");
        }

        return r.json();
      })
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="advertiser-panel">
        <div className="advertiser-container">
          <div className="panel-loading">
            Panel yÃƒÂ¼kleniyor...
          </div>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="advertiser-panel">
        <div className="advertiser-container">
          <div className="panel-card">
            <span className="panel-eyebrow">
              KAZANIX
            </span>

            <h1>Reklam Veren Paneli</h1>

            <p>
              Reklam veren hesabÃ„Â±nÃ„Â±zla giriÃ…Å¸ yapmanÃ„Â±z gerekiyor.
            </p>

            <Link
              href="/reklam-veren/giris"
              className="panel-button"
            >
              GiriÃ…Å¸ Yap Ã¢â€ â€™
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="advertiser-panel">
      <div className="advertiser-container">

        <header className="panel-header">
          <div>
            <span className="panel-eyebrow">
              KAZANIX REKLAM VEREN
            </span>

            <h1>
              HoÃ…Å¸ geldin, {data.advertiser.name}
            </h1>

            <p>
              {data.advertiser.companyName}
            </p>
          </div>

          <Link
            href="/"
            className="panel-secondary"
          >
            Ana Sayfa
          </Link>
        </header>

        <nav className="panel-nav">
          <Link href="/reklam-veren">
            Dashboard
          </Link>

          <Link href="/reklam-veren/reklamlar">
            ReklamlarÃ„Â±m
          </Link>

          <Link href="/reklam-veren/reklamlar/yeni">
            + Yeni Reklam
          </Link>

          <Link href="/reklam-veren/profil">
            Firma Profili
          </Link>
        </nav>

        <section className="stats-grid">

          <div className="stat-card">
            <span>TOPLAM REKLAM</span>
            <strong>
              {data.statistics.total}
            </strong>
          </div>

          <div className="stat-card">
            <span>BEKLEYEN</span>
            <strong>
              {data.statistics.pending}
            </strong>
          </div>

          <div className="stat-card">
            <span>AKTÃ„Â°F</span>
            <strong>
              {data.statistics.approved}
            </strong>
          </div>

          <div className="stat-card">
            <span>TOPLAM HARCAMA</span>
            <strong>
              {money(data.statistics.revenue)}
            </strong>
          </div>

        </section>

        <section className="panel-section">

          <div className="section-title">
            <div>
              <span>REKLAM YÃƒâ€“NETÃ„Â°MÃ„Â°</span>
              <h2>ReklamlarÃ„Â±nÃ„Â±zÃ„Â± yÃƒÂ¶netin</h2>
            </div>

            <Link
              href="/reklam-veren/reklamlar/yeni"
              className="panel-button"
            >
              + Yeni Reklam
            </Link>
          </div>

          <p>
            Reklam oluÃ…Å¸turabilir, mevcut reklamlarÃ„Â±nÃ„Â±zÃ„Â±
            dÃƒÂ¼zenleyebilir ve onay durumlarÃ„Â±nÃ„Â± takip
            edebilirsiniz.
          </p>

        </section>

      </div>
    </main>
  );
}