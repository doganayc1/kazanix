"use client";

import {
  FormEvent,
  useState,
} from "react";

export default function AdvertiserRegisterPage() {
  const [
    name,
    setName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  async function handleSubmit(
    event: FormEvent
  ) {
    event.preventDefault();

    setError("");

    const response =
      await fetch(
        "/api/advertiser/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      setError(
        data.error ||
          "Kayit basarisiz."
      );

      return;
    }

    window.location.href =
      "/reklamveren/giris";
  }

  return (
    <main className="advertiser-page">

      <div className="advertiser-container">

        <div className="advertiser-form-section">

          <span className="eyebrow">
            KAZANIX
          </span>

          <h1>
            Reklamveren Kaydi
          </h1>

          <p>
            Kazanix reklamveren
            hesabini olusturun.
          </p>

          <form
            onSubmit={handleSubmit}
            className="advertiser-form"
          >

            <input
              placeholder="Adiniz"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
              required
            />

            <input
              type="email"
              placeholder="E-posta adresi"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              required
            />

            <input
              type="password"
              placeholder="Sifre (en az 6 karakter)"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              minLength={6}
              required
            />

            <button
              type="submit"
              className="submit-ad-button"
            >
              Hesap Olustur
            </button>

          </form>

          {error && (
            <p className="advertiser-message">
              {error}
            </p>
          )}

          <p>
            Zaten hesabiniz var mi?{" "}

            <a href="/reklam-veren/giris">
              Giris Yap
            </a>
          </p>

        </div>

      </div>

    </main>
  );
}