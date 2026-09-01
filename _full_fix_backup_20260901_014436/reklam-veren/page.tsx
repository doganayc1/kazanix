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
    async function loadDashboard() {
      try {
        const response = await fetch(
          "/api/advertiser/dashboard",
          {
            cache: "no-store",
          }
        );

        if (response.status === 401) {
          window.location.href =
            "/reklam-veren/giris";
          return;
        }

        if (!response.ok) {
          throw new Error(
            "Panel yüklenemedi."
          );
        }

        const result =
          await response.json();

        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <main className="kazanix-user-dark">
        <div className="advertiser-container">
          <div className="panel-loading">
            Panel yükleniyor...
          </div>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="kazanix-user-dark">
        <div className="advertiser-container">
          <div className="panel-card">
            <span className="panel-eyebrow">
              KAZANIX
            </span>

            <h1>
              Reklam Veren Paneli
            </h1>

            <p>
              Reklam veren hesabınızla giriş yapmanız gerekiyor.
            </p>

            <Link
              href="/reklam-veren/giris"
              className="panel-button"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="kazanix-user-dark">
      <div className="advertiser-container">

        <header className="panel-header">
          <div>
            <span className="panel-eyebrow">
              KAZANIX REKLAM VEREN
            </span>

            <h1>
              Hoş geldin, {data.advertiser.name}
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
            Reklamlarım
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
            <span>AKTİF</span>
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
              <span>
                REKLAM YÖNETİMİ
              </span>

              <h2>
                Reklamlarınızı yönetin
              </h2>
            </div>

            <Link
              href="/reklam-veren/reklamlar/yeni"
              className="panel-button"
            >
              + Yeni Reklam
            </Link>
          </div>

          <p>
            Reklam oluşturabilir, mevcut reklamlarınızı
            düzenleyebilir ve onay durumlarını takip
            edebilirsiniz.
          </p>

        </section>

      </div>
    </main>
  );
}