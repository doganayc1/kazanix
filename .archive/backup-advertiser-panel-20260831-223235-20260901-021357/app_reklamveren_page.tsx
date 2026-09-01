"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

type Advertisement = {
  id: string;
  company: string;
  email: string;
  title: string;
  description: string;
  package: string;
  packagePrice: number;
  status: string;
  startsAt: string | null;
  expiresAt: string | null;
  createdAt: string;
};

export default function AdvertiserPage() {
  const [
    advertisements,
    setAdvertisements,
  ] = useState<
    Advertisement[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    company,
    setCompany,
  ] = useState("");

  const [
    title,
    setTitle,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    image,
    setImage,
  ] = useState("");

  const [
    link,
    setLink,
  ] = useState("");

  const [
    selectedPackage,
    setSelectedPackage,
  ] = useState("BASLANGIC");

  async function loadAdvertisements() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/advertiser/advertisements"
        );

      if (
        response.status === 401
      ) {
        window.location.href =
          "/reklamveren/giris";

        return;
      }

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.error ||
            "Reklamlar yuklenemedi."
        );

        return;
      }

      setAdvertisements(data);
    } catch {
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

  async function createAdvertisement(
    event: FormEvent
  ) {
    event.preventDefault();

    setMessage("");

    const response =
      await fetch(
        "/api/advertiser/advertisements",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            company,
            title,
            description,
            image,
            link,
            package:
              selectedPackage,
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      setMessage(
        data.error ||
          "Reklam olusturulamadi."
      );

      return;
    }

    setMessage(
      "Reklaminiz basariyla gonderildi. Admin onayi bekleniyor."
    );

    setCompany("");
    setTitle("");
    setDescription("");
    setImage("");
    setLink("");
    setSelectedPackage(
      "BASLANGIC"
    );

    await loadAdvertisements();
  }

  async function deleteAdvertisement(
    id: string
  ) {
    if (
      !confirm(
        "Bu reklami silmek istediginize emin misiniz?"
      )
    ) {
      return;
    }

    const response =
      await fetch(
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

    await loadAdvertisements();
  }

  async function logout() {
    await fetch(
      "/api/advertiser/logout",
      {
        method: "POST",
      }
    );

    window.location.href = "/";
  }

  function formatPrice(
    price: number
  ) {
    return new Intl.NumberFormat(
      "tr-TR",
      {
        style: "currency",
        currency: "TRY",
        maximumFractionDigits: 0,
      }
    ).format(price);
  }

  const statistics = {
    total:
      advertisements.length,

    pending:
      advertisements.filter(
        (ad) =>
          ad.status === "PENDING"
      ).length,

    approved:
      advertisements.filter(
        (ad) =>
          ad.status === "APPROVED"
      ).length,

    expired:
      advertisements.filter(
        (ad) =>
          ad.status === "EXPIRED"
      ).length,
  };

  if (loading) {
    return (
      <main className="advertiser-page">
        <div className="advertiser-container">
          <h1>
            Reklamveren Paneli
          </h1>

          <p>
            Veriler yukleniyor...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="advertiser-page">

      <div className="advertiser-container">

        <div className="advertiser-header">

          <div>

            <span className="eyebrow">
              REKLAMVEREN PANELI
            </span>

            <h1>
              Reklamlarinizi Yonetin
            </h1>

            <p>
              Reklamlarinizi
              olusturun ve durumlarini
              takip edin.
            </p>

          </div>

          <button
            onClick={logout}
            className="logout-button"
          >
            Cikis Yap
          </button>

        </div>


        <section className="statistics-grid">

          <article className="stat-card">
            <p>
              Toplam Reklam
            </p>

            <strong>
              {statistics.total}
            </strong>
          </article>

          <article className="stat-card">
            <p>
              Onay Bekleyen
            </p>

            <strong>
              {statistics.pending}
            </strong>
          </article>

          <article className="stat-card">
            <p>
              Aktif Reklam
            </p>

            <strong>
              {statistics.approved}
            </strong>
          </article>

          <article className="stat-card">
            <p>
              Suresi Dolan
            </p>

            <strong>
              {statistics.expired}
            </strong>
          </article>

        </section>


        <section className="advertiser-form-section">

          <div className="section-heading">

            <span>
              YENI REKLAM
            </span>

            <h2>
              Reklam Olustur
            </h2>

          </div>

          <form
            onSubmit={
              createAdvertisement
            }
            className="advertiser-form"
          >

            <input
              placeholder="Firma adi"
              value={company}
              onChange={(event) =>
                setCompany(
                  event.target.value
                )
              }
              required
            />

            <input
              placeholder="Reklam basligi"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              required
            />

            <textarea
              placeholder="Reklam aciklamasi"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              required
            />

            <input
              placeholder="Gorsel URL (istege bagli)"
              value={image}
              onChange={(event) =>
                setImage(
                  event.target.value
                )
              }
            />

            <input
              placeholder="Yonlendirme URL (istege bagli)"
              value={link}
              onChange={(event) =>
                setLink(
                  event.target.value
                )
              }
            />

            <select
              value={
                selectedPackage
              }
              onChange={(event) =>
                setSelectedPackage(
                  event.target.value
                )
              }
            >

              <option value="BASLANGIC">
                Baslangic - 99 TL
              </option>

              <option value="STANDART">
                Standart - 299 TL
              </option>

              <option value="ONE_CIKAN">
                One Cikan - 599 TL
              </option>

            </select>

            <button
              type="submit"
              className="submit-ad-button"
            >
              Reklami Gonder
            </button>

          </form>

          {message && (
            <p className="advertiser-message">
              {message}
            </p>
          )}

        </section>


        <section className="advertisements-section">

          <div className="section-heading">

            <span>
              REKLAMLARIM
            </span>

            <h2>
              Reklam Durumlari
            </h2>

          </div>

          {advertisements.length === 0 ? (

            <div className="empty-state">

              Henuz reklam
              olusturmadiniz.

            </div>

          ) : (

            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>

                  <tr>
                    <th>Reklam</th>
                    <th>Paket</th>
                    <th>Fiyat</th>
                    <th>Durum</th>
                    <th>Bitis</th>
                    <th>Islem</th>
                  </tr>

                </thead>

                <tbody>

                  {advertisements.map(
                    (ad) => (

                      <tr key={ad.id}>

                        <td>

                          <strong>
                            {ad.title}
                          </strong>

                          <br />

                          <small>
                            {ad.company}
                          </small>

                        </td>

                        <td>
                          {ad.package}
                        </td>

                        <td>
                          {formatPrice(
                            ad.packagePrice
                          )}
                        </td>

                        <td>

                          <span
                            className={
                              "status-badge status-" +
                              ad.status.toLowerCase()
                            }
                          >

                            {ad.status}

                          </span>

                        </td>

                        <td>

                          {ad.expiresAt
                            ? new Date(
                                ad.expiresAt
                              ).toLocaleDateString(
                                "tr-TR"
                              )
                            : "-"}

                        </td>

                        <td>

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

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </div>

    </main>
  );
}