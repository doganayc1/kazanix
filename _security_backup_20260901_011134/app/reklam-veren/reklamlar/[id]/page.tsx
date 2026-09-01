"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Advertisement = {
  id: string;
  title: string;
  company: string;
  description: string;
  package: string;
  packagePrice: number;
  status: string;
};

export default function AdvertisementDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [ad, setAd] =
    useState<Advertisement | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    fetch(
      `/api/advertiser/advertisements/${id}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.id) {
          setAd(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  async function save() {
    if (!ad) return;

    setSaving(true);

    const response = await fetch(
      `/api/advertiser/advertisements/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: ad.title,
          description: ad.description,
          company: ad.company,
        }),
      }
    );

    setSaving(false);

    if (response.ok) {
      router.push(
        "/reklam-veren/reklamlar"
      );
    } else {
      alert(
        "Reklam güncellenemedi."
      );
    }
  }

  async function remove() {
    if (
      !confirm(
        "Bu reklamı silmek istediğinize emin misiniz?"
      )
    ) {
      return;
    }

    const response = await fetch(
      `/api/advertiser/advertisements/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      router.push(
        "/reklam-veren/reklamlar"
      );
    } else {
      alert(
        "Reklam silinemedi."
      );
    }
  }

  if (loading) {
    return (
      <main className="kazanix-user-dark advertiser-panel">
        <div className="advertiser-container">
          Reklam yükleniyor...
        </div>
      </main>
    );
  }

  if (!ad) {
    return (
      <main className="kazanix-user-dark advertiser-panel">
        <div className="advertiser-container">
          <div className="empty-panel">
            Reklam bulunamadı.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="kazanix-user-dark advertiser-panel">
      <div className="advertiser-container">

        <header className="panel-header">
          <div>
            <span className="panel-eyebrow">
              REKLAM DÜZENLE
            </span>

            <h1>{ad.title}</h1>

            <p>
              Durum: <b>{ad.status}</b>
            </p>
          </div>

          <Link
            href="/reklam-veren/reklamlar"
            className="panel-secondary"
          >
            ← Geri
          </Link>
        </header>

        <div className="advertiser-form">

          <label>
            Firma

            <input
              value={ad.company}
              onChange={(e) =>
                setAd({
                  ...ad,
                  company: e.target.value,
                })
              }
            />
          </label>

          <label>
            Başlık

            <input
              value={ad.title}
              onChange={(e) =>
                setAd({
                  ...ad,
                  title: e.target.value,
                })
              }
            />
          </label>

          <label>
            Açıklama

            <textarea
              rows={8}
              value={ad.description}
              onChange={(e) =>
                setAd({
                  ...ad,
                  description:
                    e.target.value,
                })
              }
            />
          </label>

          <div className="detail-actions">

            <button
              className="panel-button"
              onClick={save}
              disabled={saving}
            >
              {saving
                ? "Kaydediliyor..."
                : "Kaydet ve Onaya Gönder"}
            </button>

            <button
              className="delete-button"
              onClick={remove}
            >
              Reklamı Sil
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}