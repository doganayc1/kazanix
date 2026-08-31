"use client";

import { FormEvent, useState } from "react";

export default function AdvertiserRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "/api/advertiser/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
          "Kayıt işlemi başarısız oldu."
        );

        return;
      }

      window.location.href =
        "/reklam-veren/giris";

    } catch {
      setError(
        "Bağlantı hatası oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="kazanix-user-dark">
      <div className="advertiser-container">

        <div className="advertiser-form-section">

          <span className="eyebrow">
            KAZANIX
          </span>

          <h1>
            Reklam Veren Kaydı
          </h1>

          <p>
            Kazanix reklam veren hesabınızı oluşturun.
          </p>

          <form
            onSubmit={handleSubmit}
            className="advertiser-form"
          >

            <input
              placeholder="Adınız"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />

            <input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

            <input
              type="password"
              placeholder="Şifreniz"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              minLength={6}
              required
            />

            <button
              type="submit"
              className="panel-button"
              disabled={loading}
            >
              {loading
                ? "Kaydediliyor..."
                : "Kayıt Ol"}
            </button>

          </form>

          {error && (
            <p className="advertiser-message">
              {error}
            </p>
          )}

          <p>
            Zaten hesabınız var mı?{" "}

            <a href="/reklam-veren/giris">
              Giriş Yap
            </a>
          </p>

        </div>

      </div>
    </main>
  );
}