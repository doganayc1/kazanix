"use client";

import {
  FormEvent,
  useState,
} from "react";

export default function AdvertiserLoginPage() {
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
        "/api/advertiser/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
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
          "Giris basarisiz."
      );

      return;
    }

    window.location.href =
      "/reklamveren";
  }

  return (
    <main className="advertiser-page">

      <div className="advertiser-container">

        <div className="advertiser-form-section">

          <span className="eyebrow">
            KAZANIX
          </span>

          <h1>
            Reklamveren Girisi
          </h1>

          <p>
            Reklamlarinizi
            yonetmek icin giris yapin.
          </p>

          <form
            onSubmit={handleSubmit}
            className="advertiser-form"
          >

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
              placeholder="Sifre"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              required
            />

            <button
              type="submit"
              className="submit-ad-button"
            >
              Giris Yap
            </button>

          </form>

          {error && (
            <p className="advertiser-message">
              {error}
            </p>
          )}

          <p>
            Hesabiniz yok mu?{" "}

            <a href="/reklam-veren/giris">
              Kayit Ol
            </a>
          </p>

        </div>

      </div>

    </main>
  );
}