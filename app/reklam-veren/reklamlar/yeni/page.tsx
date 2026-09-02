"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewAdvertisementPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [packageName, setPackageName] = useState("BASLANGIC");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");


    try {
      const response = await fetch(
        "/api/advertiser/advertisements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            company,
            package: packageName,
}),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(
          result.error ||
          "Reklam oluşturulamadı."
        );
        return;
      }

      router.push(
        `/reklam-veren/odeme?adId=${result.id}`
      );
    } catch {
      setError(
        "Sunucuya bağlanılamadı."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="kazanix-user-dark" >
      <div className="advertiser-container">

        <header className="panel-header">
          <div>
            <span className="panel-eyebrow">
              KAZANIX
            </span>

            <h1>Yeni Reklam</h1>

            <p>
              Reklamınızı oluşturun ve güvenli ödeme adımına geçin.
            </p>
          </div>

          <Link
            href="/reklam-veren/reklamlar"
            className="panel-secondary"
          >
            ← Geri
          </Link>
        </header>

        <form
          onSubmit={submit}
          className="advertiser-form"
        >

          <label>
            Firma adı

            <input
              value={company}
              onChange={(e) =>
                setCompany(e.target.value)
              }
              placeholder="Firma adı"
            />
          </label>

          <label>
            Reklam başlığı

            <input
              required
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Reklam başlığı"
            />
          </label>

          <label>
            Açıklama

            <textarea
              required
              rows={7}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Reklam açıklaması"
            />
          </label>

          <label>
            Paket

            <select
              value={packageName}
              onChange={(e) =>
                setPackageName(e.target.value)
              }
            >
              <option value="BASLANGIC">
                Başlangıç — 99 TL
              </option>

              <option value="STANDART">
                Standart — 299 TL
              </option>

              <option value="ONE_CIKAN">
                Öne Çıkan — 459 TL
              </option>
            </select>
          </label>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="panel-button"
            disabled={loading}
          >
            {loading
              ? "Gönderiliyor..."
              : "Ödemeye Geç →"}
          </button>

        </form>

      </div>
    </main>
  );
}