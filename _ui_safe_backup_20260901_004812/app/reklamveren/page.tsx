"use client";

import { useEffect, useState } from "react";

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

export default function AdvertiserPage() {
  const [advertisements, setAdvertisements] =
    useState<Advertisement[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [editingAdvertisement, setEditingAdvertisement] =
    useState<Advertisement | null>(null);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function loadAdvertisements() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/advertiser/advertisements"
      );

      if (response.status === 401) {
        window.location.href =
          "/reklam-veren/giris";
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.error ||
          "Reklamlar yuklenemedi."
        );

        return;
      }

      setAdvertisements(data);
    } catch (error) {
      console.error(error);

      setMessage(
        "Baglanti hatasi olustu."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAdvertisements();
  }, []);

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

  function formatDate(date: string | null) {
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

  function getStatusText(status: string) {
    const statuses: Record<string, string> = {
      PENDING: "Beklemede",
      APPROVED: "Aktif",
      REJECTED: "Reddedildi",
      EXPIRED: "Suresi Doldu",
    };

    return statuses[status] || status;
  }

  async function saveAdvertisement(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (!editingAdvertisement) {
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const response = await fetch(
        "/api/advertiser/advertisements",
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            editingAdvertisement
          ),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.error ||
          "Reklam guncellenemedi."
        );

        return;
      }

      setEditingAdvertisement(null);

      setMessage(
        "Reklam basariyla guncellendi."
      );

      await loadAdvertisements();
    } catch (error) {
      console.error(error);

      setMessage(
        "Reklam kaydedilirken hata olustu."
      );
    } finally {
      setSaving(false);
    }
  }

  const total =
    advertisements.length;

  const pending =
    advertisements.filter(
      (ad) =>
        ad.status === "PENDING"
    ).length;

  const approved =
    advertisements.filter(
      (ad) =>
        ad.status === "APPROVED"
    ).length;

  const rejected =
    advertisements.filter(
      (ad) =>
        ad.status === "REJECTED"
    ).length;

  const totalSpent =
    advertisements.reduce(
      (total, ad) =>
        total + (ad.packagePrice || 0),
      0
    );

  if (loading) {
    return (
      <main className="advertiser-page">
        <div className="advertiser-container">
          <h1>
            Reklamveren Paneli
          </h1>

          <p>
            Reklamlariniz yukleniyor...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="advertiser-page">

      <div className="advertiser-container">

        <header className="advertiser-header">

          <div>
            <span className="eyebrow">
              REKLAMVEREN PANELI
            </span>

            <h1>
              Reklamlarim
            </h1>

            <p>
              Reklamlarinizi,
              paketlerinizi ve
              durumlarini buradan
              yonetebilirsiniz.
            </p>
          </div>

          <button
            className="refresh-button"
            onClick={
              loadAdvertisements
            }
          >
            Yenile
          </button>

        </header>

        {message && (
          <div className="advertiser-message">
            {message}
          </div>
        )}

        <section className="advertiser-stats">

          <article>
            <span>
              Toplam Reklam
            </span>

            <strong>
              {total}
            </strong>
          </article>

          <article>
            <span>
              Bekleyen
            </span>

            <strong>
              {pending}
            </strong>
          </article>

          <article>
            <span>
              Aktif
            </span>

            <strong>
              {approved}
            </strong>
          </article>

          <article>
            <span>
              Reddedilen
            </span>

            <strong>
              {rejected}
            </strong>
          </article>

          <article>
            <span>
              Toplam Harcama
            </span>

            <strong>
              {formatPrice(totalSpent)}
            </strong>
          </article>

        </section>

        <section className="advertiser-list">

          <div className="section-heading">

            <div>
              <span>
                REKLAM LISTESI
              </span>

              <h2>
                Reklamlariniz
              </h2>
            </div>

            <a
              href="/reklam-ver"
              className="new-ad-button"
            >
              Yeni Reklam Ver
            </a>

          </div>

          {advertisements.length === 0 ? (

            <div className="empty-state">

              <h3>
                Henuz reklam yok
              </h3>

              <p>
                Ilk reklam kampanyanizi
                olusturarak baslayin.
              </p>

              <a href="/reklam-ver">
                Reklam Ver
              </a>

            </div>

          ) : (

            <div className="advertiser-ad-grid">

              {advertisements.map(
                (ad) => (

                  <article
                    className="advertiser-ad-card"
                    key={ad.id}
                  >

                    <div className="advertiser-ad-top">

                      <span
                        className={
                          "status-badge status-" +
                          ad.status.toLowerCase()
                        }
                      >
                        {getStatusText(
                          ad.status
                        )}
                      </span>

                      <span className="package-badge">
                        {ad.package}
                      </span>

                    </div>

                    <h3>
                      {ad.title}
                    </h3>

                    <p>
                      {ad.description}
                    </p>

                    <div className="advertiser-ad-info">

                      <div>
                        <span>
                          Paket
                        </span>

                        <strong>
                          {ad.package}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Fiyat
                        </span>

                        <strong>
                          {formatPrice(
                            ad.packagePrice
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Baslangic
                        </span>

                        <strong>
                          {formatDate(
                            ad.startsAt
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Bitis
                        </span>

                        <strong>
                          {formatDate(
                            ad.expiresAt
                          )}
                        </strong>
                      </div>

                    </div>

                    <div className="advertiser-ad-actions">

                      {ad.status !==
                        "APPROVED" && (

                        <button
                          onClick={() =>
                            setEditingAdvertisement(
                              {
                                ...ad,
                              }
                            )
                          }
                        >
                          Duzenle
                        </button>

                      )}

                      {ad.status ===
                        "APPROVED" && (

                        <span className="locked-text">
                          Aktif reklam
                          yonetici onayi ile
                          degistirilebilir.
                        </span>

                      )}

                    </div>

                  </article>

                )
              )}

            </div>

          )}

        </section>

      </div>

      {editingAdvertisement && (

        <div className="advertiser-modal">

          <div className="advertiser-modal-content">

            <button
              className="modal-close"
              onClick={() =>
                setEditingAdvertisement(
                  null
                )
              }
            >
              ×
            </button>

            <h2>
              Reklami Duzenle
            </h2>

            <form
              onSubmit={
                saveAdvertisement
              }
            >

              <label>
                Firma Adi

                <input
                  value={
                    editingAdvertisement.company
                  }
                  onChange={(event) =>
                    setEditingAdvertisement({
                      ...editingAdvertisement,
                      company:
                        event.target.value,
                    })
                  }
                />
              </label>

              <label>
                E-posta

                <input
                  type="email"
                  value={
                    editingAdvertisement.email
                  }
                  onChange={(event) =>
                    setEditingAdvertisement({
                      ...editingAdvertisement,
                      email:
                        event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Reklam Basligi

                <input
                  value={
                    editingAdvertisement.title
                  }
                  onChange={(event) =>
                    setEditingAdvertisement({
                      ...editingAdvertisement,
                      title:
                        event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Aciklama

                <textarea
                  rows={5}
                  value={
                    editingAdvertisement.description
                  }
                  onChange={(event) =>
                    setEditingAdvertisement({
                      ...editingAdvertisement,
                      description:
                        event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Gorsel URL

                <input
                  value={
                    editingAdvertisement.image ||
                    ""
                  }
                  onChange={(event) =>
                    setEditingAdvertisement({
                      ...editingAdvertisement,
                      image:
                        event.target.value ||
                        null,
                    })
                  }
                />
              </label>

              <label>
                Hedef URL

                <input
                  value={
                    editingAdvertisement.link ||
                    ""
                  }
                  onChange={(event) =>
                    setEditingAdvertisement({
                      ...editingAdvertisement,
                      link:
                        event.target.value ||
                        null,
                    })
                  }
                />
              </label>

              <div className="modal-actions">

                <button
                  type="button"
                  onClick={() =>
                    setEditingAdvertisement(
                      null
                    )
                  }
                >
                  Iptal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                >
                  {saving
                    ? "Kaydediliyor..."
                    : "Kaydet"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}