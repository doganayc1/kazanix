"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdvertiserLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "/api/advertiser/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
            remember,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data?.error ||
            "E-posta veya şifre hatalı."
        );
        return;
      }

      router.replace("/reklam-veren");
      router.refresh();
    } catch {
      setError(
        "Bir bağlantı hatası oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main className="kazanix-user-dark" >
        <header className="login-header">
          <Link
            href="/"
            className="brand"
            aria-label="Kazanix ana sayfa"
          >
            KAZANIX
          </Link>

          <Link
            href="/reklam-veren/kayıt"
            className="header-link"
          >
            Hesap oluştur
          </Link>
        </header>

        <section className="login-content">
          <div className="login-intro">
            <div className="intro-label">
              KAZANIX REKLAM VEREN
            </div>

            <h1>
              Reklamlarınızı
              <br />
              <span>daha akıllı yönetin.</span>
            </h1>

            <p>
              Reklam kampanyalarınızı tek bir
              yerden oluşturun, yönetin ve
              performansınızı takip edin.
            </p>

            <div className="intro-points">
              <div>
                <span>01</span>
                Reklamlarınızı kolayca yönetin
              </div>

              <div>
                <span>02</span>
                Kampanyalarınızı takip edin
              </div>

              <div>
                <span>03</span>
                Performansınızı tek panelden görün
              </div>
            </div>
          </div>

          <div className="login-card">
            <div className="card-top">
              <div className="small-logo">
                K
              </div>

              <div>
                <h2>Hoş geldiniz.</h2>

                <p>
                  Reklam veren hesabınıza giriş yapın.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="login-form"
            >
              <div className="field">
                <label htmlFor="email">
                  E-posta
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="ornek@firma.com"
                  autoComplete="email"
                  required
                  disabled={loading}
                />
              </div>

              <div className="field">
                <div className="field-label">
                  <label htmlFor="password">
                    Şifre
                  </label>

                  <Link
                    href="/reklam-veren/şifremi-unuttum"
                    className="forgot-link"
                  >
                    Şifremi unuttum
                  </Link>
                </div>

                <div className="password-wrapper">
                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="Şifrenizi girin"
                    autoComplete="current-password"
                    required
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Şifreyi gizle"
                        : "Şifreyi göster"
                    }
                  >
                    {showPassword ? "Gizle" : "Göster"}
                  </button>
                </div>
              </div>

              <label className="remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) =>
                    setRemember(
                      event.target.checked
                    )
                  }
                  disabled={loading}
                />

                <span>
                  Beni hatırla
                </span>
              </label>

              {error && (
                <div
                  className="login-error"
                  role="alert"
                >
                  <span>!</span>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  <>
                    Giriş Yap
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            <div className="register-line">
              <span>
                Henüz hesabınız yok mu?
              </span>

              <Link
                href="/reklam-veren/kayıt"
              >
                Reklam veren hesabı oluştur
              </Link>
            </div>

            <div className="secure-note">
              <span>⌁</span>
              Güvenli reklam veren erişimi
            </div>
          </div>
        </section>

        <footer className="login-footer">
          <span>© 2026 KAZANIX</span>

          <div>
            <Link href="/gizlilik">
              Gizlilik
            </Link>

            <Link href="/kosullar">
              Koşullar
            </Link>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          min-height: 100%;
        }

        body {
          background: #f5f5f7;
          color: #1d1d1f;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "SF Pro Display",
            "SF Pro Text",
            "Helvetica Neue",
            Arial,
            sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input {
          font: inherit;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 0 48px;
          background:
            radial-gradient(
              circle at 15% 15%,
              rgba(255, 255, 255, 0.95),
              transparent 34%
            ),
            #f5f5f7;
        }

        .login-header {
          width: 100%;
          max-width: 1380px;
          margin: 0 auto;
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.8px;
        }

        .header-link {
          font-size: 14px;
          color: #6e6e73;
          transition: color 0.2s ease;
        }

        .header-link:hover {
          color: #1d1d1f;
        }

        .login-content {
          width: 100%;
          max-width: 1180px;
          margin: auto;
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            460px;
          gap: 100px;
          align-items: center;
          padding: 60px 0 80px;
        }

        .login-intro {
          max-width: 590px;
        }

        .intro-label {
          display: inline-flex;
          align-items: center;
          margin-bottom: 24px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #86868b;
        }

        .login-intro h1 {
          margin: 0;
          font-size: clamp(48px, 5vw, 72px);
          line-height: 0.98;
          letter-spacing: -4px;
          font-weight: 700;
        }

        .login-intro h1 span {
          color: #6e6e73;
        }

        .login-intro > p {
          max-width: 500px;
          margin: 30px 0 0;
          font-size: 19px;
          line-height: 1.55;
          letter-spacing: -0.2px;
          color: #6e6e73;
        }

        .intro-points {
          margin-top: 44px;
          display: flex;
          flex-direction: column;
          gap: 17px;
        }

        .intro-points div {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 14px;
          color: #424245;
        }

        .intro-points span {
          font-size: 11px;
          color: #a1a1a6;
          letter-spacing: 0.5px;
        }

        .login-card {
          width: 100%;
          padding: 42px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(0, 0, 0, 0.07);
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.06),
            0 2px 8px rgba(0, 0, 0, 0.03);
          backdrop-filter: blur(20px);
        }

        .card-top {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 34px;
        }

        .small-logo {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          background: #1d1d1f;
          color: #fff;
          font-size: 19px;
          font-weight: 700;
        }

        .card-top h2 {
          margin: 0;
          font-size: 27px;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .card-top p {
          margin: 5px 0 0;
          color: #86868b;
          font-size: 13px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .field label,
        .field-label label {
          font-size: 13px;
          font-weight: 600;
          color: #424245;
        }

        .field-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .forgot-link {
          font-size: 12px;
          color: #6e6e73;
        }

        .forgot-link:hover {
          color: #1d1d1f;
        }

        .field input {
          width: 100%;
          height: 52px;
          padding: 0 16px;
          border: 1px solid #d2d2d7;
          border-radius: 13px;
          outline: none;
          background: #fff;
          color: #1d1d1f;
          font-size: 15px;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .field input::placeholder {
          color: #a1a1a6;
        }

        .field input:focus {
          border-color: #86868b;
          box-shadow:
            0 0 0 3px
            rgba(0, 0, 0, 0.06);
        }

        .password-wrapper {
          position: relative;
        }

        .password-wrapper input {
          padding-right: 78px;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          border: 0;
          background: transparent;
          color: #6e6e73;
          font-size: 12px;
          cursor: pointer;
          padding: 6px;
        }

        .password-toggle:hover {
          color: #1d1d1f;
        }

        .remember {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #6e6e73;
          font-size: 13px;
          cursor: pointer;
          user-select: none;
        }

        .remember input {
          width: 16px;
          height: 16px;
          margin: 0;
          accent-color: #1d1d1f;
        }

        .login-error {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 12px 14px;
          border-radius: 12px;
          background: #fff2f2;
          color: #c93434;
          border: 1px solid #ffd6d6;
          font-size: 13px;
          line-height: 1.4;
        }

        .login-error span {
          width: 19px;
          height: 19px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #c93434;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          flex: 0 0 auto;
        }

        .login-button {
          width: 100%;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border: 0;
          border-radius: 14px;
          background: #1d1d1f;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition:
            transform 0.2s ease,
            background 0.2s ease,
            opacity 0.2s ease;
        }

        .login-button:hover:not(:disabled) {
          background: #000;
          transform: translateY(-1px);
        }

        .login-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-button:disabled {
          cursor: default;
          opacity: 0.65;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .register-line {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          margin-top: 28px;
          padding-top: 25px;
          border-top: 1px solid #e5e5e7;
          font-size: 13px;
          color: #86868b;
        }

        .register-line a {
          color: #1d1d1f;
          font-weight: 600;
        }

        .register-line a:hover {
          text-decoration: underline;
        }

        .secure-note {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 7px;
          margin-top: 24px;
          color: #a1a1a6;
          font-size: 11px;
        }

        .secure-note span {
          font-size: 16px;
        }

        .login-footer {
          width: 100%;
          max-width: 1380px;
          height: 70px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          color: #a1a1a6;
          font-size: 11px;
        }

        .login-footer div {
          display: flex;
          gap: 22px;
        }

        .login-footer a:hover {
          color: #6e6e73;
        }

        @media (max-width: 1000px) {
          .login-content {
            grid-template-columns: 1fr;
            max-width: 600px;
            gap: 55px;
          }

          .login-intro {
            text-align: center;
            max-width: 600px;
          }

          .intro-points {
            align-items: center;
          }

          .login-intro > p {
            margin-left: auto;
            margin-right: auto;
          }

          .login-card {
            max-width: 520px;
            margin: 0 auto;
          }
        }

        @media (max-width: 640px) {
          .login-page {
            padding: 0 20px;
          }

          .login-header {
            height: 72px;
          }

          .login-content {
            padding: 40px 0 50px;
            gap: 40px;
          }

          .login-intro h1 {
            font-size: 43px;
            letter-spacing: -2.5px;
          }

          .login-intro > p {
            font-size: 16px;
          }

          .intro-points {
            display: none;
          }

          .login-card {
            padding: 28px 22px;
            border-radius: 22px;
          }

          .login-footer {
            height: 60px;
          }

          .login-footer div {
            display: none;
          }
        }
      `}</style>
    </>
  );
}