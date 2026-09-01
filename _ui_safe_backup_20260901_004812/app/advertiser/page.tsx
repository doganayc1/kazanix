"use client";

import { FormEvent, useEffect, useState } from "react";

type Advertisement = {
  id: string;
  company: string;
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

type AdvertisementForm = {
  company: string;
  title: string;
  description: string;
  image: string;
  link: string;
  package: string;
};

const initialForm: AdvertisementForm = {
  company: "",
  title: "",
  description: "",
  image: "",
  link: "",
  package: "BASLANGIC",
};

const packageNames: Record<string, string> = {
  BASLANGIC: "Baslangic",
  STANDART: "Standart",
  ONE_CIKAN: "One Cikan",
};

export default function AdvertiserPage() {
  const [advertisements, setAdvertisements] =
    useState<Advertisement[]>([]);

  const [statistics, setStatistics] =
    useState<Statistics | null>(null);

  const [form, setForm] =
    useState<AdvertisementForm>(initialForm);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function loadData() {
    try {
      setLoading(true);

      const [
        advertisementsResponse,
        statisticsResponse,
      ] = await Promise.all([
        fetch("/api/advertiser/advertisements"),
        fetch("/api/advertiser/statistics"),
      ]);

      if (
        advertisementsResponse.status === 401 ||
        statisticsResponse.status === 401
      ) {
        window.location.href = "/";
        return;
      }

      if (advertisementsResponse.ok) {
        const data =
          await advertisementsResponse.json();

        setAdvertisements(data);
      }

      if (statisticsResponse.ok) {
        const data =
          await statisticsResponse.json();

        setStatistics(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function updateForm(
    field: keyof AdvertisementForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function submitAdvertisement(
    event: FormEvent
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      const response = await fetch(
        "/api/advertiser/advertisements",
        {
          method:
            editingId
              ? "PATCH"
              : "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...(editingId
              ? { id: editingId }
              : {}),
            ...form,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.error ||
          "Islem basarisiz."
        );
        return;
      }

      setMessage(
        editingId
          ? "Reklam guncellendi ve yeniden onaya gonderildi."
          : "Reklam basariyla olusturuldu."
      );

      setForm(initialForm);
      setEditingId(null);

      await loadData();
    } catch (error) {
      console.error(error);

      setMessage(
        "Bir hata olustu."
      );
    } finally {
      setSaving(false);
    }
  }

  function editAdvertisement(
    ad: Advertisement
  ) {
    setEditingId(ad.id);

    setForm({
      company: ad.company,
      title: ad.title,
      description: ad.description,
      image: ad.image || "",
      link: ad.link || "",
      package: ad.package,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    setMessage("");
  }

  async function deleteAdvertisement(
    id: string
  ) {
    if (
      !confirm(
        "Bu reklami silmek istediginizden emin misiniz?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        "/api/advertiser/advertisements",
        {
          method: "DELETE",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
          "Reklam silinemedi."
        );
        return;
      }

      await loadData();
    } catch (error) {
      console.error(error);

      alert(
        "Bir hata olustu."
      );
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
    ).format(price);
  }

  function formatDate(
    value: string | null
  ) {
    if (!value) {
      return "-";
    }

    return new Date(
      value
    ).toLocaleDateString("tr-TR");
  }

  if (loading) {
    return (
      <main className="advertiser-page">
        <div className="advertiser-container">
          <h1>Reklamveren Paneli</h1>
          <p>Veriler yukleniyor...</p>
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
              Reklamlarini Yonet
            </h1>

            <p>
              Reklamlarini olustur,
              takip et ve yonet.
            </p>
          </div>

          <button
            onClick={loadData}
            className="refresh-button"
          >
            Yenile
          </button>
        </header>

        {statistics && (
          <section className="statistics-grid advertiser-statistics">

            <article className="stat-card">
              <span>Toplam</span>
              <p>Toplam Reklam</p>
              <strong>
                {statistics.total}
              </strong>
            </article>

            <article className="stat-card">
              <span>Bekleyen</span>
              <p>Onay Bekleyen</p>
              <strong>
                {statistics.pending}
              </strong>
            </article>

            <article className="stat-card">
              <span>Aktif</span>
              <p>Aktif Reklam</p>
              <strong>
                {statistics.approved}
              </strong>
            </article>

            <article className="stat-card">
              <span>Harcama</span>
              <p>Toplam Reklam Degeri</p>
              <strong>
                {formatPrice(
                  statistics.totalSpent
                )}
              </strong>
            </article>

          </section>
        )}

        <section className="advertiser-form-section">

          <div className="section-heading">
            <span>
              {editingId
                ? "REKLAM DUZENLE"
                : "YENI REKLAM"}
            </span>

            <h2>
              {editingId
                ? "Reklamini Guncelle"
                : "Yeni Reklam Olustur"}
            </h2>
          </div>

          <form
            className="advertiser-form"
            onSubmit={submitAdvertisement}
          >

            <div className="form-grid">

              <label>
                Firma Adi

                <input
                  value={form.company}
                  onChange={(event) =>
                    updateForm(
                      "company",
                      event.target.value
                    )
                  }
                  required
                />
              </label>

              <label>
                Reklam Basligi

                <input
                  value={form.title}
                  onChange={(event) =>
                    updateForm(
                      "title",
                      event.target.value
                    )
                  }
                  required
                />
              </label>

              <label className="full-width">
                Reklam Aciklamasi

                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(event) =>
                    updateForm(
                      "description",
                      event.target.value
                    )
                  }
                  required
                />
              </label>

              <label>
                Gorsel URL

                <input
                  type="url"
                  value={form.image}
                  onChange={(event) =>
                    updateForm(
                      "image",
                      event.target.value
                    )
                  }
                />
              </label>

              <label>
                Hedef Baglanti

                <input
                  type="url"
                  value={form.link}
                  onChange={(event) =>
                    updateForm(
                      "link",
                      event.target.value
                    )
                  }
                />
              </label>

              <label>
                Reklam Paketi

                <select
                  value={form.package}
                  onChange={(event) =>
                    updateForm(
                      "package",
                      event.target.value
                    )
                  }
                >
                  <option value="BASLANGIC">
                    Baslangic - 499 TL / 7 Gun
                  </option>

                  <option value="STANDART">
                    Standart - 1499 TL / 30 Gun
                  </option>

                  <option value="ONE_CIKAN">
                    One Cikan - 2999 TL / 30 Gun
                  </option>
                </select>
              </label>

            </div>

            {message && (
              <div className="advertiser-message">
                {message}
              </div>
            )}

            <div className="form-actions">

              <button
                type="submit"
                disabled={saving}
                className="submit-ad-button"
              >
                {saving
                  ? "Kaydediliyor..."
                  : editingId
                    ? "Reklami Guncelle"
                    : "Reklam Olustur"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="cancel-button"
                >
                  Iptal
                </button>
              )}

            </div>

          </form>
        </section>

        <section className="advertiser-list-section">

          <div className="section-heading">
            <span>REKLAMLARIM</span>

            <h2>
              Tum Reklamlar
            </h2>
          </div>

          {advertisements.length === 0 ? (

            <div className="empty-state">
              Henuz reklam olusturmadiniz.
            </div>

          ) : (

            <div className="advertiser-ad-grid">

              {advertisements.map((ad) => (

                <article
                  key={ad.id}
                  className="advertiser-ad-card"
                >

                  <div className="advertiser-ad-card-header">

                    <span
                      className={
                        "status-badge status-" +
                        ad.status.toLowerCase()
                      }
                    >
                      {ad.status}
                    </span>

                    <strong>
                      {formatPrice(
                        ad.packagePrice
                      )}
                    </strong>

                  </div>

                  <h3>
                    {ad.title}
                  </h3>

                  <p>
                    {ad.description}
                  </p>

                  <div className="advertiser-ad-meta">

                    <span>
                      Paket:{" "}
                      {packageNames[
                        ad.package
                      ] || ad.package}
                    </span>

                    <span>
                      Baslangic:{" "}
                      {formatDate(
                        ad.startsAt
                      )}
                    </span>

                    <span>
                      Bitis:{" "}
                      {formatDate(
                        ad.expiresAt
                      )}
                    </span>

                  </div>

                  <div className="advertiser-ad-actions">

                    <button
                      onClick={() =>
                        editAdvertisement(ad)
                      }
                      disabled={
                        ad.status ===
                        "APPROVED"
                      }
                    >
                      Duzenle
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteAdvertisement(
                          ad.id
                        )
                      }
                    >
                      Sil
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </div>
    </main>
  );
}