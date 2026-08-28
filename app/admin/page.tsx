"use client";

import { useEffect, useState } from "react";

type Advertisement = {
  id: string;
  company: string;
  email: string;
  title: string;
  description: string;
  status: string;
  package: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [message, setMessage] = useState("");

  const loadAdvertisements = async () => {
    const response = await fetch("/api/admin/advertisements");

    if (response.status === 401) {
      setAuthenticated(false);
      return;
    }

    if (response.ok) {
      const data = await response.json();
      setAdvertisements(data);
      setAuthenticated(true);
    }
  };

  useEffect(() => {
    loadAdvertisements();
  }, []);

  const login = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Giris basarisiz.");
      return;
    }

    setPassword("");
    setMessage("");
    setAuthenticated(true);
    loadAdvertisements();
  };

  const updateStatus = async (
    id: string,
    status: "APPROVED" | "REJECTED" | "PENDING"
  ) => {
    const response = await fetch("/api/admin/advertisements", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status,
      }),
    });

    if (response.ok) {
      loadAdvertisements();
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    setAuthenticated(false);
    setAdvertisements([]);
  };

  if (!authenticated) {
    return (
      <main className="form-page">
        <div className="container admin-login">
          <a href="/" className="back-link">
            ← Ana Sayfaya Don
          </a>

          <div className="form-header">
            <span>ADMIN GIRISI</span>
            <h1>Kazanix Yonetim Paneli</h1>
            <p>Reklam basvurularini yonetmek icin giris yapin.</p>
          </div>

          <form
            className="advertisement-form"
            onSubmit={login}
          >
            <label>
              Admin Sifresi
              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />
            </label>

            <button
              type="submit"
              className="primary-btn"
            >
              Giris Yap
            </button>

            {message && (
              <p className="form-message">
                {message}
              </p>
            )}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="container">
        <div className="admin-top">
          <div>
            <span>ADMIN PANELI</span>
            <h1>Reklam Yonetimi</h1>
            <p>Gelen reklam taleplerini onaylayin veya reddedin.</p>
          </div>

          <button
            className="secondary-btn"
            onClick={logout}
          >
            Cikis Yap
          </button>
        </div>

        <div className="admin-list">
          {advertisements.length === 0 && (
            <p className="ads-loading">
              Henuz reklam basvurusu yok.
            </p>
          )}

          {advertisements.map((ad) => (
            <article
              className="admin-ad-card"
              key={ad.id}
            >
              <div className="admin-ad-info">
                <span className={`status status-${ad.status}`}>
                  {ad.status}
                </span>

                <h2>{ad.title}</h2>

                <strong>{ad.company}</strong>

                <p>{ad.description}</p>

                <small>{ad.email}</small>
              </div>

              <div className="admin-actions">
                <button
                  className="approve-btn"
                  onClick={() =>
                    updateStatus(ad.id, "APPROVED")
                  }
                >
                  Onayla
                </button>

                <button
                  className="reject-btn"
                  onClick={() =>
                    updateStatus(ad.id, "REJECTED")
                  }
                >
                  Reddet
                </button>

                <button
                  className="secondary-btn"
                  onClick={() =>
                    updateStatus(ad.id, "PENDING")
                  }
                >
                  Beklet
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
