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
  image: string | null;
  link: string | null;
  package: string;
  packagePrice: number;
  status: string;
  startsAt: string | null;
  expiresAt: string | null;
  createdAt: string;
};

type FormData = {
  company: string;
  title: string;
  description: string;
  image: string;
  link: string;
  package: string;
};

const emptyForm: FormData = {
  company: "",
  title: "",
  description: "",
  image: "",
  link: "",
  package: "BASLANGIC",
};

const packageLabels: Record<
  string,
  string
> = {
  BASLANGIC: "Baslangic",
  STANDART: "Standart",
  ONE_CIKAN: "One Cikan",
};

export default function AdvertiserPage() {

  const [
    advertisements,
    setAdvertisements,
  ] = useState<
    Advertisement[]
  >([]);

  const [
    form,
    setForm,
  ] = useState<FormData>(
    emptyForm
  );

  const [
    editingId,
    setEditingId,
  ] = useState<
    string | null
  >(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

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
          "/";
        return;
      }

      const data =
        await response.json();

      if (response.ok) {
        setAdvertisements(data);
      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    loadAdvertisements();
  }, []);

  function updateForm(
    field: keyof FormData,
    value: string
  ) {

    setForm(
      current => ({
        ...current,
        [field]: value,
      })
    );

  }

  async function handleSubmit(
    event: FormEvent
  ) {

    event.preventDefault();

    try {

      setSaving(true);

      setMessage("");

      const response =
        await fetch(
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

            body:
              JSON.stringify({
                ...(editingId
                  ? {
                      id:
                        editingId,
                    }
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
          : "Reklam basariyla olusturuldu ve onaya gonderildi."
      );

      setForm(
        emptyForm
      );

      setEditingId(
        null
      );

      await loadAdvertisements();

    } catch (error) {

      console.error(error);

      setMessage(
        "Bir hata olustu."
      );

    } finally {

      setSaving(false);

    }
  }

  function startEdit(
    advertisement:
      Advertisement
  ) {

    setEditingId(
      advertisement.id
    );

    setForm({
      company:
        advertisement.company,

      title:
        advertisement.title,

      description:
        advertisement.description,

      image:
        advertisement.image ||
        "",

      link:
        advertisement.link ||
        "",

      package:
        advertisement.package,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }

  function cancelEdit() {

    setEditingId(
      null
    );

    setForm(
      emptyForm
    );

    setMessage("");

  }

  async function deleteAdvertisement(
    id: string
  ) {

    const confirmed =
      window.confirm(
        "Bu reklami silmek istediginizden emin misiniz?"
      );

    if (!confirmed) {
      return;
    }

    try {

      const response =
        await fetch(
          "/api/advertiser/advertisements",
          {
            method:
              "DELETE",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
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

    } catch (error) {

      console.error(error);

      alert(
        "Bir hata olustu."
      );

    }
  }

  function formatPrice(
    price: number
  ) {

    return new Intl.NumberFormat(
      "tr-TR",
      {
        style:
          "currency",

        currency:
          "TRY",

        maximumFractionDigits:
          0,
      }
    ).format(
      price
    );

  }

  function formatDate(
    date:
      string | null
  ) {

    if (!date) {
      return "-";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "tr-TR"
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
              Reklamlarimi Yonet
            </h1>

            <p>
              Reklamlarini ekle,
              duzenle ve durumlarini
              takip et.
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

        <section className="advertiser-form-section">

          <div className="section-heading">

            <span>
              {editingId
                ? "REKLAM DUZENLE"
                : "YENI REKLAM"}
            </span>

            <h2>
              {editingId
                ? "Reklamini guncelle"
                : "Yeni reklam olustur"}
            </h2>

          </div>

          <form
            className="advertiser-form"
            onSubmit={
              handleSubmit
            }
          >

            <div className="form-grid">

              <label>

                Firma adi

                <input
                  value={
                    form.company
                  }
                  onChange={
                    event =>
                      updateForm(
                        "company",
                        event.target.value
                      )
                  }
                  required
                />

              </label>

              <label>

                Reklam basligi

                <input
                  value={
                    form.title
                  }
                  onChange={
                    event =>
                      updateForm(
                        "title",
                        event.target.value
                      )
                  }
                  required
                />

              </label>

              <label className="full-width">

                Aciklama

                <textarea
                  value={
                    form.description
                  }
                  onChange={
                    event =>
                      updateForm(
                        "description",
                        event.target.value
                      )
                  }
                  required
                  rows={5}
                />

              </label>

              <label>

                Gorsel URL
                (opsiyonel)

                <input
                  type="url"
                  value={
                    form.image
                  }
                  onChange={
                    event =>
                      updateForm(
                        "image",
                        event.target.value
                      )
                  }
                />

              </label>

              <label>

                Hedef baglanti
                (opsiyonel)

                <input
                  type="url"
                  value={
                    form.link
                  }
                  onChange={
                    event =>
                      updateForm(
                        "link",
                        event.target.value
                      )
                  }
                />

              </label>

              <label>

                Reklam paketi

                <select
                  value={
                    form.package
                  }
                  onChange={
                    event =>
                      updateForm(
                        "package",
                        event.target.value
                      )
                  }
                >

                  <option value="BASLANGIC">
                    Baslangic - 499 TL / 7 gun
                  </option>

                  <option value="STANDART">
                    Standart - 1499 TL / 30 gun
                  </option>

                  <option value="ONE_CIKAN">
                    One Cikan - 2999 TL / 30 gun
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
                disabled={
                  saving
                }
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
                  onClick={
                    cancelEdit
                  }
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

            <span>
              REKLAMLARIM
            </span>

            <h2>
              Reklam listesi
            </h2>

          </div>

          {loading ? (

            <div className="empty-state">
              Reklamlar yukleniyor...
            </div>

          ) : advertisements.length === 0 ? (

            <div className="empty-state">
              Henuz reklam bulunmuyor.
            </div>

          ) : (

            <div className="advertiser-ad-grid">

              {advertisements.map(
                advertisement => (

                  <article
                    key={
                      advertisement.id
                    }
                    className="advertiser-ad-card"
                  >

                    <div className="advertiser-ad-card-header">

                      <span
                        className={
                          "status-badge status-" +
                          advertisement.status.toLowerCase()
                        }
                      >
                        {
                          advertisement.status
                        }
                      </span>

                      <strong>
                        {
                          formatPrice(
                            advertisement.packagePrice
                          )
                        }
                      </strong>

                    </div>

                    <h3>
                      {
                        advertisement.title
                      }
                    </h3>

                    <p>
                      {
                        advertisement.description
                      }
                    </p>

                    <div className="advertiser-ad-meta">

                      <span>
                        Paket:
                        {" "}
                        {
                          packageLabels[
                            advertisement.package
                          ] ||
                          advertisement.package
                        }
                      </span>

                      <span>
                        Baslangic:
                        {" "}
                        {
                          formatDate(
                            advertisement.startsAt
                          )
                        }
                      </span>

                      <span>
                        Bitis:
                        {" "}
                        {
                          formatDate(
                            advertisement.expiresAt
                          )
                        }
                      </span>

                    </div>

                    <div className="advertiser-ad-actions">

                      <button
                        onClick={() =>
                          startEdit(
                            advertisement
                          )
                        }
                        disabled={
                          advertisement.status ===
                          "APPROVED"
                        }
                      >
                        Duzenle
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          deleteAdvertisement(
                            advertisement.id
                          )
                        }
                      >
                        Sil
                      </button>

                    </div>

                  </article>

                )
              )}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}