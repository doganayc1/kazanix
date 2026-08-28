"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Advertisement = {
  id: string;
  company: string;
  email: string;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  package: string;
  status: string;
  createdAt: string;
};

export default function AdminPage() {
  const [advertisements, setAdvertisements] =
    useState<Advertisement[]>([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadAdvertisements = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/advertisements"
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.error || "Reklamlar yüklenemedi."
        );
        return;
      }

      setAdvertisements(data);
    } catch {
      setMessage(
        "Reklamlar yüklenirken bağlantı hatası oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdvertisements();
  }, []);

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      const response = await fetch(
        "/api/admin/advertisements",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.error || "Reklam güncellenemedi."
        );
        return;
      }

      setMessage("Reklam başarıyla güncellendi.");

      loadAdvertisements();
    } catch {
      setMessage(
        "Reklam güncellenirken hata oluştu."
      );
    }
  };

  const deleteAdvertisement = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Bu reklamı silmek istediğinizden emin misiniz?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        "/api/admin/advertisements",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.error || "Reklam silinemedi."
        );
        return;
      }

      setMessage("Reklam silindi.");

      loadAdvertisements();
    } catch {
      setMessage(
        "Reklam silinirken hata oluştu."
      );
    }
  };

  return (
    <main className="admin-page">
      <div className="container">

        <div className="admin-top">
          <div>
            <span className="admin-label">
              KAZANIX YÖNETİM PANELİ
            </span>

            <h1>Reklam Yönetimi</h1>

            <p>
              Gelen reklam taleplerini kontrol edin,
              onaylayın veya reddedin.
            </p>
          </div>

          <Link
            href="/"
            className="secondary-btn"
          >
            Siteye Dön
          </Link>
        </div>

        {message && (
          <div className="admin-message">
            {message}
          </div>
        )}

        {loading && (
          <p className="admin-loading">
            Reklamlar yükleniyor...
          </p>
        )}

        {!loading &&
          advertisements.length === 0 && (
            <div className="admin-empty">
              <h2>Henüz reklam talebi yok.</h2>

              <p>
                Reklam verenlerin gönderdiği
                talepler burada görünecek.
              </p>
            </div>
          )}

        <div className="admin-grid">
          {advertisements.map((ad) => (
            <article
              className="admin-card"
              key={ad.id}
            >
              <div className="admin-card-header">
                <div>
                  <span className="admin-status">
                    {ad.status}
                  </span>

                  <h2>{ad.title}</h2>
                </div>

                <strong>{ad.company}</strong>
              </div>

              <p className="admin-description">
                {ad.description}
              </p>

              <div className="admin-info">
                <div>
                  <span>Firma</span>
                  <strong>{ad.company}</strong>
                </div>

                <div>
                  <span>E-posta</span>
                  <strong>{ad.email}</strong>
                </div>

                <div>
                  <span>Paket</span>
                  <strong>{ad.package}</strong>
                </div>

                {ad.link && (
                  <div>
                    <span>Web Sitesi</span>
                    <a
                      href={ad.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Siteyi Aç
                    </a>
                  </div>
                )}
              </div>

              <div className="admin-actions">
                <button
                  className="approve-btn"
                  onClick={() =>
                    updateStatus(
                      ad.id,
                      "APPROVED"
                    )
                  }
                >
                  Onayla
                </button>

                <button
                  className="reject-btn"
                  onClick={() =>
                    updateStatus(
                      ad.id,
                      "REJECTED"
                    )
                  }
                >
                  Reddet
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteAdvertisement(ad.id)
                  }
                >
                  Sil
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
