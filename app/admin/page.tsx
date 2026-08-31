"use client";

import {
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

type Statistics = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  expired: number;
  revenue: number;
  recentAdvertisements: number;
  topAdvertisements: {
    id: string;
    company: string;
    title: string;
    package: string;
    packagePrice: number;
    status: string;
  }[];
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] =
    useState(false);

  const [checkingAuth, setCheckingAuth] =
    useState(true);

  const [password, setPassword] =
    useState("");

  const [loginError, setLoginError] =
    useState("");

  const [
    advertisements,
    setAdvertisements,
  ] = useState<Advertisement[]>([]);

  const [statistics, setStatistics] =
    useState<Statistics | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function loadData() {
    try {
      setLoading(true);

      const responses =
        await Promise.all([
          fetch(
            "/api/admin/advertisements"
          ),
          fetch(
            "/api/admin/statistics"
          ),
        ]);

      if (
        responses[0].status === 401 ||
        responses[1].status === 401
      ) {
        setAuthenticated(false);
        return;
      }

      if (responses[0].ok) {
        setAdvertisements(
          await responses[0].json()
        );
      }

      if (responses[1].ok) {
        setStatistics(
          await responses[1].json()
        );
      }

      setAuthenticated(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setCheckingAuth(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function login(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setLoginError("");

    try {
      const response = await fetch(
        "/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      if (!response.ok) {
        setLoginError(
          "Hatalı şifre."
        );
        return;
      }

      setPassword("");
      await loadData();
    } catch {
      setLoginError(
        "Giriş sırasında hata oluştu."
      );
    }
  }

  async function logout() {
    await fetch(
      "/api/admin/logout",
      {
        method: "POST",
      }
    );

    setAuthenticated(false);
    setAdvertisements([]);
    setStatistics(null);
  }

  async function updateStatus(
    id: string,
    status: string
  ) {
    try {
      const response = await fetch(
        "/api/admin/advertisements",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
            status,
          }),
        }
      );

      if (!response.ok) {
        alert(
          "Reklam güncellenemedi."
        );
        return;
      }

      await loadData();
    } catch {
      alert(
        "Bir hata oluştu."
      );
    }
  }

  async function deleteAdvertisement(
    id: string
  ) {
    if (
      !confirm(
        "Bu reklamı silmek istediğinizden emin misiniz?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        "/api/admin/advertisements",
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

      if (!response.ok) {
        alert(
          "Reklam silinemedi."
        );
        return;
      }

      await loadData();
    } catch {
      alert(
        "Bir hata oluştu."
      );
    }
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

  if (checkingAuth) {
    return (
      <main className="admin-page">
        <div className="admin-container">
          <h1>Yükleniyor...</h1>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="admin-page">
        <div className="admin-login-box">
          <span className="eyebrow">
            KAZANIX
          </span>

          <h1>
            Yönetim Paneli
          </h1>

          <p>
            Bu alan yalnızca yetkili
            yönetici içindir.
          </p>

          <form onSubmit={login}>
            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Admin şifresi"
              required
            />

            {loginError && (
              <p className="login-error">
                {loginError}
              </p>
            )}

            <button type="submit">
              Giriş Yap
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="admin-page">
        <div className="admin-container">
          <h1>
            Veriler yükleniyor...
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-container">

        <div className="admin-header">
          <div>
            <span className="eyebrow">
              YÖNETİM PANELİ
            </span>

            <h1>
              Kazanix Yönetim Paneli
            </h1>

            <p>
              Reklamları ve platform
              istatistiklerini buradan
              yönetebilirsiniz.
            </p>
          </div>

          <div className="admin-header-actions">
            <button
              onClick={loadData}
              className="refresh-button"
            >
              Yenile
            </button>

            <button
              onClick={logout}
              className="logout-button"
            >
              Çıkış Yap
            </button>
          </div>
        </div>

        {statistics && (
          <section className="statistics-grid">

            <article className="stat-card">
              <p>Toplam Reklam</p>
              <strong>
                {statistics.total}
              </strong>
            </article>

            <article className="stat-card">
              <p>Bekleyen</p>
              <strong>
                {statistics.pending}
              </strong>
            </article>

            <article className="stat-card">
              <p>Aktif Reklam</p>
              <strong>
                {statistics.approved}
              </strong>
            </article>

            <article className="stat-card">
              <p>Reddedilen</p>
              <strong>
                {statistics.rejected}
              </strong>
            </article>

            <article className="stat-card">
              <p>Süresi Dolan</p>
              <strong>
                {statistics.expired}
              </strong>
            </article>

            <article className="stat-card">
              <p>Aktif Reklam Geliri</p>
              <strong>
                {formatPrice(
                  statistics.revenue
                )}
              </strong>
            </article>

          </section>
        )}

        {statistics && (
          <section className="top-ads-section">

            <div className="section-heading">
              <span>
                ÖNE ÇIKAN REKLAMLAR
              </span>

              <h2>
                En yüksek paketli reklamlar
              </h2>
            </div>

            <div className="top-ad-list">

              {statistics
                .topAdvertisements
                .length === 0 ? (
                <p>
                  Henüz reklam bulunmuyor.
                </p>
              ) : (
                statistics
                  .topAdvertisements
                  .map(
                    (ad, index) => (
                      <article
                        className="top-ad-item"
                        key={ad.id}
                      >
                        <div className="top-ad-rank">
                          #{index + 1}
                        </div>

                        <div className="top-ad-info">
                          <strong>
                            {ad.company}
                          </strong>

                          <span>
                            {ad.title}
                          </span>
                        </div>

                        <div className="top-ad-package">
                          <span>
                            {ad.package}
                          </span>

                          <strong>
                            {formatPrice(
                              ad.packagePrice
                            )}
                          </strong>
                        </div>
                      </article>
                    )
                  )
              )}

            </div>

          </section>
        )}

        <section className="advertisements-section">

          <div className="section-heading">
            <span>
              REKLAM YÖNETİMİ
            </span>

            <h2>
              Tüm Reklamlar
            </h2>
          </div>

          {advertisements.length === 0 ? (
            <div className="empty-state">
              Henüz reklam bulunmuyor.
            </div>
          ) : (
            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>Firma</th>
                    <th>Reklam</th>
                    <th>Paket</th>
                    <th>Fiyat</th>
                    <th>Durum</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>

                <tbody>

                  {advertisements.map(
                    (ad) => (
                      <tr key={ad.id}>

                        <td>
                          <strong>
                            {ad.company}
                          </strong>

                          <br />

                          <small>
                            {ad.email}
                          </small>
                        </td>

                        <td>
                          {ad.title}
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

                          <div className="admin-actions">

                            {ad.status !==
                              "APPROVED" && (
                              <button
                                onClick={() =>
                                  updateStatus(
                                    ad.id,
                                    "APPROVED"
                                  )
                                }
                              >
                                Onayla
                              </button>
                            )}

                            {ad.status !==
                              "REJECTED" && (
                              <button
                                onClick={() =>
                                  updateStatus(
                                    ad.id,
                                    "REJECTED"
                                  )
                                }
                              >
                                Reddet
                              </button>
                            )}

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