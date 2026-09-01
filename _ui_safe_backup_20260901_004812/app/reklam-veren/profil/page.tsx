"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Profile = {
  companyName: string;
  description: string | null;
  phone: string | null;
  address: string | null;
};

export default function ProfilePage() {
  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    fetch("/api/advertiser/profile", {
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.business) {
          setProfile(data.business);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    if (!profile) return;

    const response = await fetch(
      "/api/advertiser/profile",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      }
    );

    if (response.ok) {
      setMessage(
        "Profil başarıyla güncellendi."
      );
    } else {
      setMessage(
        "Profil güncellenemedi."
      );
    }
  }

  if (loading) {
    return (
      <main className="advertiser-panel">
        <div className="advertiser-container">
          Profil yükleniyor...
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
              KAZANIX
            </span>

            <h1>Firma Profili</h1>
          </div>

          <Link
            href="/reklam-veren"
            className="panel-secondary"
          >
            ← Dashboard
          </Link>
        </header>

        {profile ? (
          <div className="advertiser-form">

            <label>
              Firma adı

              <input
                value={profile.companyName}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    companyName:
                      e.target.value,
                  })
                }
              />
            </label>

            <label>
              Açıklama

              <textarea
                rows={6}
                value={
                  profile.description || ""
                }
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    description:
                      e.target.value,
                  })
                }
              />
            </label>

            <label>
              Telefon

              <input
                value={profile.phone || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    phone: e.target.value,
                  })
                }
              />
            </label>

            <label>
              Adres

              <textarea
                rows={4}
                value={profile.address || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    address: e.target.value,
                  })
                }
              />
            </label>

            {message && (
              <div className="form-message">
                {message}
              </div>
            )}

            <button
              onClick={save}
              className="panel-button"
            >
              Profili Kaydet
            </button>

          </div>
        ) : (
          <div className="empty-panel">
            Firma profili bulunamadı.
          </div>
        )}

      </div>
    </main>
  );
}